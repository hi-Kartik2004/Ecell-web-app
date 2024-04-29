"use server";
import { db } from "@/firebase/config";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();

  const webhookEmail = body?.Data["Attendee Details"]["Email Address"];

  console.log(webhookEmail);
  let eventId = null;

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
        return NextResponse.json({
          message: "No matching data found",
          status: 404,
        });
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
          return NextResponse.redirect(
            body?.Data["Attendee Details"]["Ticket URL"]
          );
        } catch (err) {
          console.error(err);
          return NextResponse.json({
            message: "Error adding data",
            status: 500,
          });
        }
      }
    } catch (err) {
      console.error(err);
      return NextResponse.json({ message: "Error fetching data", status: 500 });
    }
  }

  const result = await addRegistrations();
  return result;
}
