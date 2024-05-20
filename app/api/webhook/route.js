import { db } from "@/firebase/config";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { permanentRedirect, redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function GET(req) {
  // get query params
  const redirectUrl = req.query.get("redirectUrl");
  console.log(redirectUrl);
  // redirect(redirectUrl);
  return Response.json({
    redirectUrl: redirectUrl,
  });
  // redirect("/redirect-works");
}

export async function POST(req) {
  const body = await req.json();

  const webhookEmail = body?.Data["Attendee Details"]["Email Address"];

  let eventId = null;
  let redirectUrl = null;

  async function addRegistrations() {
    const ref = query(
      collection(db, "paymentQueue"),
      where("leaderEmail", "==", webhookEmail)
    );
    let data = [];

    try {
      const snapshot = await getDocs(ref);

      snapshot.forEach((doc) => {
        data.push(doc.data());
      });

      if (data.length === 0) {
        console.log("No data found");
        redirectUrl = "/registration-failed?reason=no-data-found-in-queue";
      } else {
        console.log(data);
        eventId = data[0].id;
        try {
          await addDoc(collection(db, "registrations"), {
            ...data[0],
            paymentId: body?.Data["Attendee Details"]["Ticket URL"],
            status: "paid",
            timestamp: Date.now(),
            eventId: data[0].id,
          });
          console.log("Added data to registrations collection");
          redirectUrl = body?.Data["Attendee Details"]["Ticket URL"];
        } catch (err) {
          console.error(err);
          redirectUrl = "/registration-failed?reason=firebase-error";
        }
      }
    } catch (err) {
      console.error(err);
      redirectUrl = "/registration-failed?reason=firebase-error";
    }
  }

  await addRegistrations();

  if (redirectUrl) {
    console.log(redirectUrl);
    redirect(
      "https://localhost:3001/api/handle-redirect?redirectUrl=" + redirectUrl
    );
  }
}
