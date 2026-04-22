import ContactPage, { generateMetadata as generateRootMetadata } from "@/app/contact/page";
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

export default async function LocalizedContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return <ContactPage locale={locale as Locale} />;
}

