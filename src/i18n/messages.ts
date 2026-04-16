import { Locale } from "@/i18n/config";

type Messages = {
  languageName: string;
  switcherLabel: string;
  nav: {
    about: string;
    blog: string;
    projects: string;
    gallery: string;
  };
  blog: {
    latest: string;
    earlier: string;
    recent: string;
  };
  work: {
    related: string;
    readCaseStudy: string;
    viewProject: string;
  };
  routeGuard: {
    passwordProtected: string;
    passwordLabel: string;
    submit: string;
    incorrectPassword: string;
  };
};

const messages: Record<Locale, Messages> = {
  fr: {
    languageName: "Français",
    switcherLabel: "Changer la langue",
    nav: {
      about: "À propos",
      blog: "Blog",
      projects: "Projets",
      gallery: "Galerie",
    },
    blog: {
      latest: "Derniers articles",
      earlier: "Articles précédents",
      recent: "Articles récents",
    },
    work: {
      related: "Projets liés",
      readCaseStudy: "Lire l'étude de cas",
      viewProject: "Voir le projet",
    },
    routeGuard: {
      passwordProtected: "Cette page est protégée par un mot de passe",
      passwordLabel: "Mot de passe",
      submit: "Valider",
      incorrectPassword: "Mot de passe incorrect",
    },
  },
  en: {
    languageName: "English",
    switcherLabel: "Switch language",
    nav: {
      about: "About",
      blog: "Blog",
      projects: "Projects",
      gallery: "Gallery",
    },
    blog: {
      latest: "Latest from the blog",
      earlier: "Earlier posts",
      recent: "Recent posts",
    },
    work: {
      related: "Related projects",
      readCaseStudy: "Read case study",
      viewProject: "View project",
    },
    routeGuard: {
      passwordProtected: "This page is password protected",
      passwordLabel: "Password",
      submit: "Submit",
      incorrectPassword: "Incorrect password",
    },
  },
};

export function getMessages(locale: Locale) {
  return messages[locale];
}




