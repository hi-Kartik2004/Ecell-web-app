import FeatureCardWithImg from "@/components/FeatureCardWithImg";
import GlassCard from "@/components/GlassCard";
import React from "react";
import data from "../data";

function RecentBlogs() {
  return (
    <div className="w-full lg:py-16 py-10 container">
      <div>
        <h2 className="lg:text-4xl text-2xl font-bold text-center">
          {data.memoriesTitle}
        </h2>
        <p className="text-center mt-2 text-muted-foreground">
          {data?.memoriesDescription}
        </p>
      </div>

      <div className="flex flex-wrap justify-around gap-2 items-center mt-2 lg:mt-6 mb-8">
        {data?.memoriesCards?.length &&
          data?.memoriesCards?.map((card, index) =>
            index % 3 === 0 ? (
              <GlassCard
                key={index}
                className={"top-4 lg:right-2"}
                data={card}
                img={`${card.image}`}
              />
            ) : index % 3 == 1 ? (
              <GlassCard
                key={index}
                className={"-bottom-6 right-2 lg:left-[50%]"}
                data={card}
                img={`${card.image}`}
              />
            ) : (
              <GlassCard
                key={index}
                className={"lg:top-4 lg:right-0 -bottom-6 left-2"}
                data={card}
                img={`${card.image}`}
              />
            )
          )}
      </div>
    </div>
  );
}

export default RecentBlogs;
