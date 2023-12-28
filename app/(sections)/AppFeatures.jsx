import AppFeaturesCard from "@/components/AppFeaturesCard";
import Image from "next/image";
import React from "react";
import data from "../data";

function AppFeatures() {
  return (
    <section className="bg-primary text-gray-800 pb-10">
      <div className="container flex flex-col items-center py-16">
        <div>
          <h1 className="lg:text-4xl text-2xl text-center font-bold">
            {data?.featuresTitle}
          </h1>
          <p className="text-center lg:text-md text-sm lg:mt-4 mt-2">
            {data?.featuresDescription}
          </p>
        </div>

        <div className="flex flex-col justify-center gap-4 lg:gap-16 mt-6 lg:mt-10">
          {data.featuresCards.length &&
            data.featuresCards.map((card, index) => (
              <AppFeaturesCard
                key={index}
                data={card}
                reverse={index % 2 === 0 ? true : false}
              />
            ))}
        </div>
      </div>
    </section>
  );
}

export default AppFeatures;
