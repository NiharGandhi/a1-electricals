"use client";

import { Header } from "./Header";
import { Footer } from "./Footer";
import { SiteSearchModal } from "@/components/search/SiteSearchModal";
import { CatalogueDownloadWidget } from "@/components/forms/CatalogueDownloadWidget";

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <CatalogueDownloadWidget />
      <SiteSearchModal />
    </>
  );
}
