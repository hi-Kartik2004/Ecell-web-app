import { currentUser } from "@clerk/nextjs";
import { redirect, useRouter } from "next/navigation";
import React from "react";

async function layout({ children }) {
  const user = await currentUser();
  let isAdmin = false;

  async function checkAdmin() {
    const email = user.emailAddresses[0].emailAddress;
    // const resp = await fetch("/api/checkAdmin", {});
    // const data = await resp.json();

    return true;
  }

  isAdmin = await checkAdmin();

  if (!isAdmin) {
    redirect("/");
  }

  return <div>{children}</div>;
}

export default layout;
