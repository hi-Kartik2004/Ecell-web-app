import React from "react";
import { motion } from "framer-motion";
import EventsPlayground from "@/components/EventsPlayground";

function PopularEvents() {
  return (
    <section>
      <div className="container py-10">
        <div>
          <h2 className="text-center text-2xl font-bold">Events Playground</h2>
          <p className="text-center text-sm text-muted-foreground mt-1">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magni quos
            hic officia.
          </p>
        </div>

        <EventsPlayground />
      </div>
    </section>
  );
}

export default PopularEvents;
