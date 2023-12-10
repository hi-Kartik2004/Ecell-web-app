"use client";
import MouseScroll from "@/components/MouseScroll";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaPause,
  FaPlay,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

function HeroSection() {
  const videoRef = useRef(null);
  const [VideoPlaying, setVideoPlaying] = useState(true);

  // Function to pause the video
  const pauseVideo = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  function handlePlayPauseIcon() {
    setVideoPlaying(!VideoPlaying);
  }

  return (
    <div className="mt-16 h-[95vh] relative flex justify-center">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        className="w-full h-full object-cover"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="absolute top-0 left-0 w-full h-full dark:bg-black bg-white opacity-80"></div>

      <div className="container py-8 absolute top-0 min-h-[92vh]">
        <h1 className="text-3xl font-bold">{sectionData?.heroTitle}</h1>
        <p className=" text-muted-foreground mt-4">
          {sectionData?.heroSubtitle}
        </p>

        <div className="absolute left-4 bottom-6 flex flex-col gap-4 items-center">
          <Link href={`${sectionData.facebookLink}`} target="_blank">
            <FaFacebook className="text-xl hover:text-primary" />
          </Link>

          <Link href={`${sectionData.instagramLink}`} target="_blank">
            <FaInstagram className="text-xl hover:text-primary " />
          </Link>

          <Link href={`${sectionData.linkedinLink}`} target="_blank">
            <FaLinkedin className="text-xl hover:text-primary  " />
          </Link>

          <Link href={`${sectionData.twitterLink}`} target="_blank">
            <FaXTwitter className="text-xl hover:text-primary " />
          </Link>

          <div className="w-[2px] h-7 rounded bg-muted-foreground"></div>
        </div>

        <div className="flex flex-wrap gap-4 items-center my-6">
          <Button className="border">
            <Link href={`${sectionData?.heroButtonLink}`}>
              {sectionData?.heroButtonName}
            </Link>
          </Button>

          <Button variant="secondary" className="border">
            <Link href={`${sectionData?.heroSecondaryButtonLink}`}>
              {sectionData?.heroSecondaryButtonName}
            </Link>
          </Button>
        </div>

        <div className="flex justify-center items-center w-full mt-6 flex-col">
          <Image src="/ecell-no-bg.png" alt="logo" width={250} height={250} />
          <h3 className="text-xl font-semibold">{sectionData?.clubName}</h3>
          <p className="text-center text-sm mt-2">
            University of Visvesvaraya <br /> College of Engineering
          </p>
        </div>

        <button
          onClick={() => {
            pauseVideo();
            handlePlayPauseIcon();
          }}
          className="absolute right-4 bottom-6"
        >
          {VideoPlaying ? <FaPause /> : <FaPlay />}
        </button>
        {/* <MouseScroll scrollToId={"about"} /> */}
      </div>
    </div>
  );
}

const sectionData = {
  clubName: "E-Cell UVCE",
  heroTitle:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad cupiditate maxime tempora.",
  heroSubtitle:
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similiqu mollitia, harum eum vel iste tempore placeat.",
  socials: [],
  heroButtonName: "Register For Events",
  heroButtonLink: "/",
  heroSecondaryButtonName: "Explore More",
  heroSecondaryButtonLink: "/",
  facebookLink: "/",
  instagramLink: "/",
  linkedinLink: "/",
  twitterLink: "/",
};

export default HeroSection;
