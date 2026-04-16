import { Locale } from "@/i18n/config";
import {
  about as baseAbout,
  blog as baseBlog,
  gallery as baseGallery,
  home as baseHome,
  person as basePerson,
  work as baseWork,
} from "@/resources/content";

export function getLocalizedContent(locale: Locale) {
  if (locale === "fr") {
    return {
      person: {
        ...basePerson,
        role: "Ingénieur logiciel",
        languages: ["Français", "Anglais"],
      },
      home: {
        ...baseHome,
        title: `Portfolio de ${basePerson.name}`,
        description: `Portfolio présentant mes réalisations en ingénierie logicielle`,
        headline: <>Du besoin métier au code en production</>,
        subline: (
          <>
            Salut, moi c'est Jules. Je conçois des logiciels métier avec une vraie culture produit fonctionnel.
            <br /><br />
            Mon expérience va de la livraison de features, à l'architecture, les tests et le travail en équipe agile.
          </>
        ),
      },
      about: {
        ...baseAbout,
        label: "À propos",
        title: `À propos - ${basePerson.name}`,
        description: `Découvrez ${basePerson.name}, ingénieur logiciel basé à Dijon`,
        intro: {
          ...baseAbout.intro,
          title: "Introduction",
          description: (
            <>
              Je suis un ingénieur logiciel français basé à Dijon, actuellement en fin de Master en ingénierie logicielle.
              <br />
              J'ai près de 4 ans d'expérience dans le développement de fonctionnalités, la correction de bugs, les tests et la livraison de projets en équipes agiles.
            </>
          ),
        },
        work: {
          ...baseAbout.work,
          title: "Expériences professionnelles",
          experiences: [
            {
              ...baseAbout.work.experiences[0],
              role: "Ingénieur logiciel en alternance",
              achievements: [
                <>Participation active à plusieurs produits clients (Carrefour Pro, CEBFC, Laruche) avec livraison de fonctionnalités, correctifs et couverture de tests.</>,
                <>Développeur principal sur un WMS sur mesure pour Laruche Logistique, avec une V1 livrée en 6 semaines en binôme.</>,
                <>Travail dans un cadre agile : revues de code, rituels de sprint et collaboration étroite avec les équipes métier.</>,
              ],
            },
            {
              ...baseAbout.work.experiences[1],
              role: "Ingénieur logiciel en alternance",
              achievements: [
                <>Développement de fonctionnalités internes et clients avec Express.js, Node.js, PHP, Vue.js, Angular et Ionic.</>,
                <>Contribution à une application multiplateforme utilisée par des mairies pour diffuser de l'information aux citoyens.</>,
                <>Mise en pratique quotidienne des tests unitaires, des méthodes agiles et des revues de code.</>,
              ],
            },
            {
              ...baseAbout.work.experiences[2],
              role: "Stagiaire ingénieur logiciel",
              achievements: [
                <>Premier stage en ingénierie logicielle avec livraison de fonctionnalités orientées client dans des contextes de production.</>,
                <>Montée en compétence rapide sur les pratiques d'ingénierie et validation de mon orientation vers le développement logiciel.</>,
              ],
            },
          ],
        },
        studies: {
          ...baseAbout.studies,
          title: "Études",
          institutions: [
            {
              name: "DIIAGE - Master Expert en Architecture et Développement logiciel",
              description: <>2023 - 2026, Dijon (France). Formation avec des projets en équipe agiles, pour des clients réels ou fictifs. </>
            },
            {
              name: "Lycée Mathias - BTS SIO (SLAM)",
              description: <>2021 - 2023, Chalon-sur-Saone (France). <b><i>Major de promotion.</i></b></>,
            },
            {
              name: "Lycée Henri Parriat - Baccalauréat général",
              description: <>2018 - 2021, Montceau-les-Mines (France). Spécialités: Physique-Chimie et Sciences de l'Ingénieur.</>,
            },
            {
              name: "Stanford University / DeepLearning.AI - ML Specialization (Online)",
              description: <>Complétée en 2024 sur Coursera (Supervised, Advanced, and Unsupervised learnings).</>,
            },
          ],
        },
        technical: {
          ...baseAbout.technical,
          title: "Compétences techniques",
          skills: [
            {
              ...baseAbout.technical.skills[0],
              title: "Développement web full-stack",
              description: <>Conception de fonctionnalités robustes avec JavaScript/TypeScript ou PHP, côté front et back.</>,
            },
            {
              ...baseAbout.technical.skills[1],
              title: "Ingénierie API",
              description: <>Conception et implémentation d'API et de services métier avec C# et ASP.NET dans des projets en équipe.</>,
            },
            {
              ...baseAbout.technical.skills[2],
              title: "Architecture, qualité et livraison",
              description: <>Mise en œuvre de principes de clean architecture, de DI, de stratégies de test (UT/IT/E2E), de CI/CD et de delivery agile.</>,
            },
            {
              ...baseAbout.technical.skills[3],
              title: "Intelligence artificielle et machine learning",
              description: <>Exploration de cas d'usage IA via cours et projets, avec un intérêt particulier pour l'IA générative et les fondamentaux du machine learning.</>,
            },
          ],
        },
      },
      blog: {
        ...baseBlog,
        title: "Articles sur le design, l'ingénierie et la tech",
        description: `Les dernières publications de ${basePerson.name}`,
      },
      work: {
        ...baseWork,
        title: `Projets - ${basePerson.name}`,
        description: `Sélection de projets design et développement réalisés par ${basePerson.name}`,
      },
      gallery: {
        ...baseGallery,
        title: `Galerie photo - ${basePerson.name}`,
        description: `Sélection de photos par ${basePerson.name}`,
      },
    };
  }

  return {
    person: basePerson,
    home: baseHome,
    about: baseAbout,
    blog: baseBlog,
    work: baseWork,
    gallery: baseGallery,
  };
}


