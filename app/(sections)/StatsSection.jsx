import React from "react";
import data from "../data";

function StatsSection() {
  return (
    <div className="container flex flex-wrap justify-center md:justify-around gap-10 my-10">
      {data.stats.map((stat) => (
        <div className="flex flex-col items-center" key={stat.title}>
          <h2 className="text-4xl font-bold">{stat.count}+</h2>
          <p className="text-muted-foreground text-sm">{stat.title}</p>
        </div>
      ))}
    </div>
  );
}

export default StatsSection;
