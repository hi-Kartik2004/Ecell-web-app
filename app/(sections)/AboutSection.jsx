import React from "react";
import { BellRing, Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { AboutCard } from "@/components/AboutCard";
import GlassCard from "@/components/GlassCard";
import data from "../data";
import { motion } from "framer-motion";

function AboutSection() {
  return (
    <section>
      <div className="container lg:py-16 lg:pb-24 py-10 pb-24 relative overflow-hidden flex flex-col items-center ">
        <h1 className="lg:text-3xl text-2xl text-center font-semibold max-w-[800px]">
          {data.aboutSectionTitleLeft}{" "}
          <span className="text-primary">{data.aboutSectionTitleYellow}</span>{" "}
          {data.aboutSectionTitleRight}
        </h1>
        <div className="flex justify-around w-full lg:my-6 flex-wrap">
          {data.aboutSectionCards.map((card, index) =>
            index % 3 === 0 ? (
              <GlassCard className="right-2 top-4 lg:left-2" data={card} />
            ) : index % 3 === 1 ? (
              <GlassCard
                className="-bottom-6 left-2 lg:left-[50%]"
                data={card}
              />
            ) : (
              <GlassCard className="-bottom-6 right-2 lg:top-4" data={card} />
            )
          )}
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
