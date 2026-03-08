import { Container } from "@/components/ui/Container";

interface PageHeroProps {
  title: string;
  subtitle?: string;
}

export function PageHero({ title, subtitle }: PageHeroProps) {
  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-28 border-b border-[var(--border-strong)] bg-[var(--background)] relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] rounded-full bg-[var(--gold)]/5 blur-[150px] pointer-events-none" />

      <Container>
        <div className="max-w-4xl">
          <h1
            className="text-[var(--foreground)]"
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(3rem, 7vw, 5.5rem)", fontWeight: 600, lineHeight: 1.05, letterSpacing: "-0.01em" }}
          >
            {title}
          </h1>
          <span className="gold-rule mt-6" />
          {subtitle && (
            <p className="mt-6 text-[var(--muted-light)] text-lg md:text-xl leading-[1.75] max-w-2xl">
              {subtitle}
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}
