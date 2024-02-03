"use client";
import React from "react";
import { useRouter } from "next/navigation";

function page() {
  const router = useRouter();
  router.push("/articles");

  return <></>;
}

export default page;
