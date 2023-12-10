import { ModeToggle } from "@/components/ThemeToggleBtn";
import { Navbar } from "@/components/Navbar";
import HeroSection from "./(sections)/HeroSection";
import FeaturedSection from "./(sections)/FeaturedSection";
import AboutSection from "./(sections)/AboutSection";
import NewHeroSection from "./(sections)/NewHeroSection";
import FeaturedSection2 from "./(sections)/FeaturedSection2";
import { SwiperTestimonals } from "@/components/SwiperTestimonials";
import TestimonialsSection from "./(sections)/TestimonialsSection";

export default function Home() {
  return (
    <main className="">
      {/* <HeroSection /> */}
      <div className="">
        <NewHeroSection />
      </div>
      <FeaturedSection2 />
      <AboutSection />
      <TestimonialsSection />
    </main>
  );
}
