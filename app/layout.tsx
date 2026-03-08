import type { Metadata } from "next";
import "./globals.css";
import { Shell } from "@/components/layout/Shell";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.a1electricals.com"),
  title: {
    default: "A-1 Electricals | Power Cable Accessories Manufacturer – Rajkot, India",
    template: "%s | A-1 Electricals",
  },
  description:
    "A-1 Electricals is a leading ISO 9001 certified manufacturer of power cable accessories — shear bolt cable lugs, EHV substation connectors, compression lugs, cable glands, cable cleats, and busbars. Serving utilities, EPC contractors, and OEMs globally from Rajkot, Gujarat, India.",
  keywords: [
    "cable lugs manufacturer India",
    "shear bolt cable connectors",
    "EHV substation connectors",
    "compression cable lugs",
    "cable glands manufacturer",
    "aluminium cable lugs",
    "bimetallic cable lugs",
    "cable termination joints",
    "IEC 61238-1 connectors",
    "power cable accessories",
    "busbar manufacturer",
    "flexible copper braid",
    "cable cleats manufacturer",
    "A-1 Electricals Rajkot",
    "electrical connectivity solutions",
    "substation EHV clamps",
  ],
  authors: [{ name: "A-1 Electricals" }],
  creator: "A-1 Electricals",
  publisher: "A-1 Electricals",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.a1electricals.com",
    siteName: "A-1 Electricals",
    title: "A-1 Electricals | Power Cable Accessories Manufacturer",
    description:
      "ISO 9001 certified manufacturer of shear bolt cable lugs, EHV substation connectors, compression lugs, cable glands & more. CE & RoHS compliant. Rajkot, India.",
    images: [{ url: "/a1-logo.jpg", width: 1200, height: 630, alt: "A-1 Electricals" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "A-1 Electricals | Power Cable Accessories Manufacturer",
    description: "ISO 9001 certified manufacturer of power cable accessories. Rajkot, India.",
    images: ["/a1-logo.jpg"],
  },
  alternates: { canonical: "https://www.a1electricals.com" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "A-1 Electricals",
  alternateName: "A1 Electricals",
  url: "https://www.a1electricals.com",
  logo: "https://www.a1electricals.com/a1-logo.jpg",
  description:
    "ISO 9001 certified manufacturer of power cable accessories including shear bolt cable lugs, EHV substation connectors, compression lugs, cable glands, cable cleats, and busbars.",
  foundingDate: "2006",
  address: {
    "@type": "PostalAddress",
    streetAddress: "G-1053, Lodhika GIDC Metoda, Kalavad Road, Metoda",
    addressLocality: "Rajkot",
    addressRegion: "Gujarat",
    postalCode: "360021",
    addressCountry: "IN",
  },
  contactPoint: [
    { "@type": "ContactPoint", telephone: "+91-93741-20257", contactType: "sales" },
    { "@type": "ContactPoint", email: "info@a1electricals.com", contactType: "customer support" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="antialiased">
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
