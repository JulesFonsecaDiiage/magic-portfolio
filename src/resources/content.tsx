import { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import {Line, Row, Text} from "@once-ui-system/core";

const person: Person = {
  firstName: "Jules",
  lastName: "Fonseca",
  name: `Jules Fonseca`,
  role: "Software Engineer",
  avatar: "/images/avatar.jpg",
  email: "jules.fonseca@diiage.org",
  location: "Europe/Paris", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  languages: ["French", "English"], // optional: Leave the array empty if you don't want to display languages
};

const newsletter: Newsletter = {
  display: false,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: <>My weekly newsletter about creativity and engineering</>,
};

const social: Social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  // Set essentials: true for links you want to show on the about page
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/jules-fonseca/",
    essential: true,
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
    essential: true,
  },
];

const home: Home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>Building reliable software from idea to production</>,
  featured: {
    display: false,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">Once UI</strong>{" "}
        <Line background="brand-alpha-strong" vert height="20" />
        <Text marginRight="4" onBackground="brand-medium">
          Featured work
        </Text>
      </Row>
    ),
    href: "/work/laruche-logistique-custom-wms-v1",
  },
  subline: (
    <>
      Hi, I'm Jules. I build business software with a strong product mindset. <br />
      My experience covers client delivery, architecture, testing, and agile teamwork.
    </>
  ),
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, ${person.role} from ${person.location}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: false,
    link: "https://cal.com",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        I am a French software engineer based in Dijon, currently finishing a Master's degree in software engineering.
        <br />
        I have close to 4 years of professional experience across product features, bug fixing, testing, and end-to-end delivery.
      </>
    ),
  },
  work: {
    display: true, // set to false to hide this section
    title: "Work Experience",
    experiences: [
      {
        company: "Planet Bourgogne",
        timeframe: "2023 - Present",
        role: "Software Engineer Apprentice",
        achievements: [
          <>
            Contributed to multiple client products (Carrefour Pro, CEBFC, Laruche) through features, bug fixes, and test coverage.
          </>,
          <>
            Worked as the main developer on a custom WMS for Laruche Logistique, delivered as a V1 in 6 weeks with one teammate.
          </>,
          <>
            Delivered code in an agile setup with reviews, sprint rituals, and collaboration with business stakeholders.
          </>,
        ],
        tags: [
          {name: "PHP", icon: "php"},
          {name: "Symfony", icon: "symfony"},
          {name: "React", icon: "react"},
          {name: "Docker", icon: "docker"},
          {name: "Gitlab", icon: "gitlab"},
        ],
        images: [],
      },
      {
        company: "Ideal Solutions",
        timeframe: "Sep 2022 - Aug 2023",
        role: "Software Engineer Apprentice",
        achievements: [
          <>
            Built internal and customer features with Vue.js, Angular, Express.js, Node.js, PHP, and Ionic.
          </>,
          <>
            Contributed to a custom multiplatform app used by city halls to publish information to citizens.
          </>,
          <>
            Applied unit testing, agile practices, and code reviews in day-to-day delivery.
          </>,
        ],
        tags: [
          {name: "JavaScript", icon: "javascript"},
          {name: "Angular", icon: "angular"},
          {name: "Vue.js", icon: "vue"},
          {name: "Node.js", icon: "nodejs"},
          {name: "PHP", icon: "php"},
          {name: "Github", icon: "github"},
        ],
        images: [],
      },
      {
        company: "Ideal Solutions",
        timeframe: "2022 (6 weeks)",
        role: "Software Engineer Intern",
        achievements: [
          <>
            Completed my first software engineering internship and shipped customer-focused features in production contexts.
          </>,
          <>
            Strengthened practical engineering skills and confirmed my long-term path in software development.
          </>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true, // set to false to hide this section
    title: "Studies",
    institutions: [
      {
        name: "DIIAGE - Master's level, Expert in Computer Systems",
        description: <>2023 - 2026, Dijon (France). Project-based learning in software engineering and DevOps.</>,
      },
      {
        name: "Mathias High School - BTS SIO (SLAM)",
        description: <>2021 - 2023, Chalon-sur-Saone (France). Major of the promotion.</>,
      },
      {
        name: "H. Parriat High School - General High School Degree",
        description: <>2018 - 2021, Montceau-les-Mines (France). Specialties: Physics-Chemistry and Engineering Science.</>,
      },
      {
        name: "Stanford University / DeepLearning.AI - ML Specialization (Online)",
        description: <>Completed in 2024 on Coursera (Supervised, Advanced, and Unsupervised learning tracks).</>,
      },
    ],
  },
  technical: {
    display: true, // set to false to hide this section
    title: "Technical skills",
    skills: [
      {
        title: "Full-stack web development",
        description: (
          <>Building production-ready features with JavaScript/TypeScript or PHP and modern web frameworks on both frontend and backend.</>
        ),
        tags: [
          {name: "TypeScript", icon: "typescript"},
          {name: "JavaScript", icon: "javascript"},
          {name: "Node.js", icon: "nodejs"},
          {name: "React", icon: "react"},
          {name: "Angular", icon: "angular"},
          {name: "Vue", icon: "vue"},
          {name: "PHP", icon: "php"},
        ],
        images: [],
      },
      {
        title: "API engineering",
        description: (
          <>Designing and implementing APIs and business services with C# and ASP.NET in team-based projects.</>
        ),
        tags: [
          {name: ".NET", icon: "dotnet"},
          {name: "ASP.NET"},
          {name: "MySQL", icon: "mysql"},
        ],
        images: [],
      },
      {
        title: "Architecture, quality, and delivery",
        description: (
          <>Applying clean architecture, testing strategies (UT/IT/E2E), CI/CD practices, and agile delivery workflows.</>
        ),
        tags: [
          {name: "Docker", icon: "docker"},
          {name: "Clean Architecture"},
          {name: "Unit Testing"},
          {name: "CI/CD"},
          {name: "Agile"},
        ],
        images: [],
      },
      {
        title: "AI and data curiosity",
        description: (
          <>Exploring practical AI through coursework and projects, including generative AI and machine learning fundamentals.</>
        ),
        tags: [
          {name: "Python", icon: "python"},
          {name: "Machine Learning"},
          {name: "Generative AI"},
        ],
        images: [],
      },
    ],
  },
};

const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: "Writing about design and tech...",
  description: `Read what ${person.name} has been up to recently`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work: Work = {
  path: "/work",
  label: "Work",
  title: `Projects – ${person.name}`,
  description: `Design and dev projects by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Photo gallery – ${person.name}`,
  description: `A photo collection by ${person.name}`,
  // Images by https://lorant.one
  // These are placeholder images, replace with your own
  images: [
    {
      src: "/images/gallery/horizontal-1.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-4.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/horizontal-3.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-1.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-2.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/horizontal-2.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-4.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-3.jpg",
      alt: "image",
      orientation: "vertical",
    },
  ],
};

export { person, social, newsletter, home, about, blog, work, gallery };
