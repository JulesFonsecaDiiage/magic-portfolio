import { Column, Heading, Meta, Schema } from "@once-ui-system/core";
import { Mailchimp } from "@/components";
import { Posts } from "@/components/blog/Posts";
import { baseURL } from "@/resources";
import { buildAlternates, getLocalizedPath, getRequestLocale } from "@/i18n/request";
import { getMessages } from "@/i18n/messages";
import type { Metadata } from "next";
import { getLocalizedContent } from "@/i18n/content";
import { Locale } from "@/i18n/config";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const { blog } = getLocalizedContent(locale);
  const metadata = Meta.generate({
      title: blog.title,
      description: blog.description,
      baseURL: baseURL,
      image: `/api/og/generate?title=${encodeURIComponent(blog.title)}`,
      path: getLocalizedPath(blog.path, locale),
  });

  return { ...metadata, alternates: buildAlternates(blog.path) };
}

type BlogPageProps = { locale?: Locale };

export default async ({locale: localeProp}: BlogPageProps = {}) => {
  const locale = localeProp ?? (await getRequestLocale());
  const messages = getMessages(locale);
  const { blog, person } = getLocalizedContent(locale);

  return (
    <Column maxWidth="m" paddingTop="24">
      <Schema
        as="blogPosting"
        baseURL={baseURL}
        title={blog.title}
        description={blog.description}
        path={blog.path}
        image={`/api/og/generate?title=${encodeURIComponent(blog.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}/blog`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Heading marginBottom="l" variant="heading-strong-xl" marginLeft="24">
        {blog.title}
      </Heading>
      <Column fillWidth flex={1} gap="40">
        <Posts range={[1, 1]} thumbnail locale={locale} />
        <Posts range={[2, 3]} columns="2" thumbnail direction="column" locale={locale} />
        <Mailchimp marginBottom="l" />
        <Heading as="h2" variant="heading-strong-xl" marginLeft="l">
          {messages.blog.earlier}
        </Heading>
        <Posts range={[4]} columns="2" locale={locale} />
      </Column>
    </Column>
  );
}
