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

const notifications = [
  {
    title: "Your call has been confirmed.",
    description: "1 hour ago",
  },
  {
    title: "You have a new message!",
    description: "1 hour ago",
  },
  {
    title: "Your subscription is expiring soon!",
    description: "2 hours ago",
  },
];

function AboutSection() {
  return (
    <section>
      <div className="container lg:py-16 lg:pb-24 py-10 pb-24 relative overflow-hidden flex flex-col items-center ">
        <h1 className="lg:text-3xl text-2xl text-center font-semibold max-w-[800px]">
          Lorem ipsum dolor sit amet,{" "}
          <span className="text-primary">consectetur</span> adipisicing elit.
          Recusandae nam non delectus.
        </h1>
        <div className="flex justify-around w-full lg:my-6 flex-wrap">
          <GlassCard className="right-2 top-4 lg:left-2" />
          <GlassCard className="-bottom-6 left-2 lg:left-[50%]" />
          <GlassCard className="-bottom-6 right-2 lg:top-4" />
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
