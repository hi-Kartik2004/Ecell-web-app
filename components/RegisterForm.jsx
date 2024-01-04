// Import necessary libraries and components
"use client";
import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import * as z from "zod";
import { BsCheck2Circle, BsFillSignStopFill } from "react-icons/bs";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { db } from "@/firebase/config";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { useUser } from "@clerk/nextjs";
import Loader from "./Loader";
import TeamMembersField from "./TeamMembersField";
import Link from "next/link";

// Form schema for validation
const formSchema = z.object({
  teamName: z.string().min(2, "Team Name must be at least 2 characters."),
  leaderName: z.string().min(2, "Leader Name must be at least 2 characters."),
  leaderYear: z.coerce
    .number()
    .min(1, "Leader Year must be at least 1.")
    .max(5, "Leader Year must be at most 5."),
  leaderBranch: z
    .string()
    .min(2, "Leader Branch must be at least 2 characters."),
  leaderEmail: z.string().email("Invalid Email."),
  leaderPhone: z.coerce.number().min(1000000000, "Invalid Phone Number."),
  comments: z.optional(z.string()),
  teamMembers: z.array(
    z.object({
      memberName: z
        .string()
        .min(2, "Member Name must be at least 2 characters."),
      memberYear: z.coerce
        .number()
        .min(1, "Member Year must be at least 1.")
        .max(5, "Member Year must be at most 5."),
      memberBranch: z
        .string()
        .min(2, "Member Branch must be at least 2 characters."),
      memberEmail: z.string().email("Invalid Email."),
      memberPhone: z.coerce.number().min(1000000000, "Invalid Phone Number."),
    })
  ),
});

// Main component for the form
export default function EventForm({ data }) {
  const { isLoaded, user } = useUser();
  if (!isLoaded) {
    return (
      <div className="mt-24">
        <Loader />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center h-[45vh] mt-20 mb-12 gap-4 flex flex-col justify-center items-center">
        <BsFillSignStopFill size={50} />
        <div className="p-2 rounded-md border">
          <p className="text-center">
            Please Sign in to register for the event.
          </p>
        </div>
        <div>
          <Button variant="secondary">
            <Link href="/sign-in">Sign in</Link>
          </Button>
        </div>
      </div>
    );
  }

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [teamSize, setTeamSize] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function isUserRegistered(eventId, userEmail) {
      const registrationsRef = collection(db, "registrations");

      // Check if the user's email is in leaderEmail or memberEmail
      const q = query(
        registrationsRef,
        where("eventId", "==", eventId),
        where("leaderEmail", "==", userEmail)
      );

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // User found in leaderEmail, no need to check further
        return true;
      }

      // If not found in leaderEmail, check memberEmail
      const qForMember = query(
        registrationsRef,
        where("eventId", "==", eventId),
        where("teamMembers", "array-contains", { memberEmail: userEmail })
      );

      const memberQuerySnapshot = await getDocs(qForMember);

      return !memberQuerySnapshot.empty;
    }

    async function checkUserRegistration() {
      const eventId = data.id;
      const userEmail = user?.emailAddresses?.[0]?.emailAddress || "";
      const isRegistered = await isUserRegistered(eventId, userEmail);
      if (isRegistered) {
        setSubmitted(true);
        setLoading(false);
      } else {
        setSubmitted(false);
        setLoading(false);
      }
    }

    checkUserRegistration();
  }, []);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      teamName: "",
      leaderName: "",
      leaderYear: "",
      leaderBranch: "",
      leaderPhone: user?.phoneNumbers?.[0]?.phoneNumber || "",
      leaderEmail: user?.emailAddresses?.[0]?.emailAddress || "",
      comments: "",
      teamMembers: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "teamMembers",
  });

  // Function to handle Firestore operation
  async function addMessageToFirestore({ formData }) {
    try {
      const docData = {
        ...formData,
        timestamp: Date.now(),
        eventId: data.id,
        eventName: data.name,
      };

      const collectionRef = collection(db, "registrations");
      await addDoc(collectionRef, docData);

      return true;
    } catch (error) {
      console.error("Error in Firestore operation:", error);
      return false;
    }
  }

  // Function to handle form submission
  async function onSubmit(values) {
    setSubmitting(true);

    try {
      const isDocAdded = await addMessageToFirestore({ formData: values });

      if (isDocAdded) {
        setSubmitted(true);
        // reset the form after successful submission
        form.reset();
      } else {
        setSubmitted(false);
      }
    } catch (error) {
      console.error(error);
      setSubmitted(false);
    } finally {
      setSubmitting(false);
    }
  }

  const removeMember = (index) => () => {
    remove(index);
    setTeamSize(teamSize - 1);
  };

  // Function to dynamically add more team members
  function renderMemberDetails() {
    if (teamSize < data.teamSize) {
      setTeamSize(teamSize + 1);
      append({
        memberName: "",
        memberYear: "",
        memberBranch: "",
        memberEmail: "",
        memberPhone: "",
      });
    }
  }

  if (loading) {
    return (
      <div className="mt-24">
        <Loader />
      </div>
    );
  }

  // Render UI based on form state
  if (submitted) {
    return (
      <div className="text-center h-[45vh] mt-20 mb-12 gap-4 flex flex-col justify-center items-center">
        <BsCheck2Circle size={50} />
        <div className="p-2 rounded-md border">
          <p className="text-center">
            Thanks for filling the form. You have successfully registered for
            the event.
          </p>
        </div>
        <div>
          <Button variant="secondary">
            <Link href="/events">Register for another event</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Your existing form fields */}
        <FormField
          control={form.control}
          name="teamName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Team Name*</FormLabel>
              <FormControl>
                <Input placeholder="Your team Name" {...field} />
              </FormControl>
              <FormDescription>Keep it innovative and short.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="leaderName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Leader Name*</FormLabel>
              <FormControl>
                <Input placeholder="Your name" {...field} />
              </FormControl>
              <FormDescription>Keep it innovative and short.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="leaderYear"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Leader's Academic Year*</FormLabel>
              <FormControl>
                <Input placeholder="Your Year" {...field} />
              </FormControl>
              <FormDescription>
                Eg: 1 for first year, 2 for second ... 5 for M.tech
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="leaderBranch"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Leader's Branch*</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                The branch you are currently studying in.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="leaderEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Leader's Email*</FormLabel>
              <FormControl>
                <Input
                  className="bg-muted text-muted-foreground"
                  {...field}
                  readOnly={true}
                />
              </FormControl>
              <FormDescription>
                This would be your primary contact email.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="leaderPhone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Leader's Phone*</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                Your primary contact phone Number (without +91)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Render input fields for team members */}
        {fields.map((member, index) => (
          <div key={index}>
            <p
              className="underline underline-offset-4 cursor-pointer mb-4 text-primary"
              onClick={removeMember(index)}
            >
              - Remove member {index + 1}
            </p>
            <TeamMembersField member={member} index={index} remove={remove} />
          </div>
        ))}

        {/* Button to dynamically add more team members */}
        {data.teamSize > 1 && teamSize < data.teamSize && (
          <div
            className="mt-4 underline underline-offset-4 cursor-pointer"
            onClick={renderMemberDetails}
          >
            + Add member
          </div>
        )}

        {/* Your existing submit button */}
        <Button type="submit" disabled={submitting}>
          {submitting ? "Please wait..." : "Register"}
        </Button>
      </form>
    </Form>
  );
}
