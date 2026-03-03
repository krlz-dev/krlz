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
    default: "krlz.dev — Carlos | Developer",
    template: "%s — krlz.dev",
  },
  description:
    "Carlos — Developer portfolio. Building digital experiences with code and craft.",
  metadataBase: new URL("https://krlz.dev"),
  openGraph: {
    title: "krlz.dev — Carlos | Developer",
    description:
      "Developer portfolio. Building digital experiences with code and craft.",
    url: "https://krlz.dev",
    siteName: "krlz.dev",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "krlz.dev — Carlos | Developer",
    description:
      "Developer portfolio. Building digital experiences with code and craft.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Carlos",
  url: "https://krlz.dev",
  jobTitle: "Developer",
  sameAs: [
    "https://github.com/krlz",
    "https://linkedin.com/in/krlz",
  ],
};

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
