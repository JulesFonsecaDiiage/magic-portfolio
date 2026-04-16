import { getPosts } from "@/utils/utils";
import { baseURL, routes as routesConfig } from "@/resources";
import { locales } from "@/i18n/config";
import { toLocalePath } from "@/i18n/utils";

export default async function sitemap() {
  const blogs = locales.flatMap((locale) =>
    getPosts(["src", "app", "blog", "posts"]).map((post) => ({
      url: `${baseURL}${toLocalePath(`/blog/${post.slug}`, locale)}`,
      lastModified: post.metadata.publishedAt,
    })),
  );

  const works = locales.flatMap((locale) =>
    getPosts(["src", "app", "work", "projects"]).map((post) => ({
      url: `${baseURL}${toLocalePath(`/work/${post.slug}`, locale)}`,
      lastModified: post.metadata.publishedAt,
    })),
  );

  const activeRoutes = Object.keys(routesConfig).filter(
    (route) => routesConfig[route as keyof typeof routesConfig],
  );

  const routes = locales.flatMap((locale) =>
    activeRoutes.map((route) => ({
      url: `${baseURL}${toLocalePath(route, locale)}`,
      lastModified: new Date().toISOString().split("T")[0],
    })),
  );

  return [...routes, ...blogs, ...works];
}
