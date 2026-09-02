export interface ProjectShowcase {
  overview: string;
  contribution: string[];
  impact?: string[];
  highlights: {
    title: string;
    description: string;
  }[];
  images: string[];
}

export const projectShowcase: Record<string, ProjectShowcase> = {
  regwatch: {
    overview:
      "RegWatch is an enterprise compliance management and regulatory intelligence platform built to help organizations navigate complex and continuously evolving regulatory environments. The platform brings regulatory information, compliance monitoring, assessments, notifications, organizational information, and user management into a centralized workspace.",

    contribution: [
      "Converted Figma designs into production-ready, reusable React and TypeScript interfaces across the platform.",
      "Implemented multilingual support using i18n and react-i18next, enabling users to work with regulatory content across supported languages.",
      "Built and refined responsive user interfaces for dashboards, regulatory content, assessments, profile settings, and other core workflows.",
      "Integrated frontend interfaces with RESTful APIs and worked with backend functionality where necessary to support frontend requirements and feature delivery.",
      "Collaborated with product managers, designers, and other engineers through feature development, debugging, code reviews, and Agile delivery.",
    ],

    impact: [
      "Live across 100+ banks in Nigeria.",
      "Additional live deployments in Liberia and the United Kingdom.",
      "Built with internationalization in mind for expansion into additional markets.",
    ],

    highlights: [
      {
        title: "Regulatory intelligence",
        description:
          "Centralized regulatory information and documentation for organizations navigating changing regulatory requirements.",
      },
      {
        title: "Compliance assessments",
        description:
          "Interfaces supporting assessment workflows, scoring, and compliance monitoring.",
      },
      {
        title: "Multilingual experience",
        description:
          "Internationalized frontend interfaces designed to support multiple languages and regional deployments.",
      },
      {
        title: "Enterprise dashboard",
        description:
          "Structured dashboards and management interfaces providing visibility into organizational compliance activities.",
      },
    ],

    images: [
      "/images/projects/regwatch.png",
      "/images/projects/regwatch-dashboard.png",
      "/images/projects/regwatch-assessment-page.png",
      "/images/projects/regwatch-assessment-score-page.png",
      "/images/projects/regwatch-regulations-doc-page.png",
      "/images/projects/regulations-english.png",
      "/images/projects/regwatch-regulations-french.png",
      "/images/projects/regwatch-portuguese-settings.png",
      "/images/projects/regwatch-profile-settings.png",
    ],
  },

  opex: {
    overview:
      "OPEX is a corporate technology platform designed to present the organization's products, solutions, industries, insights, and corporate information through a modern digital experience. The platform combines a public-facing corporate website with dynamic content management and administrative workflows.",

    contribution: [
      "Designed and developed responsive interfaces from Figma designs using React and TypeScript.",
      "Built reusable components for products, solutions, industries, case studies, testimonials, leadership content, and corporate sections.",
      "Integrated frontend interfaces with backend APIs and MongoDB-backed content management workflows.",
      "Implemented contact and newsletter workflows together with the supporting backend services.",
      "Worked across the frontend, backend, and administrative interface to deliver the platform as a connected full-stack system.",
    ],

    highlights: [
      {
        title: "Dynamic content",
        description:
          "Content-driven sections allow corporate information and business offerings to be managed without hardcoding every page.",
      },
      {
        title: "Product and solution showcase",
        description:
          "Structured interfaces present technology products, solutions, industries, and related information.",
      },
      {
        title: "Corporate storytelling",
        description:
          "Leadership, testimonials, insights, case studies, and organizational information are presented through a unified experience.",
      },
      {
        title: "Administration",
        description:
          "Administrative workflows provide content management capabilities for the public-facing platform.",
      },
    ],

    images: [
      "/images/projects/opex.png",
      "/images/projects/opex-products-page.png",
      "/images/projects/opex-platform-modules.png",
      "/images/projects/opex-contact-page.png",
      "/images/projects/opex-blog-page.png",
    ],
  },

  placom: {
    overview:
      "PLACOM is a multi-role agricultural supply-chain platform built to digitize key processes across farmers, logistics operators, warehouses, and administrators. The platform connects these roles through coordinated workflows covering storage, logistics, payments, delivery updates, and operational oversight.",

    contribution: [
      "Designed and built enterprise logistics workflows across the Admin, Logistics, and Farmer portals.",
      "Implemented frontend interfaces and integrated them with backend APIs and business workflows.",
      "Built workflows covering storage requests, logistics jobs, delivery execution, payment processes, and operational updates.",
      "Worked with role-based access patterns across farmers, logistics operators, warehouses, and administrators.",
      "Connected actions across the different portals so that operational events in one role were reflected in the workflows of other roles.",
    ],

    impact: [
      "Commissioned as a state-government agricultural supply-chain platform.",
      "Now used by 10,000+ registered farmers.",
      "Supports hundreds of administrative users and multiple logistics companies.",
    ],

    highlights: [
      {
        title: "Farmer operations",
        description:
          "Farmers can request storage, monitor requests, complete payments, and track completed storage activities.",
      },
      {
        title: "Logistics operations",
        description:
          "Logistics operators can discover jobs, accept assignments, start deliveries, and update estimated arrival times.",
      },
      {
        title: "Administrative control",
        description:
          "Administrators have visibility into jobs, storage requests, payments, and other operational activities.",
      },
      {
        title: "Connected workflows",
        description:
          "The platform coordinates activity across multiple user roles rather than treating each portal as an isolated application.",
      },
    ],

    images: [
      "/images/projects/placom.png",
      "/images/projects/placom-admin-job-management.png",
      "/images/projects/placom-admin-payment-modal.png",
      "/images/projects/placom-admin-payment-page.png",
      "/images/projects/placom-admin-storage-requests.png",
      "/images/projects/placom-farmer-dashboard.png",
      "/images/projects/placom-farmer-request-modal.png",
      "/images/projects/placom-farmer-storage-requests.png",
      "/images/projects/placom-farmer-complete-payment.png",
      "/images/projects/placom-farmer-completed-storage.png",
      "/images/projects/placom-logistics-job-board.png",
      "/images/projects/placom-logistics-accept-job.png",
      "/images/projects/placom-logistics-start-delivery.png",
      "/images/projects/placom-logistics-update-ETA.png",
      "/images/projects/placom-warehouse-payment-receipt.png",
    ],
  },

  "book-store": {
    overview:
      "The Book Store Platform is a full-stack, multi-state bookstore and book distribution system designed to support online book sales alongside geographically scoped bookstore operations across Nigeria.",

    contribution: [
      "Built the customer-facing bookstore experience with authentication, book browsing, search, and state-based access.",
      "Implemented state-aware workflows so customers interact with the bookstore serving their selected state.",
      "Built administrative workflows for Super Admin and State Admin users.",
      "Implemented order management, inventory workflows, supply requests, and centralized administrative oversight.",
      "Integrated online payment workflows and responsive interfaces supporting both light and dark application themes.",
    ],

    highlights: [
      {
        title: "State-based access",
        description:
          "Customers interact with bookstore operations associated with their selected state.",
      },
      {
        title: "E-commerce",
        description:
          "Users can browse books, add items to their order, proceed through checkout, and complete online payments.",
      },
      {
        title: "Branch administration",
        description:
          "State administrators manage localized bookstore operations while central administration retains nationwide visibility.",
      },
      {
        title: "Inventory and supply",
        description:
          "The platform supports inventory management and supply requests between state branches and central administration.",
      },
    ],

    images: [
      "/images/projects/book-store.png",
      "/images/projects/book-store-dark.png",
      "/images/projects/book-store-checkout-page.png",
      "/images/projects/book-store-flutterwave-book-payment.png",
      "/images/projects/book-store-order.png",
      "/images/projects/book-store-orders-placed.png",
    ],
  },

  "bible-study": {
    overview:
      "The Bible Study Platform is a full-stack application designed around structured and trackable Bible study. Users can progress through studies in sequence, monitor their progress, participate in discussions, and continue from where they previously stopped.",

    contribution: [
      "Built the Bible study experience around structured progression through study content.",
      "Implemented user progress tracking so participants can continue from their previous position.",
      "Built discussion functionality allowing users to interact around study content.",
      "Developed responsive interfaces for reading and completing study material.",
      "Built administrative visibility into user activity and study completion.",
    ],

    highlights: [
      {
        title: "Structured studies",
        description:
          "Study content is organized into a progression that allows users to work through material in sequence.",
      },
      {
        title: "Progress tracking",
        description:
          "Users can track their study progress and return to where they previously stopped.",
      },
      {
        title: "Discussion",
        description:
          "Users can participate in discussions around study material.",
      },
      {
        title: "Completion tracking",
        description:
          "Administrative functionality provides visibility into study activity and completion.",
      },
    ],

    images: [
      "/images/projects/bible-study.png",
      "/images/projects/book-study-page.png",
      "/images/projects/bible-study-comment-on-study.png",
      "/images/projects/bible-study-complete-study.png",
    ],
  },

  "video-conference": {
    overview:
      "The Video Conference App is a browser-based communication platform designed to enable users to create and participate in virtual meetings and communicate remotely through a responsive meeting experience.",

    contribution: [
      "Designed and developed the responsive meeting interface for browser-based virtual communication.",
      "Implemented meeting creation and instant meeting workflows.",
      "Built interfaces for scheduled meetings and meeting invitations.",
      "Implemented the meeting chat experience for communication between participants.",
      "Focused on providing a usable organizational alternative for remote meetings and collaboration.",
    ],

    highlights: [
      {
        title: "Instant meetings",
        description:
          "Users can quickly create and enter virtual meetings when immediate collaboration is required.",
      },
      {
        title: "Scheduled meetings",
        description:
          "Meeting workflows support scheduling and organizing future sessions.",
      },
      {
        title: "Invitations",
        description:
          "Users can manage meeting invitations and access relevant meeting information.",
      },
      {
        title: "Meeting chat",
        description:
          "Participants have access to an in-meeting communication interface.",
      },
    ],

    images: [
      "/images/projects/video-conference.png",
      "/images/projects/video-conference-instant-meeting.png",
      "/images/projects/video-conference-schedule-meeting.png",
      "/images/projects/video-conference-invites-page.png",
      "/images/projects/video-conference-chat-room.png",
      "/images/projects/video-conference-chat-room-2.png",
    ],
  },

  "audio-sermon": {
    overview:
      "The Audio Sermon App is an audio-focused web platform designed to make sermon content accessible through a structured and responsive application.",

    contribution: [
      "Built the application interface for browsing and accessing sermon content.",
      "Implemented sermon and audio management workflows.",
      "Built the audio upload functionality used during development.",
      "Designed the application to provide a straightforward experience for discovering and accessing sermon recordings.",
      "Currently preparing the application for production deployment by migrating local Multer-based uploads to cloud storage.",
    ],

    highlights: [
      {
        title: "Sermon library",
        description:
          "Provides a structured interface for browsing available sermon content.",
      },
      {
        title: "Audio management",
        description:
          "Supports management and access of sermon audio content.",
      },
      {
        title: "Responsive experience",
        description:
          "The interface is designed to remain usable across different screen sizes.",
      },
      {
        title: "Production preparation",
        description:
          "The application is being prepared for cloud-backed storage and deployment.",
      },
    ],

    images: [
      "/images/projects/audio-sermon.png",
    ],
  },
};