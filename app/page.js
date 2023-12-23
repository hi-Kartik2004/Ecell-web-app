import { ModeToggle } from "@/components/ThemeToggleBtn";
import { Navbar } from "@/components/Navbar";
import HeroSection from "./(sections)/HeroSection";
import FeaturedSection from "./(sections)/FeaturedSection";
import AboutSection from "./(sections)/AboutSection";
import NewHeroSection from "./(sections)/NewHeroSection";
import FeaturedSection2 from "./(sections)/FeaturedSection2";
import { SwiperTestimonals } from "@/components/SwiperTestimonials";
import TestimonialsSection from "./(sections)/TestimonialsSection";
import { Separator } from "@/components/ui/separator";
import AppFeatures from "./(sections)/AppFeatures";
import PopularEvents from "./(sections)/PopularEvents";
import FooterSection from "@/app/(sections)/FooterSection";
import RecentBlogs from "./(sections)/RecentBlogs";
import StatsSection from "./(sections)/StatsSection";

export default function Home() {
  return (
    <main className="flex justify-center flex-col w-full">
      <div className="w-full">
        <div className="w-full">
          <NewHeroSection />
        </div>
        <FeaturedSection2 />
        <Separator />
        <AboutSection />
        <Separator />

        <AppFeatures />
        <RecentBlogs />
        {/* <Separator /> */}
        {/* <PopularEvents /> */}
        <Separator />
        <TestimonialsSection />
        <StatsSection />
        <FooterSection />
      </div>
    </main>
  );
}
