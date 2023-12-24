import EventCard from "@/components/EventCard";
import FeatureCardWithImg from "@/components/FeatureCardWithImg";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/components/ui/use-toast";
import { collection, getDocs, query } from "firebase/firestore";
import React from "react";

function page() {
  let events = [];
  async function getEventsFromFirestore() {
    try {
      const eventCollection = collection(db, "events");

      const q = query(eventCollection);
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.log("No matching documents.");
        toast({
          title: "No Events Found",
          description: "No events found in the database",
        });
        return;
      }

      const eventDoc = querySnapshot.docs[0];
      const eventData = eventDoc.data();
      events = eventData;
      const eventCode = eventData.eventCode;
      console.log("Event Code:", eventCode);
      toast({
        title: "Data Fetched",
        description: "Our APIs are working fine!",
      });
      //   events = eventCode;
    } catch (error) {
      console.error("Error getting blog:", error);
      toast({
        title: "Something went wrong",
        description: "Head over to our github to know more",
      });
    }
  }

  getEventsFromFirestore();

  return (
    <section className="flex justify-center">
      <Toaster />
      <div className="container mt-24 pb-12">
        <div className="flex justify-center flex-col items-center">
          <h1 className="text-4xl text-center font-bold">Events</h1>
          <p className="text-muted-foreground text-center mt-2">
            lorem ipsum dor sit ipem lorem ipsum dor sit ipem
          </p>
          <div className="flex gap-6 md:gap-10 flex-wrap justify-around items-center">
            <div className="flex items-center space-x-2 mt-4">
              <Checkbox id="live-events" />
              <label
                htmlFor="live-events"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Upcoming Events
              </label>
            </div>

            <div className="flex items-center space-x-2 mt-4">
              <Checkbox id="past-events" />
              <label
                htmlFor="past-events"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Past Events
              </label>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-8 justify-around mt-10">
          <EventCard />
          <EventCard />
          <EventCard />
        </div>
      </div>
    </section>
  );
}

export default page;
