import React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

function FooterLinksGroup() {
  return (
    <>
      <div className="flex flex-col items-center">
        <h3 className="text-lg font-semibold">Lorem, ipsum dolor.</h3>
        <div className="mt-2 flex flex-col items-start">
          <Button variant="link" className="p-0">
            <Link href="/" className="text-primary/70">
              Lorem, ipsum.
            </Link>
          </Button>
          <Button variant="link" className="p-0">
            <Link href="/" className="text-primary/70">
              Lorem, ipsum.
            </Link>
          </Button>
          <Button variant="link" className="p-0">
            <Link href="/" className="text-primary/70">
              Lorem, ipsum.
            </Link>
          </Button>
          <Button variant="link" className="p-0">
            <Link href="/" className="text-primary/70">
              Lorem, ipsum.
            </Link>
          </Button>
          <Button variant="link" className="p-0">
            <Link href="/" className="text-primary/70">
              Lorem, ipsum.
            </Link>
          </Button>
        </div>
      </div>

    </>
  );
}

export default FooterLinksGroup;
