import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import data from "./../app/data";

function LegalStuff() {
  return (
    <div className="flex flex-col gap-4 items-center justify-center mb-4">
      <div className="flex gap-6 flex-wrap justify-center">
        {data.footerPrivacyLinks.map((group, index) => (
          <Button variant="link">
            <Link href={group.link} className="text-muted-foreground">
              {group.name}
            </Link>
          </Button>
        ))}
      </div>
      <div className="flex flex-col gap-2 items-center">
        <img src="/ecell-no-bg.png" alt="logo" className="max-w-[100px]" />
        <h2 className="text-xl font-bold">{data.clubName}</h2>
      </div>
    </div>
  );
}

export default LegalStuff;
