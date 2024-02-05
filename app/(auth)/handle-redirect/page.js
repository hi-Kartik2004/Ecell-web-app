"use client";
import Loader from "@/components/Loader";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React from "react";

function HandleRedirect() {
  const params = useSearchParams();
  const redirectUrl = params.get("redirect");
  const router = useRouter();
  router.push(redirectUrl);
  return (
    <div className="container min-h-[60vh] flex items-center justify-center">
      <Loader />
    </div>
  );
}

export default HandleRedirect;
