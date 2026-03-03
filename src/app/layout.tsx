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
    default: "krlz.dev — Carlos Rojas | Software Engineer",
    template: "%s — krlz.dev",
  },
  description:
    "Carlos Rojas — Software Engineer, MSc. 14+ years building scalable full-stack systems, microservices, and AI-powered applications.",
  metadataBase: new URL("https://krlz.dev"),
  openGraph: {
    title: "krlz.dev — Carlos Rojas | Software Engineer",
    description:
      "Software Engineer, MSc. 14+ years building scalable full-stack systems, microservices, and AI-powered applications.",
    url: "https://krlz.dev",
    siteName: "krlz.dev",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "krlz.dev — Carlos Rojas | Software Engineer",
    description:
      "Software Engineer, MSc. 14+ years building scalable full-stack systems, microservices, and AI-powered applications.",
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
        "Software Engineer with MSc. in Software Engineering from Innopolis University and 14+ years of experience in full-stack development, microservices architecture, cloud-native systems, and AI-powered applications using LangChain and RAG.",
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
        "https://linkedin.com/in/krlz",
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
      "Portfolio of Carlos Rojas — Senior Software Engineer with 14+ years of experience in microservices, full-stack development, and AI applications.",
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
        description: "Browser-based toolkit for system architecture diagrams and Gantt project planning.",
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
        description: "Full-stack logistics software with Kafka, AWS, and automated data pipelines at TrackTec.",
      },
      {
        "@type": "ListItem",
        position: 5,
        url: "https://krlz.dev/projects/dvza-healthcare-platform/",
        name: "DVZA Healthcare Platform",
        description: "Data services platform for Dutch healthcare processing millions of FHIR-compliant patient records.",
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
      </head>
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
