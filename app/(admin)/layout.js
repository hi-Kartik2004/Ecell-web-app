import { currentUser } from "@clerk/nextjs";
import { redirect, useRouter } from "next/navigation";
import React from "react";
var axios = require('axios');

async function layout({ children }) {
  const user = await currentUser();
  let isAdmin = false;

  async function checkAdmin() {
    const email = user.emailAddresses[0].emailAddress;
    // const resp = await fetch("/api/checkAdmin", {});
    // const data = await resp.json();
    // const link = "http://localhost:5001/subscribers/" + email;
    // const response = await fetch(link);
    // const data = await response.json();
    // console.log(data);
    // console.log("working");
    // if (data.admin == true) {
    //   return true;
    // }
    // else return false;

    var data = JSON.stringify({
      "collection": "subscribers",
      "database": "subscribers",
      "dataSource": "Cluster0",
      "projection": {
        "email": 1,
        "admin": 1
      }
    });

    var config = {
      method: 'post',
      url: 'https://ap-south-1.aws.data.mongodb-api.com/app/data-wtzjz/endpoint/data/v1/action/findOne',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Request-Headers': '*',
        'api-key': '8xyZSAUDmD1HMh3E3gjGhijlKitYPmnw8i4yTtY8QmMXelkyRCsQrrkp8FwkuBNM',
      },
      data: data
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });


    return data.admin;
  }

  isAdmin = await checkAdmin();

  if (!isAdmin) {
    redirect("/");
  }

  return <div>{children}</div>;
}

export default layout;
