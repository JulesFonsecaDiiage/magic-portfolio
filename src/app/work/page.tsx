import { Column, Heading, Meta, Schema } from "@once-ui-system/core";
import { baseURL } from "@/resources";
import { Projects } from "@/components/work/Projects";
import { buildAlternates, getLocalizedPath, getRequestLocale } from "@/i18n/request";
import type { Metadata } from "next";
import { getLocalizedContent } from "@/i18n/content";
import { Locale } from "@/i18n/config";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const { work } = getLocalizedContent(locale);
  const metadata = Meta.generate({
      title: work.title,
      description: work.description,
      baseURL: baseURL,
      image: `/api/og/generate?title=${encodeURIComponent(work.title)}`,
      path: getLocalizedPath(work.path, locale),
  });

  return { ...metadata, alternates: buildAlternates(work.path) };
}

type WorkPageProps = { locale?: Locale };

export default async ({locale: localeProp}: WorkPageProps = {}) => {
  const locale = localeProp ?? (await getRequestLocale());
  const { work, person, about } = getLocalizedContent(locale);
  return (
    <Column maxWidth="m" paddingTop="24">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={work.path}
        title={work.title}
        description={work.description}
        image={`/api/og/generate?title=${encodeURIComponent(work.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Heading marginBottom="l" variant="heading-strong-xl" align="center">
        {work.title}
      </Heading>
      <Projects locale={locale} />
    </Column>
  );
}
