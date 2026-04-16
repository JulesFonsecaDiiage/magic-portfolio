import { Flex, Meta, Schema } from "@once-ui-system/core";
import GalleryView from "@/components/gallery/GalleryView";
import { baseURL } from "@/resources";
import { buildAlternates, getLocalizedPath, getRequestLocale } from "@/i18n/request";
import type { Metadata } from "next";
import { getLocalizedContent } from "@/i18n/content";
import { Locale } from "@/i18n/config";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const { gallery } = getLocalizedContent(locale);
  const metadata = Meta.generate({
      title: gallery.title,
      description: gallery.description,
      baseURL: baseURL,
      image: `/api/og/generate?title=${encodeURIComponent(gallery.title)}`,
      path: getLocalizedPath(gallery.path, locale),
  });

  return { ...metadata, alternates: buildAlternates(gallery.path) };
}

type GalleryPageProps = { locale?: Locale };

export default async ({locale: localeProp}: GalleryPageProps = {}) => {
  const locale = localeProp ?? (await getRequestLocale());
  const { gallery, person } = getLocalizedContent(locale);
  return (
    <Flex maxWidth="l">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={gallery.title}
        description={gallery.description}
        path={gallery.path}
        image={`/api/og/generate?title=${encodeURIComponent(gallery.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${gallery.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <GalleryView />
    </Flex>
  );
}
