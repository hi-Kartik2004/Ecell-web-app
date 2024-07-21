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
import { currentUser } from "@clerk/nextjs";
var axios = require("axios");

export default async function Home() {
  const user = await currentUser();
  async function checkAdmin() {
    if (!user) {
      return { isMember: false, isAdmin: false };
    }

    const email = user.emailAddresses[0].emailAddress;

    var data = JSON.stringify({
      collection: "subscribers",
      database: "subscribers",
      dataSource: "Cluster0",
      filter: {
        email: email,
      },
    });

    var config = {
      method: "post",
      url: "https://ap-south-1.aws.data.mongodb-api.com/app/data-wtzjz/endpoint/data/v1/action/findOne",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Request-Headers": "*",
        "api-key":
          "8xyZSAUDmD1HMh3E3gjGhijlKitYPmnw8i4yTtY8QmMXelkyRCsQrrkp8FwkuBNM",
      },
      data: data,
    };

    return axios(config)
      .then(function (response) {
        const checkData = response.data;
        // console.log("checkdata " + checkData);
        if (checkData.document == null) {
          // console.log("working");
          return { isMember: false, isAdmin: false };
        } else {
          // console.log("working");
          // console.log(checkData.document.admin);
          return { isMember: true, isAdmin: checkData.document.admin };
        }
        // console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.error(error);
      });

    // console.log(check);
  }

  const details = await checkAdmin();

  return (
    <main className="flex justify-center flex-col w-full">
      <p className=" hidden">
        E-Cell UVCE Dream. Dare. Do. Empowering students with the knowledge and
        skills to become successful entrepreneurs. Dare to dream big and do
        great things with E-Cell UVCE.
      </p>
      <div className="w-full">
        <div className="w-full">
          <NewHeroSection isMember={details.isMember} />
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
      </div>
    </main>
  );
}
