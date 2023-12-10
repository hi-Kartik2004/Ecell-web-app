import AppFeaturesCard from "@/components/AppFeaturesCard";
import Image from "next/image";
import React from "react";

function AppFeatures() {
  return (
    <section className="bg-primary text-gray-800">
      <div className="container flex flex-col items-center py-16">
        <div>
          <h1 className="text-2xl text-center font-bold">
            Lorem ipsum dolor sit.
          </h1>
          <p className="text-center text-sm mt-1">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia
            voluptates laudantium dolor.
          </p>
        </div>

        <div className="flex flex-col justify-center gap-4 mt-6">
          <AppFeaturesCard />
          <AppFeaturesCard />
          <AppFeaturesCard />
        </div>
      </div>
    </section>
  );
}

export default AppFeatures;
