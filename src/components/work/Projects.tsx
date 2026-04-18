import { getLocalizedPosts } from "@/utils/utils";
import { Column } from "@once-ui-system/core";
import { ProjectCard } from "@/components";
import { getRequestLocale } from "@/i18n/request";
import { getMessages } from "@/i18n/messages";
import { toLocalePath } from "@/i18n/utils";
import { Locale } from "@/i18n/config";

interface ProjectsProps {
  range?: [number, number?];
  exclude?: string[];
  locale?: Locale;
}

export async function Projects({ range, exclude, locale: localeProp }: ProjectsProps) {
  const locale = localeProp ?? (await getRequestLocale());
  const messages = getMessages(locale);

  let allProjects = getLocalizedPosts(["src", "app", "work", "projects"], locale);

  // Exclude by slug (exact match)
  if (exclude && exclude.length > 0) {
    allProjects = allProjects.filter((post) => !exclude.includes(post.slug));
  }

  const sortedProjects = allProjects.sort((a, b) => {
    return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();
  });

  const displayedProjects = range
    ? sortedProjects.slice(range[0] - 1, range[1] ?? sortedProjects.length)
    : sortedProjects;

  return (
    <Column fillWidth gap="xl" marginBottom="40" paddingX="l">
      {displayedProjects.map((post, index) => (
        <ProjectCard
          priority={index < 2}
          key={post.slug}
          href={toLocalePath(`/work/${post.slug}`, locale)}
          images={post.metadata.images}
          title={post.metadata.title}
          description={post.metadata.summary}
          content={post.content}
          avatars={post.metadata.team?.map((member) => ({ src: member.avatar })) || []}
          link={post.metadata.link || ""}
          readCaseStudyLabel={messages.work.readCaseStudy}
          viewProjectLabel={messages.work.viewProject}
        />
      ))}
    </Column>
  );
}
