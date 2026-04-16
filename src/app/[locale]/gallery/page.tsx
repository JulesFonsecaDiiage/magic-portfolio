import GalleryPage, { generateMetadata as generateRootMetadata } from "@/app/gallery/page";
import { Locale, isLocale } from "@/i18n/config";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata(): Promise<Metadata> {
  return generateRootMetadata();
}

export default async function LocalizedGalleryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return <GalleryPage locale={locale as Locale} />;
}



