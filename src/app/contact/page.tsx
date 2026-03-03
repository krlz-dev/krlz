import type { Metadata } from "next";
import ContactSection from "@/components/sections/ContactSection";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Carlos — open to new opportunities and interesting conversations.",
  openGraph: {
    title: "Contact — krlz.dev",
    description:
      "Get in touch with Carlos — open to new opportunities and interesting conversations.",
  },
};

export default function ContactPage() {
  return (
    <div className="pt-24">
      <ContactSection />
    </div>
  );
}
