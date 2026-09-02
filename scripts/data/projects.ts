export interface SeedProject {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  image: string;
  category: string;
  technologies: string[];
  features: string[];
  role: string;
  status:
    | "Completed"
    | "In Progress"
    | "Maintained"
    | "Coming Soon";
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  order: number;
}

export const projects: SeedProject[] = [
  {
    id: "regwatch",
    slug: "regwatch",
    title: "RegWatch",
    shortDescription:
      "Enterprise compliance management and regulatory intelligence platform for organizations navigating complex regulatory environments.",
    description:
      "RegWatch is an enterprise compliance management and regulatory intelligence platform built to help organizations navigate complex and continuously evolving regulatory environments. The platform centralizes regulatory information, compliance monitoring, assessments, notifications, organizational information, and user management into a structured workspace. It is deployed across 100+ banks in Nigeria, with additional live deployments in Liberia and the United Kingdom.",
    image: "/images/projects/regwatch.png",
    category: "RegTech",
    technologies: [
      "React",
      "TypeScript",
      "Node.js",
      "MongoDB",
    ],
    features: [
      "Regulatory intelligence",
      "Compliance monitoring",
      "Compliance assessments",
      "Notifications",
      "Organizational management",
      "User management",
    ],
    role: "Frontend Engineer",
    status: "Maintained",
    featured: true,
    order: 1,
    githubUrl:
      "https://github.com/PeterManassehOz/regwatch-case-study",
    liveUrl:
      "https://www.watch.regtech365.com/",
  },

  {
    id: "opex",
    slug: "opex",
    title: "OPEX",
    shortDescription:
      "Corporate technology platform presenting products, solutions, industries, insights, and organizational information through a modern digital experience.",
    description:
      "OPEX is a corporate technology website built to present the organization's products, solutions, industries, insights, and corporate information through a modern, responsive digital platform. The platform includes dynamic content-driven sections, product and solution showcases, case studies, industry information, testimonials, leadership content, contact and newsletter workflows, and an administrative interface for managing website content.",
    image: "/images/projects/opex.png",
    category: "Corporate Platform",
    technologies: [
      "React",
      "TypeScript",
      "Node.js",
      "MongoDB",
    ],
    features: [
      "Dynamic content management",
      "Product showcases",
      "Solution showcases",
      "Case studies",
      "Industry information",
      "Testimonials",
      "Leadership content",
      "Contact workflows",
      "Newsletter workflows",
      "Administrative interface",
    ],
    role: "Full-Stack Engineer",
    status: "Maintained",
    featured: true,
    order: 2,
    liveUrl:
      "https://opex-website-fe-staging-197301616810.us-central1.run.app",
  },

  {
    id: "placom",
    slug: "placom",
    title: "PLACOM",
    shortDescription:
      "Multi-role agricultural supply-chain platform connecting farmers, logistics operators, warehouses, and administrators.",
    description:
      "PLACOM is a multi-role platform built to digitize key processes across the agricultural supply chain. The platform connects farmers, logistics operators, warehouses, and administrators through coordinated workflows covering storage requests, logistics, payments, delivery updates, operational oversight, and platform activity.",
    image: "/images/projects/placom.png",
    category: "AgriTech",
    technologies: [
      "React",
      "TypeScript",
      "Node.js",
      "MongoDB",
      "Mongoose",
    ],
    features: [
      "Farmer workflows",
      "Logistics management",
      "Warehouse operations",
      "Storage requests",
      "Delivery tracking",
      "Payment workflows",
      "Role-based access control",
      "Administrative oversight",
    ],
    role: "Full-Stack Engineer",
    status: "Maintained",
    featured: false,
    order: 3,
    githubUrl:
      "https://github.com/PeterManassehOz/placom-platform-case-study",
    liveUrl:
      "https://placom-ng-197301616810.europe-west1.run.app/",
  },

  {
    id: "book-store",
    slug: "book-store",
    title: "Book Store Platform",
    shortDescription:
      "Multi-state bookstore and book distribution platform combining e-commerce, inventory management, branch administration, and centralized oversight.",
    description:
      "A full-stack bookstore and book distribution platform designed to support distributed bookstore operations across Nigeria. The system combines online book sales with hierarchical administration and geographically scoped access control, allowing customers to interact with bookstores serving their selected state while central administration maintains nationwide visibility.",
    image: "/images/projects/book-store.png",
    category: "E-Commerce",
    technologies: [
      "React",
      "TypeScript",
      "Node.js",
      "MongoDB",
    ],
    features: [
      "User registration",
      "State-based bookstore access",
      "Online book browsing",
      "Online payments",
      "Book ordering",
      "State-level order management",
      "Super Admin management",
      "State Admin management",
      "Inventory management",
      "Supply requests",
      "Centralized oversight",
      "Light and dark themes",
    ],
    role: "Full-Stack Engineer",
    status: "Maintained",
    featured: false,
    order: 4,
    githubUrl:
      "https://github.com/PeterManassehOz/PHouse-Book-Store",
    liveUrl:
      "https://p-house-book-store.vercel.app/",
  },

  {
    id: "bible-study",
    slug: "bible-study",
    title: "Bible Study App",
    shortDescription:
      "Interactive Bible study management application designed around structured study progression, discussions, and user activity tracking.",
    description:
      "A full-stack Bible study management application designed to provide users with a structured, interactive, and trackable Bible study experience. Users can progress through studies in sequence, track their individual progress, participate in discussions, and continue from where they previously stopped. An administrative interface provides visibility into user activity and study completion.",
    image: "/images/projects/bible-study.png",
    category: "Education",
    technologies: [
      "React",
      "TypeScript",
      "Node.js",
      "MongoDB",
    ],
    features: [
      "Structured Bible studies",
      "Study progression",
      "Progress tracking",
      "Discussion functionality",
      "Resume-from-last-position",
      "Administrative activity monitoring",
    ],
    role: "Full-Stack Engineer",
    status: "Maintained",
    featured: false,
    order: 5,
    githubUrl:
      "https://github.com/PeterManassehOz/PeaceHouse-Bible-Study",
    liveUrl:
      "https://peace-house-bible-study.vercel.app/",
  },

  {
    id: "video-conference",
    slug: "video-conference",
    title: "Video Conference App",
    shortDescription:
      "Browser-based video conferencing platform for virtual meetings and remote collaboration.",
    description:
      "A browser-based video conferencing platform designed to enable users to create and participate in virtual meetings and communicate remotely. The application provides an organizational alternative for online meetings and virtual collaboration, with a responsive interface optimized for different screen sizes.",
    image: "/images/projects/video-conference.png",
    category: "Communication",
    technologies: [
      "React",
      "TypeScript",
    ],
    features: [
      "Meeting creation",
      "Meeting participation",
      "Browser-based communication",
      "Responsive meeting interface",
      "Remote collaboration",
    ],
    role: "Full-Stack Engineer",
    status: "In Progress",
    featured: false,
    order: 6,
    githubUrl:
      "https://github.com/PeterManassehOz/PHouse-Conference-Room",
    liveUrl:
      "https://p-house-conference-room.vercel.app/",
  },

  {
    id: "audio-sermon",
    slug: "audio-sermon",
    title: "Audio Sermon App",
    shortDescription:
      "Audio-focused platform for making sermon content accessible through a web application.",
    description:
      "An audio sermon application currently being prepared for production deployment. The application will be migrated from local Multer-based uploads to cloud storage before being deployed to production infrastructure.",
    image: "/images/projects/audio-sermon.png",
    category: "Media Platform",
    technologies: [
      "React",
      "TypeScript",
      "Node.js",
    ],
    features: [
      "Audio sermon management",
      "Audio uploads",
      "Sermon browsing",
      "Responsive interface",
    ],
    role: "Full-Stack Engineer",
    status: "In Progress",
    featured: false,
    order: 7,
    githubUrl:
      "https://github.com/PeterManassehOz/PHouse-Sermon",
  },
];