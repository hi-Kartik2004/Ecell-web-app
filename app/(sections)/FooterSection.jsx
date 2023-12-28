import Foot from "@/components/Foot";
import FooterLinksGroup from "@/components/FooterLinksGroup";
import LegalStuff from "@/components/LegalStuff";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import React from "react";
import data from "../data";

function FooterSection() {
  return (
    <footer className="">
      <div className="flex items-center flex-col gap-6 py-6 px-2 pb-10">
        <h2 className="text-xl text-center text-muted-foreground font-bold">
          {data?.footerMessage}
        </h2>

        <Button size={"lg"}>
          <Link href={`${data?.footerYellowBtnLink}`}>
            {data?.footerYellowBtnMessage} &rarr;
          </Link>
        </Button>
      </div>

      <Separator />

      <div className="p-8 flex flex-wrap justify-around container gap-6">
        {data.footerLinks.map((group, index) => (
          <FooterLinksGroup key={index} group={group} />
        ))}

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
