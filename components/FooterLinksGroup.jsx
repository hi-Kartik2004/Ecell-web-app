import React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

function FooterLinksGroup({ group }) {
  return (
    <>
      <div className="flex flex-col items-center">
        <h3 className="text-lg mb-2 dark:text-primary font-medium text-muted-foreground">
          {group.title}
        </h3>
        <div className="mt-2 flex flex-col items-start gap-3">
          {group.links.map((link, index) => (
            <Link
              href={link.link}
              key={index}
              className="text-sm text-muted-foreground hover:text-black dark:hover:text-primary hover:underline underline-offset-4"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default FooterLinksGroup;
