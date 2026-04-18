import BlogSlugPage, {
  generateMetadata as generateRootMetadata,
  generateStaticParams as generateRootStaticParams,
} from "@/app/blog/[slug]/page";
import { Locale, isLocale, locales } from "@/i18n/config";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ComponentType } from "react";

export async function generateMetadata(args: {
  params: Promise<{ locale: string; slug: string | string[] }>;
}): Promise<Metadata> {
  const routeParams = await args.params;

  if (!isLocale(routeParams.locale)) {
    notFound();
  }

  return generateRootMetadata({
    params: Promise.resolve({ slug: routeParams.slug }),
    locale: routeParams.locale as Locale,
  });
}

export async function generateStaticParams(): Promise<Array<{ locale: string; slug: string }>> {
  const params = await generateRootStaticParams();
  return locales.flatMap((locale) => params.map((param) => ({ locale, slug: param.slug })));
}

export default async function LocalizedBlogSlugPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string | string[] }>;
}) {
  const routeParams = await params;

  if (!isLocale(routeParams.locale)) {
    notFound();
  }

  const BlogSlugRenderer = BlogSlugPage as unknown as ComponentType<{
    params: Promise<{ slug: string | string[] }>;
    locale?: Locale;
  }>;

  return (
    <BlogSlugRenderer
      params={Promise.resolve({ slug: routeParams.slug })}
      locale={routeParams.locale as Locale}
    />
  );
}




