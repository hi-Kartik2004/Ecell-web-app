import { ModeToggle } from "@/components/ThemeToggleBtn";
import { Navbar } from "@/components/Navbar";
import HeroSection from "./(sections)/HeroSection";
import FeaturedSection from "./(sections)/FeaturedSection";
import AboutSection from "./(sections)/AboutSection";

export default function Home() {
  return (
    <main className="">
      <HeroSection />
      <FeaturedSection />
      <AboutSection />
    </main>
  );
}
