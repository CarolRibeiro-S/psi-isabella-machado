import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import ArticlesPreview from "@/components/ArticlesPreview";
import ContactSection from "@/components/ContactSection";

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <About />
      <Services />
      <ArticlesPreview />
      <ContactSection />
    </main>
  );
}
