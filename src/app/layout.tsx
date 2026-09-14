import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "@/styles/globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Carlos Rojas — Senior Software Engineer | Distributed Systems",
    template: "%s — krlz.dev",
  },
  description:
    "Senior software engineer with 14+ years designing distributed systems, cloud-native platforms and full-stack products across healthcare, logistics and telemetry.",
  metadataBase: new URL("https://krlz.dev"),
  openGraph: {
    title: "Carlos Rojas — Senior Software Engineer",
    description:
      "Senior software engineer building distributed systems and production platforms across healthcare, logistics and telemetry.",
    url: "https://krlz.dev",
    siteName: "krlz.dev",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Carlos Rojas — Senior Software Engineer",
    description:
      "Senior software engineer building distributed systems and production platforms across healthcare, logistics and telemetry.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      "@id": "https://krlz.dev/#person",
      name: "Carlos Rojas",
      givenName: "Carlos",
      familyName: "Rojas",
      url: "https://krlz.dev",
      image: "https://krlz.dev/assets/profile.png",
      jobTitle: "Senior Software Engineer",
      description:
        "Senior Software Engineer with an MSc. in Software Engineering and 14+ years designing reliable distributed systems and production platforms for healthcare, logistics and data-intensive products.",
      email: "carlosandresmonserrat@gmail.com",
      knowsLanguage: ["English", "Spanish"],
      nationality: { "@type": "Country", name: "Bolivia" },
      workLocation: { "@type": "City", name: "Santiago, Chile" },
      alumniOf: [
        {
          "@type": "EducationalOrganization",
          name: "Innopolis University",
          url: "https://innopolis.university/",
        },
        {
          "@type": "EducationalOrganization",
          name: "Universidad Nuestra Señora de La Paz",
        },
      ],
      hasCredential: {
        "@type": "EducationalOccupationalCredential",
        name: "MSc. Information Technology: Software Engineering",
        credentialCategory: "Master's Degree",
      },
      knowsAbout: [
        "Microservices Architecture",
        "Full-Stack Development",
        "Java",
        "Scala",
        "TypeScript",
        "Python",
        "React",
        "Next.js",
        "Angular",
        "Spring Boot",
        "Akka",
        "Kafka",
        "PostgreSQL",
        "Docker",
        "Kubernetes",
        "AWS",
        "FHIR Healthcare Standards",
        "LangChain",
        "RAG Architecture",
        "AI Applications",
      ],
      sameAs: [
        "https://github.com/krlz-dev",
        "https://www.linkedin.com/in/devcarlos/",
        "https://dev.to/krlz",
      ],
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://krlz.dev/#website",
    url: "https://krlz.dev",
    name: "krlz.dev",
    description:
      "Portfolio of Carlos Rojas — senior software engineer and distributed-systems architect with 14+ years of production experience.",
    author: { "@id": "https://krlz.dev/#person" },
  },
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Projects by Carlos Rojas",
    description: "Featured software engineering projects spanning healthcare, logistics, AI, and developer tools.",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        url: "https://kit-a.com/",
        name: "kit-a — Architecture & Planning Toolkit",
        description: "Browser-based architecture and planning toolkit covering more than 1,800 cloud components.",
      },
      {
        "@type": "ListItem",
        position: 2,
        url: "https://zoo-minder.com/",
        name: "ZooMinder — Pet Medication Tracker",
        description: "Android app for scheduling pet medication reminders and tracking treatment histories.",
      },
      {
        "@type": "ListItem",
        position: 3,
        url: "https://asistente-constitucional.vercel.app/",
        name: "Constitutional AI Assistant",
        description: "AI-powered legal assistant using RAG architecture for Bolivia's constitutional data.",
      },
      {
        "@type": "ListItem",
        position: 4,
        url: "https://krlz.dev/projects/tracktec-logistics/",
        name: "Logistics & Telemetry Platform",
        description: "Logistics and telemetry products with versioned APIs, bounded-memory processing, Kafka, Redis and AWS CDK.",
      },
      {
        "@type": "ListItem",
        position: 5,
        url: "https://krlz.dev/projects/dvza-healthcare-platform/",
        name: "DVZA Healthcare Platform",
        description: "Healthcare platform decomposition and Kafka Streams architecture supporting regulated FHIR/Medmij workflows over millions of records.",
      },
    ],
  },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${plexSans.variable} ${plexMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Analitica autoalojada y sin cookies (Umami). No requiere banner de
            consentimiento y pesa ~2 KB. Panel: https://umami.codiva.cl */}
        {process.env.NODE_ENV === "production" && (
          <script
            defer
            src="https://umami.codiva.cl/script.js"
            data-website-id="3e2194a6-d787-4d4f-af91-375f577d578c"
          />
        )}
      </head>
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
