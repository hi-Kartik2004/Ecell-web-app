import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

function LegalStuff() {
  return (
    <div className="flex flex-col gap-4 items-center justify-center mb-4">
      <div className="flex gap-6 flex-wrap justify-center">
        <Button variant="link">
          <Link href="/" className="text-muted-foreground">
            Privary
          </Link>
        </Button>
        <Button variant="link">
          <Link href="/" className="text-muted-foreground">
            Privary
          </Link>
        </Button>
        <Button variant="link">
          <Link href="/" className="text-muted-foreground">
            Privary
          </Link>
        </Button>
        <Button variant="link">
          <Link href="/" className="text-muted-foreground">
            Privary
          </Link>
        </Button>
      </div>
      <div className="flex flex-col gap-2 items-center">
        <img src="/ecell-no-bg.png" alt="logo" className="max-w-[100px]" />
        <h2 className="text-xl font-bold">E-Cell UVCE</h2>
      </div>
    </div>
  );
}

export default LegalStuff;
