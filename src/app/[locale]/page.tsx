import HomePage, { generateMetadata as generateRootMetadata } from "@/app/page";
import { Locale, isLocale } from "@/i18n/config";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return generateRootMetadata({ locale: locale as Locale });
}

export default async function LocalizedHomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
	notFound();
  }

  return <HomePage locale={locale as Locale} />;
}


