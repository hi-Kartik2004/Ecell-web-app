"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { MoonIcon, SunIcon } from "@radix-ui/react-icons";

export function ModeToggle() {
  const { setTheme } = useTheme();
  const [showMoon, setShowMoon] = React.useState(false);

  return (
    <>
      {showMoon ? (
        <Button
          variant="muted"
          className="border"
          onClick={() => {
            setTheme("dark");
            setShowMoon(!showMoon);
          }}
        >
          <MoonIcon className="w-5 h-5" />
        </Button>
      ) : (
        <Button
          variant="muted"
          className="border"
          onClick={() => {
            setTheme("light");
            setShowMoon(!showMoon);
          }}
        >
          <SunIcon className="w-5 h-5" />
        </Button>
      )}
    </>
  );
}
