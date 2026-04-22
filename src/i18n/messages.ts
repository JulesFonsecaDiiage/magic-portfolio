import { Locale } from "@/i18n/config";

type Messages = {
  languageName: string;
  switcherLabel: string;
  nav: {
    about: string;
    blog: string;
    projects: string;
    gallery: string;
    contact: string;
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
  contact: {
    title: string;
    description: string;
    intro: string;
    formTitle: string;
    nameLabel: string;
    emailLabel: string;
    messageLabel: string;
    submit: string;
    success: string;
    error: string;
    emailError: string;
    messageError: string;
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
      contact: "Contact",
    },
    blog: {
      latest: "Derniers articles",
      earlier: "Articles précédents",
      recent: "Articles récents",
    },
    work: {
      related: "Projets liés",
      readCaseStudy: "Découvrir le projet",
      viewProject: "Voir le projet",
    },
    routeGuard: {
      passwordProtected: "Cette page est protégée par un mot de passe",
      passwordLabel: "Mot de passe",
      submit: "Valider",
      incorrectPassword: "Mot de passe incorrect",
    },
    contact: {
      title: "Contact - Jules Fonseca",
      description: "Contactez-moi pour toute demande, opportunité ou simplement pour dire bonjour !",
      intro: "N'hésitez pas à me contacter pour toute question ou opportunité professionnelle.",
      formTitle: "Contactez-moi",
      nameLabel: "Nom",
      emailLabel: "Email",
      messageLabel: "Message",
      submit: "Envoyer",
      success: "Votre message a été envoyé avec succès !",
      error: "Une erreur est survenue lors de l'envoi de votre message.",
      emailError: "Merci de renseigner un email valide.",
      messageError: "Merci d'ajouter un peu de contexte dans votre message.",
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
      contact: "Contact",
    },
    blog: {
      latest: "Latest from the blog",
      earlier: "Earlier posts",
      recent: "Recent posts",
    },
    work: {
      related: "Related projects",
      readCaseStudy: "View project",
      viewProject: "View project",
    },
    routeGuard: {
      passwordProtected: "This page is password protected",
      passwordLabel: "Password",
      submit: "Submit",
      incorrectPassword: "Incorrect password",
    },
    contact: {
      title: "Contact - Jules Fonseca",
      description: "Feel free to reach out for any questions, opportunities, or just to say hello!",
      intro: "Feel free to reach out for any questions or professional opportunities.",
      formTitle: "Get in touch",
      nameLabel: "Name",
      emailLabel: "Email",
      messageLabel: "Message",
      submit: "Send",
      success: "Your message has been sent successfully!",
      error: "An error occurred while sending your message.",
      emailError: "Please provide a valid email address.",
      messageError: "Please add a bit more context in your message.",
    },
  },
};

export function getMessages(locale: Locale) {
  return messages[locale];
}




