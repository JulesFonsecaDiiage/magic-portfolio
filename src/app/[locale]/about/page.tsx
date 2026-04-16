import AboutPage, { generateMetadata as generateRootMetadata } from "@/app/about/page";
import { Locale, isLocale } from "@/i18n/config";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return generateRootMetadata();
}

export default async function LocalizedAboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
	notFound();
  }

  return <AboutPage locale={locale as Locale} />;
}


