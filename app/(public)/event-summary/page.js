"use client";
import React from "react";
import { useRouter } from "next/navigation";

function page() {
  const router = useRouter();
  router.push("/event-summaries");

  return <></>;
}

export default page;
