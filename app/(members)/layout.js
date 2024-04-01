import { Button } from "@/components/ui/button";
import { db } from "@/firebase/config";
import { currentUser } from "@clerk/nextjs";
import { collection, getDocs, query, where } from "firebase/firestore";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import React from "react";
import { BsFillSignStopFill } from "react-icons/bs";
var axios = require("axios");

async function layout({ children }) {
  function isTimestampWithinOneYear(timestamp) {
    // Convert the provided timestamp to milliseconds
    const milliseconds = timestamp.seconds * 1000 + timestamp.nanoseconds / 1e6;

    // Create a Date object from the milliseconds
    const providedDate = new Date(milliseconds);

    // Calculate date one year ago from today
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

    // Compare provided timestamp with date one year ago
    return providedDate > oneYearAgo;
  }

  const user = await currentUser();
  let isMember = false;

  async function checkMembership() {
    const email = user?.emailAddresses[0]?.emailAddress || null;
    if (!email) return false;

    const membersRef = collection(db, "members");
    const querySnapshot = await getDocs(
      query(membersRef, where("email", "==", email))
    );

    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

    for (const doc of querySnapshot.docs) {
      const data = {
        ...doc.data(),
      };
      if (data && data?.isAdmin == true) {
        return true;
      }
      if (
        data &&
        data.isMember === true &&
        isTimestampWithinOneYear(data.timestamp)
      ) {
        console.log(data);
        return true; // If member found, return true
      }
    }

    return false; // If no member found, return false

    // var data = JSON.stringify({
    //   collection: "subscribers",
    //   database: "subscribers",
    //   dataSource: "Cluster0",
    //   filter: {
    //     // "email": "vanshayush@gmail.com",
    //     email: email,
    //   },
    // });

    // var config = {
    //   method: "post",
    //   url: "https://ap-south-1.aws.data.mongodb-api.com/app/data-wtzjz/endpoint/data/v1/action/findOne",
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Access-Control-Request-Headers": "*",
    //     "api-key":
    //       "8xyZSAUDmD1HMh3E3gjGhijlKitYPmnw8i4yTtY8QmMXelkyRCsQrrkp8FwkuBNM",
    //   },
    //   data: data,
    // };

    // return axios(config)
    //   .then(function (response) {
    //     const checkData = response.data;
    //     // console.log("checkdata " + checkData);
    //     if (checkData.document == null) {
    //       // console.log("working");
    //       return false;
    //     } else {
    //       if (checkData.document.timestamp < Date.now()) {
    //         return false;
    //       }
    //       // console.log("working");
    //       // console.log(checkData.document.admin);
    //       return true;
    //     }
    //     // console.log(JSON.stringify(response.data));
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
  }

  isMember = await checkMembership();

  if (!isMember) {
    return (
      <div>
        <div className="text-center h-[45vh] mt-20 mb-12 gap-4 flex flex-col justify-center items-center">
          <BsFillSignStopFill size={50} />
          <div className="p-2 rounded-md border max-w-[400px]">
            <p className="text-center">
              You are not allowed to access this page, because you either don't
              have Membership or your membership expired, please contact E-cell
              UVCE if you think this is a mistake.
            </p>
          </div>
          <div>
            <Button variant="secondary">
              <Link href="/join">Take our membership &rarr;</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return <div>{children}</div>;
}

export default layout;
