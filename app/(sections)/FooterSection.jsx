import Foot from "@/components/Foot";
import FooterLinksGroup from "@/components/FooterLinksGroup";
import LegalStuff from "@/components/LegalStuff";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import React from "react";

function FooterSection() {
  return (
    <footer className="">
      <div className="flex items-center flex-col gap-6 py-6 pb-10">
        <h2 className="text-xl text-center text-muted-foreground font-bold">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam nam
          magni dolorem.
        </h2>

        <Button size={"lg"}>Join the Community &rarr;</Button>
      </div>

      <Separator />

      <div className="p-8 flex flex-col gap-4">
        <FooterLinksGroup />
        <Separator />
        <FooterLinksGroup />
        <Separator />
        <FooterLinksGroup />
        <Separator />
      </div>

      <div>
        <LegalStuff />
      </div>

      <Foot />
    </footer>
  );
}

export default FooterSection;
