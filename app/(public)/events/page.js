"use client";
import EventCard from "@/components/EventCard";
import { Checkbox } from "@/components/ui/checkbox";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase/config";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader";

async function fetchEvents() {
  try {
    const eventCollection = collection(db, "events");
    const q = query(eventCollection);
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log("No matching documents.");
      throw new Error("No events found in the database");
    }

    // Convert date strings to JavaScript Date objects for sorting
    const events = querySnapshot.docs.map((doc) => {
      const eventData = doc.data();
      // Assuming your date field is named 'date'
      const dateParts = eventData.date.split("-");
      eventData.dateObject = new Date(
        dateParts[2], // Year
        dateParts[1] - 1, // Month (subtract 1 because months are 0-indexed in JavaScript)
        dateParts[0] // Day
      );
      return { ...eventData, id: doc.id };
    });

    // Sort events by date in ascending order
    const sortedEvents = events.sort(
      (a, b) => a.dateObject.getTime() - b.dateObject.getTime()
    );

    console.log(sortedEvents);

    return sortedEvents;
  } catch (error) {
    console.error("Error getting events:", error);
    throw new Error("Error getting events");
  }
}

function EventsPage() {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [showLiveEvents, setShowLiveEvents] = useState(true);
  const [showPastEvents, setShowPastEvents] = useState(false);

  useEffect(() => {
    fetchEvents()
      .then((data) => {
        setEvents(data);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
        // Handle error toasts here, if needed
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Filter events based on checkbox states
  const filteredEvents = events.filter((event) => {
    const today = new Date();
    return (
      (showLiveEvents && event.dateObject >= today) ||
      (showPastEvents && event.dateObject < today)
    );
  });

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

            <div className="flex gap-8 flex-wrap">
              <div className="flex items-center space-x-2 mt-4">
                <Checkbox
                  id="live-events"
                  checked={showLiveEvents}
                  onCheckedChange={() => setShowLiveEvents(!showLiveEvents)}
                />
                <label
                  htmlFor="live-events"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Upcoming Events
                </label>
              </div>

              <div className="flex items-center space-x-2 mt-4">
                <Checkbox
                  id="past-events"
                  checked={showPastEvents}
                  onCheckedChange={() => setShowPastEvents(!showPastEvents)}
                />
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
              filteredEvents.length === 0 && (
                <p className="mt-4">
                  We currently don't have any matching events. 💖
                </p>
              )
            )}
            {filteredEvents.map((event) => (
              <div key={event.timestamp}>
                <EventCard data={event} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default EventsPage;
