"use client";
import { SparklesCore } from "@/components/Sparkles";
import React from "react";
import globalData from "@/app/data";

export function SparklesSection() {
  return (
    <div className="w-full  flex flex-col items-center justify-center overflow-hidden rounded-md">
      <h1 className="md:text-8xl text-6xl lg:text-9xl font-bold text-center relative z-20 bg-gradient-to-tr from-yellow-500 to-orange-800 bg-clip-text text-transparent mx-2">
        {globalData?.joinPageHeading}
      </h1>
      <p className="text-center text-sm text-muted-foreground mt-2">
        {globalData?.joinPageDescription}
      </p>
      <div className="max-w-[800px] w-full relative">
        {/* Gradients */}
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-yellow-500 to-transparent h-[2px] w-3/4 blur-sm" />
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-yellow-500 to-transparent h-px w-3/4" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-orange-500 to-transparent h-[5px] w-1/4 blur-sm" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-orange-500 to-transparent h-px w-1/4" />

        {/* Core component */}
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={1200}
          className="w-full h-[80px] bg-black"
          particleColor="#FFFF00"
        />

        {/* Radial Gradient to prevent sharp edges */}
        <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
      </div>
    </div>
  );
}
