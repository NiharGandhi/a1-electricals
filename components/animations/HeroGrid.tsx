"use client";

import { useEffect, useRef } from "react";

type NodeType = "power" | "solar" | "wind" | "substation" | "city" | "factory";
interface NodeDef { id: string; label: string; type: NodeType; gx: number; gy: number; }

const NODES: NodeDef[] = [
  { id: "sol",  label: "Solar Farm",    type: "solar",      gx: 2,  gy: 1 },
  { id: "ps1",  label: "Power Station", type: "power",      gx: 5,  gy: 0 },
  { id: "ps2",  label: "Power Station", type: "power",      gx: 9,  gy: 0 },
  { id: "wnd",  label: "Wind Farm",     type: "wind",       gx: 12, gy: 1 },
  { id: "sub1", label: "Substation",    type: "substation", gx: 3,  gy: 4 },
  { id: "sub2", label: "Substation",    type: "substation", gx: 7,  gy: 5 },
  { id: "sub3", label: "Substation",    type: "substation", gx: 11, gy: 4 },
  { id: "cty1", label: "City",          type: "city",       gx: 1,  gy: 7 },
  { id: "ind1", label: "Industrial",    type: "factory",    gx: 5,  gy: 8 },
  { id: "cty2", label: "City",          type: "city",       gx: 9,  gy: 7 },
  { id: "ind2", label: "Industrial",    type: "factory",    gx: 12, gy: 7 },
];

const EDGES: [string, string, boolean][] = [
  ["sol",  "sub1", false], ["ps1",  "sub1", true ],
  ["ps1",  "sub2", false], ["ps2",  "sub2", true ],
  ["ps2",  "sub3", false], ["wnd",  "sub3", false],
  ["sub1", "sub2", true ], ["sub2", "sub3", true ],
  ["sub1", "cty1", false], ["sub1", "ind1", true ],
  ["sub2", "ind1", true ], ["sub2", "cty2", false],
  ["sub3", "cty2", true ], ["sub3", "ind2", false],
];

function iso(gx: number, gy: number, ox: number, oy: number, tw: number, th: number) {
  return { x: ox + (gx - gy) * tw * 0.5, y: oy + (gx + gy) * th * 0.5 };
}
function pathPts(n1: NodeDef, n2: NodeDef, gxFirst: boolean, ox: number, oy: number, tw: number, th: number) {
  const p1 = iso(n1.gx, n1.gy, ox, oy, tw, th);
  const mid = gxFirst ? iso(n2.gx, n1.gy, ox, oy, tw, th) : iso(n1.gx, n2.gy, ox, oy, tw, th);
  const p2 = iso(n2.gx, n2.gy, ox, oy, tw, th);
  const pts = [p1];
  if (Math.hypot(mid.x - p1.x, mid.y - p1.y) > 2) pts.push(mid);
  pts.push(p2);
  return pts;
}
function pointAt(pts: { x: number; y: number }[], t: number) {
  let total = 0;
  const segs: number[] = [];
  for (let i = 1; i < pts.length; i++) {
    const d = Math.hypot(pts[i].x - pts[i-1].x, pts[i].y - pts[i-1].y);
    segs.push(d); total += d;
  }
  let target = total * t, acc = 0;
  for (let i = 0; i < segs.length; i++) {
    if (acc + segs[i] >= target) {
      const f = segs[i] > 0 ? (target - acc) / segs[i] : 0;
      return { x: pts[i].x + (pts[i+1].x - pts[i].x) * f, y: pts[i].y + (pts[i+1].y - pts[i].y) * f };
    }
    acc += segs[i];
  }
  return pts[pts.length - 1];
}

interface Particle { t: number; speed: number; alpha: number }
interface Smoke {
  ox: number;    // origin x (fixed)
  oy: number;    // origin y (fixed)
  age: number;
  life: number;
  r0: number;    // initial radius
  drift: number; // lateral drift speed (signed)
  phase: number; // oscillation phase offset
  freq: number;  // oscillation frequency
}

export function HeroGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    let frame = 0;

    const particles: Particle[][] = EDGES.map(() =>
      Array.from({ length: 2 }, (_, i) => ({
        t: i / 2, speed: 0.00020 + Math.random() * 0.00022, alpha: 0.55 + Math.random() * 0.35,
      }))
    );

    // Persistent smoke cloud particles
    const smoke: Smoke[] = [];

    const GX = 14, GY = 9;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width  = canvas.offsetWidth  * dpr;
      canvas.height = canvas.offsetHeight * dpr;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      frame++;
      const dpr = window.devicePixelRatio || 1;
      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      const tw = W / 11;
      const th = tw * 0.5;
      const ox = W * 0.5;
      const oy = H * 0.04;
      const bh = th * 0.75;

      const g = (gx: number, gy: number) => iso(gx, gy, ox, oy, tw, th);

      // ── Floor grid ────────────────────────────────────────────────
      ctx.lineWidth = 0.5 * dpr;
      ctx.strokeStyle = "rgba(0,0,0,0.07)";
      for (let gx = 0; gx <= GX; gx++) {
        ctx.beginPath(); ctx.moveTo(g(gx,0).x, g(gx,0).y); ctx.lineTo(g(gx,GY).x, g(gx,GY).y); ctx.stroke();
      }
      for (let gy = 0; gy <= GY; gy++) {
        ctx.beginPath(); ctx.moveTo(g(0,gy).x, g(0,gy).y); ctx.lineTo(g(GX,gy).x, g(GX,gy).y); ctx.stroke();
      }

      const nodeMap: Record<string, NodeDef> = {};
      for (const n of NODES) nodeMap[n.id] = n;

      // ── Energy lines ──────────────────────────────────────────────
      for (const [aid, bid, gxFirst] of EDGES) {
        const pts = pathPts(nodeMap[aid], nodeMap[bid], gxFirst, ox, oy, tw, th);
        ctx.beginPath(); ctx.moveTo(pts[0].x, pts[0].y);
        for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
        ctx.strokeStyle = "rgba(217,115,32,0.22)"; ctx.lineWidth = 1.5 * dpr; ctx.stroke();
      }

      // ── Flowing particles ─────────────────────────────────────────
      EDGES.forEach(([aid, bid, gxFirst], ei) => {
        const pts = pathPts(nodeMap[aid], nodeMap[bid], gxFirst, ox, oy, tw, th);
        for (const p of particles[ei]) {
          const pos = pointAt(pts, p.t);
          for (let k = 5; k >= 1; k--) {
            const tp = pointAt(pts, Math.max(0, p.t - k * 0.013));
            ctx.beginPath(); ctx.arc(tp.x, tp.y, Math.max(0.1, (2.4 - k * 0.35) * dpr), 0, Math.PI*2);
            ctx.fillStyle = `rgba(217,115,32,${p.alpha * (1 - k/5) * 0.28})`; ctx.fill();
          }
          const grd = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, 8*dpr);
          grd.addColorStop(0, `rgba(217,115,32,${p.alpha * 0.45})`);
          grd.addColorStop(1, "rgba(217,115,32,0)");
          ctx.beginPath(); ctx.arc(pos.x, pos.y, 8*dpr, 0, Math.PI*2); ctx.fillStyle = grd; ctx.fill();
          ctx.beginPath(); ctx.arc(pos.x, pos.y, 2.5*dpr, 0, Math.PI*2);
          ctx.fillStyle = `rgba(217,115,32,${p.alpha})`; ctx.fill();
          p.t += p.speed; if (p.t > 1) p.t = 0;
        }
      });

      // ── Buildings ─────────────────────────────────────────────────
      // Collect chimney tops this frame for smoke spawning
      const chimneyTops: { x: number; y: number }[] = [];

      const sorted = [...NODES].sort((a, b) => (a.gx + a.gy) - (b.gx + b.gy));

      for (const n of sorted) {
        const { gx, gy, type } = n;

        // Screen coord for offset (dgx, dgy) from this node
        const S = (dgx: number, dgy: number) => ({
          x: ox + ((gx + dgx) - (gy + dgy)) * tw * 0.5,
          y: oy + ((gx + dgx) + (gy + dgy)) * th * 0.5,
        });
        const lp = (a: {x:number;y:number}, b: {x:number;y:number}, t: number) =>
          ({ x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t });

        const face = (pts: {x:number;y:number}[], fill: string, stroke = "rgba(0,0,0,0.18)") => {
          ctx.beginPath(); ctx.moveTo(pts[0].x, pts[0].y);
          for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
          ctx.closePath(); ctx.fillStyle = fill; ctx.fill();
          if (stroke !== "none") { ctx.strokeStyle = stroke; ctx.lineWidth = 0.7 * dpr; ctx.stroke(); }
        };

        // Standard isometric box
        const box = (dgx: number, dgy: number, hw: number, hd: number, h: number,
          tf: string, lf: string, rf: string) => {
          const tl = S(dgx-hw, dgy-hd), tr = S(dgx+hw, dgy-hd);
          const br = S(dgx+hw, dgy+hd), bl = S(dgx-hw, dgy+hd);
          const etl = {x:tl.x, y:tl.y-h}, etr = {x:tr.x, y:tr.y-h};
          const ebr = {x:br.x, y:br.y-h}, ebl = {x:bl.x, y:bl.y-h};
          face([tl, bl, ebl, etl], lf);
          face([bl, br, ebr, ebl], rf);
          face([etl, etr, ebr, ebl], tf);
          return { tl, tr, br, bl, etl, etr, ebr, ebl };
        };

        // Tapered box (like a cooling tower — wider at base, narrower at top)
        const taperedBox = (dgx: number, dgy: number,
          hwBase: number, hdBase: number,
          hwTop: number, hdTop: number,
          h: number, tf: string, lf: string, rf: string) => {
          const tl = S(dgx-hwBase, dgy-hdBase), tr = S(dgx+hwBase, dgy-hdBase);
          const br = S(dgx+hwBase, dgy+hdBase), bl = S(dgx-hwBase, dgy+hdBase);
          const etl = {x: S(dgx-hwTop, dgy-hdTop).x, y: S(dgx-hwTop, dgy-hdTop).y - h};
          const etr = {x: S(dgx+hwTop, dgy-hdTop).x, y: S(dgx+hwTop, dgy-hdTop).y - h};
          const ebr = {x: S(dgx+hwTop, dgy+hdTop).x, y: S(dgx+hwTop, dgy+hdTop).y - h};
          const ebl = {x: S(dgx-hwTop, dgy+hdTop).x, y: S(dgx-hwTop, dgy+hdTop).y - h};
          face([tl, bl, ebl, etl], lf);
          face([bl, br, ebr, ebl], rf);
          face([etl, etr, ebr, ebl], tf);
          return { tl, tr, br, bl, etl, etr, ebr, ebl };
        };

        // Windows on left face
        const leftWin = (tl: {x:number;y:number}, bl: {x:number;y:number},
          etl: {x:number;y:number}, ebl: {x:number;y:number},
          cols: number, rows: number, wc: string) => {
          const cw = 0.72 / cols, rh = 0.65 / rows;
          for (let c = 0; c < cols; c++) for (let r = 0; r < rows; r++) {
            const u1 = 0.14 + c/cols * 0.74 + 0.03, u2 = u1 + cw * 0.74;
            const v1 = 0.18 + r/rows * 0.68 + 0.04, v2 = v1 + rh * 0.74;
            const p = (u: number, v: number) => lp(lp(tl,bl,u), lp(etl,ebl,u), v);
            face([p(u1,v2), p(u2,v2), p(u2,v1), p(u1,v1)], wc, "none");
          }
        };

        // Windows on right face
        const rightWin = (bl: {x:number;y:number}, br: {x:number;y:number},
          ebl: {x:number;y:number}, ebr: {x:number;y:number},
          cols: number, rows: number, wc: string) => {
          const cw = 0.72 / cols, rh = 0.65 / rows;
          for (let c = 0; c < cols; c++) for (let r = 0; r < rows; r++) {
            const u1 = 0.14 + c/cols * 0.74 + 0.03, u2 = u1 + cw * 0.74;
            const v1 = 0.18 + r/rows * 0.68 + 0.04, v2 = v1 + rh * 0.74;
            const p = (u: number, v: number) => lp(lp(bl,br,u), lp(ebl,ebr,u), v);
            face([p(u1,v2), p(u2,v2), p(u2,v1), p(u1,v1)], wc, "none");
          }
        };

        // ── Per-type buildings ──────────────────────────────────────

        if (type === "power") {
          // ── Power Station ─────────────────────────────────────────
          // Draw order: cooling towers (back) → turbine hall → control room (front)

          // Cooling tower 1 — far back-left — tapered hyperbolic shape
          const ct1 = taperedBox(-0.20, -0.20, 0.14, 0.12, 0.08, 0.07, bh * 3.0,
            "rgb(118,105,90)", "rgb(85,72,58)", "rgb(65,52,40)");
          const c1cx = (ct1.etl.x + ct1.ebr.x) / 2, c1cy = (ct1.etl.y + ct1.ebr.y) / 2;
          const c1rx = Math.abs(ct1.etr.x - ct1.etl.x) * 0.52;
          ctx.beginPath(); ctx.ellipse(c1cx, c1cy, c1rx, c1rx * 0.32, 0, Math.PI, 0, true);
          ctx.fillStyle = "rgb(108,95,80)"; ctx.fill();
          ctx.strokeStyle = "rgba(0,0,0,0.20)"; ctx.lineWidth = 0.5 * dpr; ctx.stroke();

          // Cooling tower 2 — back-right
          const ct2 = taperedBox(0.12, -0.22, 0.13, 0.11, 0.07, 0.06, bh * 2.65,
            "rgb(112,98,84)", "rgb(80,68,55)", "rgb(62,50,38)");
          const c2cx = (ct2.etl.x + ct2.ebr.x) / 2, c2cy = (ct2.etl.y + ct2.ebr.y) / 2;
          const c2rx = Math.abs(ct2.etr.x - ct2.etl.x) * 0.52;
          ctx.beginPath(); ctx.ellipse(c2cx, c2cy, c2rx, c2rx * 0.32, 0, Math.PI, 0, true);
          ctx.fillStyle = "rgb(102,90,75)"; ctx.fill();
          ctx.strokeStyle = "rgba(0,0,0,0.20)"; ctx.lineWidth = 0.5 * dpr; ctx.stroke();

          // Tall chimney stack (back, between towers)
          const ch = box(-0.04, -0.16, 0.055, 0.055, bh * 3.4,
            "rgb(100,88,75)", "rgb(78,65,52)", "rgb(60,48,36)");
          const bandY = ch.etl.y + (ch.tl.y - ch.etl.y) * 0.12;
          ctx.beginPath();
          ctx.moveTo(ch.etl.x, bandY); ctx.lineTo(ch.etr.x, bandY);
          ctx.lineTo(ch.ebr.x, bandY); ctx.lineTo(ch.ebl.x, bandY);
          ctx.closePath(); ctx.fillStyle = "rgba(200,50,40,0.90)"; ctx.fill();

          // Main turbine hall (long, center)
          const hall = box(0, 0.08, 0.30, 0.22, bh * 1.30,
            "rgb(135,112,85)", "rgb(102,78,55)", "rgb(75,55,35)");
          leftWin(hall.tl, hall.bl, hall.etl, hall.ebl, 3, 3, "rgb(22,42,88)");
          rightWin(hall.bl, hall.br, hall.ebl, hall.ebr, 2, 3, "rgb(14,28,65)");

          // Control / auxiliary building (front)
          const ctrl = box(0.26, 0.20, 0.11, 0.09, bh * 0.85,
            "rgb(125,102,75)", "rgb(95,72,50)", "rgb(72,52,32)");
          leftWin(ctrl.tl, ctrl.bl, ctrl.etl, ctrl.ebl, 1, 2, "rgb(22,42,88)");
          rightWin(ctrl.bl, ctrl.br, ctrl.ebl, ctrl.ebr, 1, 2, "rgb(14,28,65)");

          // Chimney smoke
          chimneyTops.push({ x: (ch.etl.x + ch.ebr.x) / 2, y: (ch.etl.y + ch.ebr.y) / 2 - bh * 0.05 });

        } else if (type === "solar") {
          const plat = box(0, 0, 0.45, 0.38, bh * 0.20,
            "rgb(168,152,128)", "rgb(135,118,95)", "rgb(112,96,75)");
          const { etl, etr, ebr, ebl } = plat;
          const panelCols = 3, panelRows = 2;
          for (let c = 0; c < panelCols; c++) {
            for (let r = 0; r < panelRows; r++) {
              const u1 = c / panelCols + 0.03, u2 = (c+1) / panelCols - 0.03;
              const v1 = r / panelRows + 0.04, v2 = (r+1) / panelRows - 0.04;
              const p = (u: number, v: number) => lp(lp(etl, etr, u), lp(ebl, ebr, u), v);
              face([p(u1,v1), p(u2,v1), p(u2,v2), p(u1,v2)], "rgba(18,48,135,0.85)", "rgba(10,30,100,0.70)");
              ctx.strokeStyle = "rgba(70,130,220,0.35)"; ctx.lineWidth = 0.5 * dpr;
              for (let sc = 1; sc < 2; sc++) {
                const t = sc / 2;
                const sl = p(u1+(u2-u1)*t, v1), sr = p(u1+(u2-u1)*t, v2);
                ctx.beginPath(); ctx.moveTo(sl.x, sl.y); ctx.lineTo(sr.x, sr.y); ctx.stroke();
              }
              for (let sr2 = 1; sr2 < 3; sr2++) {
                const t = sr2 / 3;
                const st = p(u1, v1+(v2-v1)*t), sb = p(u2, v1+(v2-v1)*t);
                ctx.beginPath(); ctx.moveTo(st.x, st.y); ctx.lineTo(sb.x, sb.y); ctx.stroke();
              }
              face([p(u1,v1), p(u2,v1), lp(p(u1,v1),p(u2,v2),0.35), lp(p(u1,v1),p(u1,v2),0.35)],
                "rgba(120,180,255,0.12)", "none");
            }
          }

        } else if (type === "wind") {
          // Pad
          box(0, 0, 0.20, 0.17, bh * 0.14,
            "rgb(170,170,170)", "rgb(138,138,138)", "rgb(115,115,115)");
          // Wide base section
          box(0, 0, 0.075, 0.064, bh * 1.0,
            "rgb(125,140,188)", "rgb(92,110,168)", "rgb(70,88,148)");
          // Slim upper tower
          const tower = box(0, 0, 0.045, 0.038, bh * 3.2,
            "rgb(130,145,195)", "rgb(98,115,175)", "rgb(75,92,155)");
          // Nacelle
          const nac = box(0, 0, 0.13, 0.065, bh * 0.20,
            "rgb(132,148,198)", "rgb(100,118,178)", "rgb(78,95,158)");
          // Hub
          const hubX = (nac.etl.x + nac.ebr.x) / 2;
          const hubY = (nac.etl.y + nac.ebr.y) / 2 - bh * 0.10;
          ctx.beginPath(); ctx.arc(hubX, hubY, tw * 0.032, 0, Math.PI * 2);
          ctx.fillStyle = "rgb(130,148,200)"; ctx.fill();
          ctx.strokeStyle = "rgba(0,0,0,0.25)"; ctx.lineWidth = 0.8 * dpr; ctx.stroke();
          // 3 blades — long, tapered
          const bladeLen = tw * 0.52;
          const angles = [-Math.PI / 2, -Math.PI / 2 + (2*Math.PI/3), -Math.PI / 2 + (4*Math.PI/3)];
          for (const a of angles) {
            const bx = hubX + Math.cos(a) * bladeLen;
            const by = hubY + Math.sin(a) * bladeLen;
            const perp = a + Math.PI / 2;
            const rw = tw * 0.022;
            ctx.beginPath();
            ctx.moveTo(hubX + Math.cos(perp) * rw, hubY + Math.sin(perp) * rw);
            ctx.quadraticCurveTo(
              hubX + Math.cos(a) * bladeLen * 0.5 + Math.cos(perp) * rw * 0.4,
              hubY + Math.sin(a) * bladeLen * 0.5 + Math.sin(perp) * rw * 0.4,
              bx, by,
            );
            ctx.quadraticCurveTo(
              hubX + Math.cos(a) * bladeLen * 0.5 - Math.cos(perp) * rw * 0.2,
              hubY + Math.sin(a) * bladeLen * 0.5 - Math.sin(perp) * rw * 0.2,
              hubX - Math.cos(perp) * rw, hubY - Math.sin(perp) * rw,
            );
            ctx.closePath();
            ctx.fillStyle = "rgb(155,172,218)"; ctx.fill();
            ctx.strokeStyle = "rgba(30,55,145,0.70)"; ctx.lineWidth = 0.6 * dpr; ctx.stroke();
          }
          // Strobe
          ctx.beginPath(); ctx.arc(hubX, hubY - tw * 0.05, tw * 0.014, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(255,70,70,0.90)"; ctx.fill();
          void tower;

        } else if (type === "substation") {
          // Yard base
          const main = box(0, 0.05, 0.40, 0.28, bh * 0.58,
            "rgb(175,175,175)", "rgb(142,142,142)", "rgb(118,118,118)");
          box(-0.22, -0.05, 0.13, 0.10, bh * 0.82,
            "rgb(168,168,168)", "rgb(136,136,136)", "rgb(112,112,112)");
          const { etl, etr, ebl, ebr } = main;
          for (let i = 0; i < 3; i++) {
            const u = 0.18 + i * 0.27;
            const tc = lp(lp(etl, etr, u), lp(ebl, ebr, u), 0.45);
            const tS = tw * 0.058;
            ctx.beginPath();
            ctx.moveTo(tc.x - tS*0.8, tc.y - bh*0.38); ctx.lineTo(tc.x + tS*0.8, tc.y - bh*0.38);
            ctx.lineTo(tc.x + tS*0.8, tc.y); ctx.lineTo(tc.x - tS*0.8, tc.y);
            ctx.closePath(); ctx.fillStyle = "rgb(110,110,110)"; ctx.fill();
            ctx.strokeStyle = "rgba(0,0,0,0.10)"; ctx.lineWidth = 0.5*dpr; ctx.stroke();
            for (let f = 0; f < 3; f++) {
              const fx = tc.x - tS*0.55 + f * tS*0.55;
              ctx.beginPath(); ctx.moveTo(fx, tc.y); ctx.lineTo(fx, tc.y - bh*0.38);
              ctx.strokeStyle = "rgba(130,130,130,0.60)"; ctx.lineWidth = 0.7*dpr; ctx.stroke();
            }
            for (let b = -1; b <= 1; b++) {
              const bx = tc.x + b * tS*0.55;
              ctx.beginPath(); ctx.moveTo(bx, tc.y - bh*0.38); ctx.lineTo(bx, tc.y - bh*0.64);
              ctx.strokeStyle = "rgba(90,90,90,0.60)"; ctx.lineWidth = 1.2*dpr; ctx.stroke();
              ctx.beginPath(); ctx.arc(bx, tc.y - bh*0.51, tw*0.018, 0, Math.PI*2);
              ctx.fillStyle = "rgb(148,148,148)"; ctx.fill();
            }
          }
          for (const side of [-1, 1]) {
            const tx = S(side * 0.38, -0.15);
            ctx.beginPath(); ctx.moveTo(tx.x, tx.y); ctx.lineTo(tx.x, tx.y - bh*1.35);
            ctx.strokeStyle = "rgba(70,70,70,0.45)"; ctx.lineWidth = 1*dpr; ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(tx.x - tw*0.07, tx.y - bh*1.22); ctx.lineTo(tx.x + tw*0.07, tx.y - bh*1.22);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(tx.x, tx.y - bh*1.12); ctx.lineTo(S(0,0.05).x, S(0,0.05).y - bh*0.58);
            ctx.strokeStyle = "rgba(90,90,90,0.25)"; ctx.lineWidth = 0.7*dpr; ctx.stroke();
          }

        } else if (type === "city") {
          // ── Dense NYC city block ────────────────────────────────────
          // 6 buildings, drawn strictly back-to-front (ascending dgx+dgy)
          // sum = dgx + dgy

          // B1 sum=-0.63: landmark supertall, back-left
          const b1 = box(-0.25, -0.38, 0.14, 0.11, bh * 2.55,
            "rgb(92,112,168)", "rgb(62,82,142)", "rgb(40,58,118)");
          leftWin(b1.tl, b1.bl, b1.etl, b1.ebl, 2, 5, "rgb(20,38,88)");
          rightWin(b1.bl, b1.br, b1.ebl, b1.ebr, 1, 5, "rgb(12,25,68)");
          // Setback + antenna on B1 immediately (before drawing other towers)
          box(-0.25, -0.38, 0.07, 0.055, bh * 2.92,
            "rgb(78,98,155)", "rgb(50,70,130)", "rgb(32,50,108)");
          const ant = S(-0.25, -0.38);
          ctx.beginPath(); ctx.moveTo(ant.x, ant.y - bh*2.92); ctx.lineTo(ant.x, ant.y - bh*3.40);
          ctx.strokeStyle = "rgba(50,70,140,0.90)"; ctx.lineWidth = 1.0*dpr; ctx.stroke();
          ctx.beginPath(); ctx.arc(ant.x, ant.y - bh*3.40, tw*0.013, 0, Math.PI*2);
          ctx.fillStyle = "rgb(220,50,50)"; ctx.fill();

          // B2 sum=-0.30: mid tower, back
          const b2 = box(-0.26, -0.04, 0.12, 0.10, bh * 1.70,
            "rgb(88,108,165)", "rgb(58,80,142)", "rgb(38,55,118)");
          leftWin(b2.tl, b2.bl, b2.etl, b2.ebl, 2, 3, "rgb(20,38,88)");
          rightWin(b2.bl, b2.br, b2.ebl, b2.ebr, 1, 3, "rgb(12,25,68)");

          // B3 sum=-0.22: slim tower, back-right
          const b3 = box(0.13, -0.35, 0.09, 0.08, bh * 1.95,
            "rgb(85,105,162)", "rgb(55,78,138)", "rgb(35,52,115)");
          leftWin(b3.tl, b3.bl, b3.etl, b3.ebl, 1, 4, "rgb(20,38,88)");
          rightWin(b3.bl, b3.br, b3.ebl, b3.ebr, 1, 4, "rgb(12,25,68)");

          // B4 sum=+0.02: wide podium mid
          const b4 = box(-0.08, 0.10, 0.17, 0.13, bh * 1.15,
            "rgb(90,110,168)", "rgb(62,85,148)", "rgb(42,60,125)");
          leftWin(b4.tl, b4.bl, b4.etl, b4.ebl, 3, 2, "rgb(20,38,88)");
          rightWin(b4.bl, b4.br, b4.ebl, b4.ebr, 2, 2, "rgb(12,25,68)");

          // B5 sum=+0.10: glass curtain-wall tower — reflects sky
          const b5 = box(0.24, -0.14, 0.10, 0.08, bh * 1.45,
            "rgb(55,105,162)", "rgb(32,78,142)", "rgb(18,55,118)");
          leftWin(b5.tl, b5.bl, b5.etl, b5.ebl, 1, 3, "rgb(14,48,105)");
          rightWin(b5.bl, b5.br, b5.ebl, b5.ebr, 1, 3, "rgb(8,32,82)");

          // B6 sum=+0.42: short corner building, frontmost
          const b6 = box(0.20, 0.22, 0.11, 0.09, bh * 0.88,
            "rgb(92,112,168)", "rgb(62,85,148)", "rgb(42,62,128)");
          leftWin(b6.tl, b6.bl, b6.etl, b6.ebl, 2, 1, "rgb(20,38,88)");
          rightWin(b6.bl, b6.br, b6.ebl, b6.ebr, 1, 1, "rgb(12,25,68)");

        } else if (type === "factory") {
          // ── Factory ───────────────────────────────────────────────
          // Chimneys back-to-front first

          // Chimney 1 — tall, back-left
          const ch1 = box(-0.22, -0.10, 0.075, 0.075, bh * 2.0,
            "rgb(155,155,155)", "rgb(122,122,122)", "rgb(100,100,100)");
          const b1y = ch1.etl.y + (ch1.tl.y - ch1.etl.y) * 0.13;
          ctx.beginPath();
          ctx.moveTo(ch1.etl.x, b1y); ctx.lineTo(ch1.etr.x, b1y);
          ctx.lineTo(ch1.ebr.x, b1y); ctx.lineTo(ch1.ebl.x, b1y);
          ctx.closePath(); ctx.fillStyle = "rgba(200,45,35,0.80)"; ctx.fill();
          chimneyTops.push({ x: (ch1.etl.x+ch1.ebr.x)/2, y: (ch1.etl.y+ch1.ebr.y)/2 - bh*0.04 });

          // Chimney 2 — shorter, back-center
          const ch2 = box(-0.06, -0.14, 0.062, 0.062, bh * 1.55,
            "rgb(152,152,152)", "rgb(120,120,120)", "rgb(98,98,98)");
          const b2y = ch2.etl.y + (ch2.tl.y - ch2.etl.y) * 0.16;
          ctx.beginPath();
          ctx.moveTo(ch2.etl.x, b2y); ctx.lineTo(ch2.etr.x, b2y);
          ctx.lineTo(ch2.ebr.x, b2y); ctx.lineTo(ch2.ebl.x, b2y);
          ctx.closePath(); ctx.fillStyle = "rgba(200,45,35,0.72)"; ctx.fill();
          chimneyTops.push({ x: (ch2.etl.x+ch2.ebr.x)/2, y: (ch2.etl.y+ch2.ebr.y)/2 - bh*0.04 });

          // Main industrial hall
          const hall = box(0.04, 0.08, 0.32, 0.22, bh * 0.92,
            "rgb(175,175,175)", "rgb(142,142,142)", "rgb(118,118,118)");
          leftWin(hall.tl, hall.bl, hall.etl, hall.ebl, 3, 2, "rgb(72,72,72)");
          rightWin(hall.bl, hall.br, hall.ebl, hall.ebr, 2, 2, "rgb(55,55,55)");

          // Sawtooth roof ridges on top face
          const { etl, etr, ebl, ebr } = hall;
          ctx.strokeStyle = "rgba(100,100,100,0.55)"; ctx.lineWidth = 0.7*dpr;
          for (let sc = 1; sc < 3; sc++) {
            const t = sc / 3;
            const p1 = lp(etl, etr, t), p2 = lp(ebl, ebr, t);
            ctx.beginPath(); ctx.moveTo(p1.x, p1.y - bh*0.10); ctx.lineTo(p2.x, p2.y - bh*0.10);
            ctx.stroke();
          }

          // Loading dock annex (front)
          const dock = box(0.32, 0.20, 0.09, 0.11, bh * 0.55,
            "rgb(162,162,162)", "rgb(130,130,130)", "rgb(108,108,108)");
          // Dock door
          const dc = lp(lp(dock.tl,dock.br,0.5), {x:0,y:0}, 0);
          const doorBase = lp(dock.bl, dock.br, 0.35);
          const doorTop  = lp(dock.ebl, dock.ebr, 0.35);
          face([doorBase, lp(dock.bl,dock.br,0.65), lp(dock.ebl,dock.ebr,0.65), doorTop],
            "rgba(60,60,60,0.50)", "none");
          void dc;
        }

        // Label
        ctx.font = `${8.5 * dpr}px "Plus Jakarta Sans", system-ui, sans-serif`;
        ctx.fillStyle = "rgba(0,0,0,0.30)";
        ctx.textAlign = "center";
        ctx.fillText(n.label, S(0, 0).x, S(0.48, 0.48).y + 11 * dpr);
      }

      // ── Chimney smoke ─────────────────────────────────────────────
      // Spawn a fresh puff every ~22 frames per chimney
      if (frame % 22 === 0) {
        for (const ct of chimneyTops) {
          smoke.push({
            ox:    ct.x + (Math.random() - 0.5) * tw * 0.04,
            oy:    ct.y,
            age:   0,
            life:  160 + Math.random() * 80,       // long-lived
            r0:    tw * 0.030 + Math.random() * tw * 0.018,
            drift: (Math.random() - 0.48) * 0.18,  // gentle horizontal bias
            phase: Math.random() * Math.PI * 2,     // unique oscillation start
            freq:  0.018 + Math.random() * 0.012,  // slow wobble
          });
        }
      }

      // Draw puffs back-to-front (oldest = highest = drawn first so newer puffs sit on top)
      smoke.sort((a, b) => b.age - a.age);
      for (let i = smoke.length - 1; i >= 0; i--) {
        const s = smoke[i];
        s.age++;
        if (s.age > s.life) { smoke.splice(i, 1); continue; }

        const prog  = s.age / s.life;
        // Rise: fast at first (hot gas), then slows — use sqrt curve
        const rise  = Math.sqrt(prog) * s.life * 0.22 * dpr;
        // Lateral: slow bias + gentle sinusoidal wobble
        const drift = s.drift * s.age + Math.sin(s.age * s.freq + s.phase) * tw * 0.04;

        const cx = s.ox + drift;
        const cy = s.oy - rise;

        // Radius grows slowly as puff expands
        const r = s.r0 * dpr * (1 + prog * 1.6);

        // Opacity: ramp in quickly, hold, then fade out — avoids abrupt pop-in/out
        const alpha = 0.38 * Math.pow(Math.sin(prog * Math.PI), 0.6);

        // Soft radial gradient for feathered cloud edge
        const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        grd.addColorStop(0,   `rgba(175,175,175,${alpha})`);
        grd.addColorStop(0.5, `rgba(165,165,165,${alpha * 0.65})`);
        grd.addColorStop(1,   `rgba(155,155,155,0)`);

        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.55 }}
      aria-hidden="true"
    />
  );
}
