import { Column, Heading, Meta, Schema, Text } from "@once-ui-system/core";
import { ContactForm } from "@/components";
import { baseURL } from "@/resources";
import { buildAlternates, getLocalizedPath, getRequestLocale } from "@/i18n/request";
import { getMessages } from "@/i18n/messages";
import { Locale } from "@/i18n/config";
import { getLocalizedContent } from "@/i18n/content";
import type { Metadata } from "next";

const contactPath = "/contact";

export async function generateMetadata({ locale: localeProp }: { locale?: Locale } = {}): Promise<Metadata> {
  const locale = localeProp ?? (await getRequestLocale());
  const messages = getMessages(locale);

  const metadata = Meta.generate({
    title: messages.contact.title,
    description: messages.contact.description,
    baseURL,
    path: getLocalizedPath(contactPath, locale),
    image: `/api/og/generate?title=${encodeURIComponent(messages.contact.title)}`,
  });

  return { ...metadata, alternates: buildAlternates(contactPath) };
}

type ContactPageProps = {
  locale?: Locale;
};

export default async ({ locale: localeProp }: ContactPageProps = {}) => {
  const locale = localeProp ?? (await getRequestLocale());
  const messages = getMessages(locale);
  const { about, person } = getLocalizedContent(locale);

  return (
    <Column maxWidth="m" gap="24" paddingTop="24">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={contactPath}
        title={messages.contact.title}
        description={messages.contact.description}
        image="/api/og/generate?title=${encodeURIComponent(messages.contact.title)}"
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Column gap="8">
        <Heading as="h1" variant="display-strong-m">
          {messages.nav.contact}
        </Heading>
        <Text onBackground="neutral-weak" variant="body-default-l">
          {messages.contact.intro}
        </Text>
      </Column>
      <ContactForm locale={locale} />
    </Column>
  );
}

