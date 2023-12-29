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
    const link = "http://localhost:5001/subscribers/" + email;
    const response = await fetch(link);
    const data = await response.json();
    console.log(data);
    console.log("working");
    // if (data.admin == true) {
    //   return true;
    // }
    // else return false;
    return data.admin;
  }

  isAdmin = await checkAdmin();

  if (!isAdmin) {
    redirect("/");
  }

  return <div>{children}</div>;
}

export default layout;
