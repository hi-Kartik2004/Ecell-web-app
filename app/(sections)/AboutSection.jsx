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
      <div className="container py-10 pb-24 relative overflow-hidden ">
        <h1 className="text-2xl text-center font-semibold">
          Lorem ipsum dolor sit amet,{" "}
          <span className="text-primary">consectetur</span> adipisicing elit.
          Recusandae nam non delectus.
        </h1>

        <GlassCard className="right-2 -top-4" />
        <GlassCard className="-bottom-6 left-2" />
      </div>
    </section>
  );
}

export default AboutSection;
