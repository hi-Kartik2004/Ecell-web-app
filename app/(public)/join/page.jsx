"use client";
import { SparklesSection } from "@/app/(sections)/SparklesSection";
import MembershipForm from "@/components/MembershipForm";
import EventForm from "@/components/RegisterForm";
import React from "react";

function Join() {
  return (
    <div className="w-full flex justify-center flex-col items-center pt-14 mt-14 bg-black">
      {/* <div className="max-w-[800px]">
        <h1 className="lg:text-4xl text-3xl font-bold text-center">
          Join the Ecell UVCE Community!
        </h1>

        <p className="text-muted-foreground mt-2 lg:mt-4 text-center">
          Take the E-cell UVCE membership to avail various benefits at almost No
          Cost!
        </p>
      </div> */}

      <div className="mt-0">
        <SparklesSection />

        <div className="max-w-[800px] -mt-24 lg:-mt-28" />
        <MembershipForm />
      </div>
    </div>
  );
}

export default Join;
