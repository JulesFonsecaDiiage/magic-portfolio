import { notFound } from "next/navigation";
import { getLocalizedPosts } from "@/utils/utils";
import {
  Meta,
  Schema,
  AvatarGroup,
  Column,
  Heading,
  Media,
  Text,
  SmartLink,
  Row,
  Line,
} from "@once-ui-system/core";
import { baseURL } from "@/resources";
import { formatDate } from "@/utils/formatDate";
import { ScrollToHash, CustomMDX } from "@/components";
import { Metadata } from "next";
import { Projects } from "@/components/work/Projects";
import { buildAlternates, getLocalizedPath, getRequestLocale } from "@/i18n/request";
import { getMessages } from "@/i18n/messages";
import { Locale, locales } from "@/i18n/config";
import { getLocalizedContent } from "@/i18n/content";

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const allSlugs = new Set<string>();

  for (const locale of locales) {
    const posts = getLocalizedPosts(["src", "app", "work", "projects"], locale);
    for (const post of posts) {
      allSlugs.add(post.slug);
    }
  }

  return Array.from(allSlugs).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
  locale: localeProp,
}: {
  params: Promise<{ slug: string | string[] }>;
  locale?: Locale;
}): Promise<Metadata> {
  const locale = localeProp ?? (await getRequestLocale());
  const { work } = getLocalizedContent(locale);
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug)
    ? routeParams.slug.join("/")
    : routeParams.slug || "";

  const posts = getLocalizedPosts(["src", "app", "work", "projects"], locale);
  let post = posts.find((post) => post.slug === slugPath);

  if (!post) return {};

  const metadata = Meta.generate({
    title: post.metadata.title,
    description: post.metadata.summary,
    baseURL: baseURL,
    image: post.metadata.image || `/api/og/generate?title=${post.metadata.title}`,
    path: getLocalizedPath(`${work.path}/${post.slug}`, locale),
  });

  return { ...metadata, alternates: buildAlternates(`${work.path}/${post.slug}`) };
}

export default async ({
                        params,
                        locale: localeProp,
                      }: {
  params: Promise<{ slug: string | string[] }>;
  locale?: Locale;
}) => {
  const locale = localeProp ?? (await getRequestLocale());
  const messages = getMessages(locale);
  const { about, person, work } = getLocalizedContent(locale);
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug)
    ? routeParams.slug.join("/")
    : routeParams.slug || "";

  let post = getLocalizedPosts(["src", "app", "work", "projects"], locale).find(
    (post) => post.slug === slugPath,
  );

  if (!post) {
    notFound();
  }

  const avatars =
    post.metadata.team?.map((person) => ({
      src: person.avatar,
    })) || [];

  return (
    <Column as="section" maxWidth="m" horizontal="center" gap="l">
      <Schema
        as="blogPosting"
        baseURL={baseURL}
        path={`${work.path}/${post.slug}`}
        title={post.metadata.title}
        description={post.metadata.summary}
        datePublished={post.metadata.publishedAt}
        dateModified={post.metadata.publishedAt}
        image={
          post.metadata.image || `/api/og/generate?title=${encodeURIComponent(post.metadata.title)}`
        }
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Column maxWidth="s" gap="16" horizontal="center" align="center">
        <SmartLink href={getLocalizedPath(work.path, locale)}>
          <Text variant="label-strong-m">{messages.nav.projects}</Text>
        </SmartLink>
        <Text variant="body-default-xs" onBackground="neutral-weak" marginBottom="12">
          {post.metadata.publishedAt && formatDate(post.metadata.publishedAt, false, locale)}
        </Text>
        <Heading variant="display-strong-m">{post.metadata.title}</Heading>
      </Column>
      <Row marginBottom="32" horizontal="center">
        <Row gap="16" vertical="center">
          {post.metadata.team && <AvatarGroup reverse avatars={avatars} size="s" />}
          <Text variant="label-default-m" onBackground="brand-weak">
            {post.metadata.team?.map((member, idx) => (
              <span key={idx}>
                {idx > 0 && (
                  <Text as="span" onBackground="neutral-weak">
                    ,{" "}
                  </Text>
                )}
                <SmartLink href={member.linkedIn}>{member.name}</SmartLink>
              </span>
            ))}
          </Text>
        </Row>
      </Row>
      {post.metadata.images.length > 0 && (
        <Media priority aspectRatio="16 / 9" radius="m" alt="image" src={post.metadata.images[0]} />
      )}
      <Column style={{ margin: "auto" }} as="article" maxWidth="xs">
        <CustomMDX source={post.content} />
      </Column>
      <Column fillWidth gap="40" horizontal="center" marginTop="40">
        <Line maxWidth="40" />
        <Heading as="h2" variant="heading-strong-xl" marginBottom="24">
          {messages.work.related}
        </Heading>
        <Projects exclude={[post.slug]} range={[2]} locale={locale} />
      </Column>
      <ScrollToHash />
    </Column>
  );
}
