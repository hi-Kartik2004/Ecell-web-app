"use client";
import EventCard from "@/components/EventCard";
import { Checkbox } from "@/components/ui/checkbox";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase/config";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader";
import data from "@/app/data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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

      eventData.dateObject.setHours(23, 59, 59, 999);
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
  const [eventNameFilter, setEventNameFilter] = useState("");
  const [visibleEvents, setVisibleEvents] = useState(6);

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

  // Filter events based on checkbox states and event name filter
  const filteredEvents = events.filter((event) => {
    const today = new Date();
    const isLiveEvent = showLiveEvents && event.dateObject >= today;
    const isPastEvent = showPastEvents && event.dateObject < today;
    const matchesName = event.name
      .toLowerCase()
      .includes(eventNameFilter.toLowerCase());

    return (isLiveEvent || isPastEvent) && matchesName;
  });

  // Slice events based on visibleEvents
  const slicedEvents = filteredEvents.slice(0, visibleEvents);

  // Load more events when the button is clicked
  const handleLoadMore = () => {
    setVisibleEvents((prevVisibleEvents) => prevVisibleEvents + 6);
  };

  return (
    <>
      <section className="flex justify-center dark:bg-[url('/texture-pattern.svg')] bg-[url('/texture-pattern-light.svg')] min-h-[100vh]">
        <div className="container mt-24 pb-12">
          <div className="flex justify-center flex-col items-center">
            <h1 className="text-4xl text-center font-bold">
              {data?.eventPageTitle} ({loading ? "_" : events.length})
            </h1>
            <p className="text-muted-fo1round text-center mt-2">
              {data?.eventPageDescription}
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

            {/* Add input field for event name filter */}
            <div className="max-w-[400px]">
              <Input
                type="text"
                placeholder="Filter by Event Name"
                value={eventNameFilter}
                onChange={(e) => setEventNameFilter(e.target.value)}
                className="mt-4"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-8 justify-around mt-10">
            {loading ? (
              <Loader />
            ) : (
              slicedEvents.length === 0 && (
                <p className="mt-4">
                  We currently don't have any matching events. 💖
                </p>
              )
            )}
            {slicedEvents.map((event) => (
              <div key={event.timestamp}>
                <EventCard data={event} />
              </div>
            ))}
          </div>

          {visibleEvents < filteredEvents.length && (
            <div className="flex justify-center mt-6">
              <Button onClick={handleLoadMore} variant="secondary">
                Load More Events &#10227;
              </Button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default EventsPage;
