"use client";
import EventCard from "@/components/EventCard";
import { Checkbox } from "@/components/ui/checkbox";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "@/firebase/config";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader";

async function fetchEvents() {
  try {
    const eventCollection = collection(db, "events");
    const q = query(eventCollection);
    const querySnapshot = await getDocs(q);
    const snapShotId = querySnapshot.id;

    if (querySnapshot.empty) {
      console.log("No matching documents.");
      throw new Error("No events found in the database");
    }

    const events = querySnapshot.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
    console.log(events);

    return events;
  } catch (error) {
    console.error("Error getting events:", error);
    throw new Error("Error getting events");
  }
}

function EventsPage() {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents()
      .then((data) => {
        setEvents(data);
        // Handle toasts here, if needed
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
        // Handle error toasts here, if needed
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <section className="flex justify-center dark:bg-[url('/texture-pattern.svg')] bg-[url('/texture-pattern-light.svg')] min-h-[100vh]">
        <div className="container mt-24 pb-12">
          <div className="flex justify-center flex-col items-center">
            <h1 className="text-4xl text-center font-bold">
              Events ({loading ? "_" : events.length})
            </h1>
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
            {loading ? (
              <Loader />
            ) : (
              events.length === 0 && (
                <p className="mt-4">
                  We currently dont have any planned events, we will be added em
                  soon! 💖
                </p>
              )
            )}
            {events.map((event) => (
              <div key={event.timestamp}>
                <EventCard data={event} />
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* <h1>Hello</h1> */}
    </>
  );
}

export default EventsPage;
