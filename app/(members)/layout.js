import { Button } from "@/components/ui/button";
import { currentUser } from "@clerk/nextjs";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import React from "react";
import { BsFillSignStopFill } from "react-icons/bs";
var axios = require("axios");

async function layout({ children }) {
  const user = await currentUser();
  let isMember = false;

  async function checkMembership() {
    const email = user.emailAddresses[0].emailAddress;
    // const resp = await fetch("/api/checkAdmin", {});
    // const data = await resp.json();
    // const link = "http://localhost:5001/subscribers/" + email;
    // const response = await fetch(link);
    // const data = await response.json();
    // console.log(data);
    // console.log("working");
    // if (data.email == email) {
    //   return true;
    // }
    // else return false;

    var data = JSON.stringify({
      collection: "subscribers",
      database: "subscribers",
      dataSource: "Cluster0",
      filter: {
        // "email": "vanshayush@gmail.com",
        email: email,
      },
    });

    var config = {
      method: "post",
      url: "https://ap-south-1.aws.data.mongodb-api.com/app/data-wtzjz/endpoint/data/v1/action/findOne",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Request-Headers": "*",
        "api-key":
          "8xyZSAUDmD1HMh3E3gjGhijlKitYPmnw8i4yTtY8QmMXelkyRCsQrrkp8FwkuBNM",
      },
      data: data,
    };

    return axios(config)
      .then(function (response) {
        const checkData = response.data;
        // console.log("checkdata " + checkData);
        if (checkData.document == null) {
          // console.log("working");
          return false;
        } else {
          // console.log("working");
          // console.log(checkData.document.admin);
          return true;
        }
        // console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  isMember = await checkMembership();

  return (
    <div>
      {!isMember && (
        <div>
          <div className="text-center h-[45vh] mt-20 mb-12 gap-4 flex flex-col justify-center items-center">
            <BsFillSignStopFill size={50} />
            <div className="p-2 rounded-md border max-w-[400px]">
              <p className="text-center">
                You are not allowed to access this page, because you don't have
                Membership, please contact E-cell UVCE if you think this is a
                mistake.
              </p>
            </div>
            <div>
              <Button variant="secondary">
                <Link href="/join">Take our membership &rarr;</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
      {isMember && { children }}
    </div>
  );
}

export default layout;
