import React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

function FooterLinksGroup() {
  return (
    <>
      <div className="flex flex-col items-center">
        <h3 className="text-lg mb-2 text-primary">Lorem, ipsum dolor.</h3>
        <div className="mt-2 flex flex-col items-start gap-3">
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-primary hover:underline underline-offset-4"
          >
            Lorem, ipsum.
          </Link>
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-primary hover:underline underline-offset-4"
          >
            Lorem, ipsum.
          </Link>
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-primary hover:underline underline-offset-4"
          >
            Lorem, ipsum.
          </Link>
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-primary hover:underline underline-offset-4"
          >
            Lorem, ipsum.
          </Link>
        </div>
      </div>
    </>
  );
}

export default FooterLinksGroup;
