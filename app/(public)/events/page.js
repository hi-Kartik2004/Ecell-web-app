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
import { useUser } from "@clerk/nextjs";

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

async function fetchUserRegistrations() {
  try {
    const registrationCollection = collection(db, "registrations");
    const q = query(registrationCollection);
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log("No registrations.");
      return [];
    }

    // Extract relevant registration data without unnecessary operations
    const registrations = querySnapshot.docs.map((doc) => {
      const registrationData = doc.data();
      return { ...registrationData, id: doc.id };
    });

    console.log(registrations);

    return registrations;
  } catch (error) {
    console.error("Error getting registrations:", error);
    throw new Error("Error getting registrations");
  }
}

function EventsPage() {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [showLiveEvents, setShowLiveEvents] = useState(true);
  const [showPastEvents, setShowPastEvents] = useState(false);
  const [showMyEvents, setShowMyEvents] = useState(false); // Added state for My Events
  const [eventNameFilter, setEventNameFilter] = useState("");
  const [visibleEvents, setVisibleEvents] = useState(6);
  const [userRegistrations, setUserRegistrations] = useState([]); // Added state for user registrations

  const { isSignedIn, user } = useUser();
  const loggedEmail = user?.emailAddresses[0]?.emailAddress;

  useEffect(() => {
    const fetchUserRegistrationsData = async () => {
      console.log("Fetching user registrations for email:", loggedEmail);
      try {
        const registrationsData = await fetchUserRegistrations();
        isSignedIn && setUserRegistrations(registrationsData);

        console.log("Fetching events");
        const eventsData = await fetchEvents();
        setEvents(eventsData);
      } catch (error) {
        console.error("Error fetching user registrations or events:", error);
        // Handle error toasts here, if needed
      } finally {
        setLoading(false);
      }
    };

    fetchUserRegistrationsData();
  }, [loggedEmail, isSignedIn]);

  // Filter events based on checkbox states and event name filter
  const filteredEvents = events.filter((event) => {
    const today = new Date();
    const isLiveEvent = showLiveEvents && event.dateObject >= today;
    const isPastEvent = showPastEvents && event.dateObject < today;
    const matchesName = event.name
      .toLowerCase()
      .includes(eventNameFilter.toLowerCase());

    // Check if the event is registered by the user
    const isMyEvent =
      isSignedIn &&
      showMyEvents &&
      userRegistrations.some(
        (registration) =>
          registration.eventId === event.id &&
          (registration.leaderEmail === loggedEmail ||
            (registration.teamMembers &&
              registration.teamMembers.some(
                (member) => member.memberEmail === loggedEmail
              ))) // Check if the user is the leader or a team member
      );

    return (isLiveEvent || isPastEvent || isMyEvent) && matchesName;
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
            <p className="text-muted-foreground text-center mt-2">
              {data?.eventPageDescription}
            </p>

            <div className="flex space-x-8 flex-wrap items-center justify-center">
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

              {isSignedIn && (
                <div className="flex items-center space-x-2 mt-4">
                  <Checkbox
                    id="my-events"
                    checked={showMyEvents}
                    onCheckedChange={() => setShowMyEvents(!showMyEvents)}
                  />
                  <label
                    htmlFor="my-events"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    My Events
                  </label>
                </div>
              )}
            </div>

            {/* Add input field for event name filter */}
            <div className="max-w-[400px] mt-2">
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
              <div className="mt-8">
                <Loader />
              </div>
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
