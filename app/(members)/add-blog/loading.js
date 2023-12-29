"use client";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

function loading() {
  return (
    <div className="mt-20 container">
      <Skeleton className="w-full h-[100px] rounded-lg" />
      <Skeleton className="w-full h-[100vh] rounded-lg mt-4" />
    </div>
  );
}

export default loading;
