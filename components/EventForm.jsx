"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
// import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebase/config";

import { useState } from "react";
import { BsCheck2Circle } from "react-icons/bs";
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
import { collection, addDoc } from "firebase/firestore";
import { Calendar } from "./ui/calendar";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

function getFileExtension(fileName) {
  return fileName.split(".").pop().toLowerCase();
}

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters."),
  teamSize: z.number().min(1, "Team size must be at least 1."),
  date: z
    .string()
    .refine(
      (dateString) => {
        // Validate the date format (DD-MM-YYYY)
        const dateRegex = /^(0[1-9]|[1-2][0-9]|3[0-1])-(0[1-9]|1[0-2])-\d{4}$/;
        return dateRegex.test(dateString);
      },
      { message: "Please enter a date in DD-MM-YYYY format." }
    )
    .refine(
      (dateString) => {
        // Attempt to parse the string into a Date object
        const [day, month, year] = dateString.split("-").map(Number);
        const parsedDate = new Date(year, month - 1, day);

        // Check if the parsing was successful and the result is a valid Date object
        return !isNaN(parsedDate.getTime());
      },
      { message: "Please enter a valid date." }
    )
    .refine(
      (dateString) => {
        // Ensure the parsed date is not in the past (optional, adjust as needed)
        const [day, month, year] = dateString.split("-").map(Number);
        const parsedDate = new Date(year, month - 1, day);
        const currentDate = new Date();
        return parsedDate >= currentDate;
      },
      { message: "Please enter a future date." }
    ),
  venue: z.string().min(2, "Please enter a valid venue."),
  email: z.string().email("Please enter a valid contact email."),
  entryFees: z.number().min(0, "Please enter a valid entry fees."),
  image: z
    .unknown()
    .refine(
      (file) => {
        // Check if the file is nullable
        if (file === null || file === undefined) {
          return true;
        }

        // Check if the file is an instance of File
        if (!(file instanceof File)) {
          return false;
        }

        // Additional validation logic for the file types
        const allowedExtensions = ["png", "jpg", "jpeg", "mp4"];
        const fileExtension = getFileExtension(file.name);

        return allowedExtensions.includes(fileExtension);
      },
      {
        message:
          "Please upload a valid image file (png, jpg, jpeg) or video file (mp4).",
      }
    )
    .nullable(),
});

async function addMessageToFirestore({ formData }) {
  try {
    console.log("Before Firestore operation");

    // Extract the file from the form data
    const imageFile = formData.image;

    // Upload the file to Firebase Storage
    const storageRef = ref(storage, "images/" + imageFile.name);
    console.log("Before uploading to Storage");

    try {
      await uploadString(storageRef, imageFile);
      console.log("After uploading to Storage");
    } catch (uploadError) {
      console.error("Error uploading to Storage:", uploadError);
      throw uploadError; // rethrow the error to stop further execution
    }

    // Get the download URL of the uploaded file
    console.log("Before getting Download URL");

    let downloadURL;
    try {
      downloadURL = await getDownloadURL(storageRef);
      console.log("Download URL:", downloadURL);
    } catch (downloadError) {
      console.error("Error getting Download URL:", downloadError);
      throw downloadError; // rethrow the error to stop further execution
    }

    // Add the document to Firestore with the download URL
    console.log("Before Firestore document add");

    const docData = {
      ...formData,
      timestamp: Date.now(),
      image: downloadURL, // Store the download URL in Firestore
    };

    console.log("Firestore document data:", docData);

    const collectionRef = collection(db, "events");
    console.log("Firestore collection reference:", collectionRef);

    const docRef = await addDoc(collectionRef, docData);
    console.log("Document written with ID", docRef.id);

    console.log("After Firestore document add");

    return true;
  } catch (error) {
    console.error("Error in Firestore operation:", error);
    return false;
  }
}

export default function EventForm() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      description: "",
      link: "",
      venue: "",
      entryFees: 0,
      image: null,
    },
  });

  async function onSubmit(values) {
    setSubmitting(true);

    try {
      const isDocAdded = await addMessageToFirestore({ formData: values });
      isDocAdded ? setSubmitted(true) : setSubmitted(false);
    } catch (error) {
      console.error(error);
      setSubmitted(false);
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="text-center h-[45vh] mt-20 mb-12 gap-4 flex flex-col justify-center">
        <BsCheck2Circle size={50} />
        <div className="p-2 rounded-md border">
          <p className="text-start">
            Thanks for Filling the form the event should show up in some time.
            Refresh the page to add another event.
          </p>
        </div>
        <div>
          <Button
            variant="secondary"
            onClick={() => {
              form.reset();
              setSubmitted(false);
            }}
          >
            Add another event
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event Name*</FormLabel>
              <FormControl>
                <Input placeholder="Our Beautiful Event Name" {...field} />
              </FormControl>
              <FormDescription>Keep it innovative and short.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email*</FormLabel>
              <FormControl>
                <Input placeholder="Your Email" {...field} />
              </FormControl>
              <FormDescription>
                This would be the contact email for this event.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description*</FormLabel>
              <FormControl>
                <Textarea placeholder="..." {...field} />
              </FormControl>
              <FormDescription>
                This would be shown on the event card.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date*</FormLabel>
              <FormControl>
                <Input
                  placeholder="DD-MM-YYYY"
                  onChange={(e) => {
                    const inputDate = new Date(e.target.value);
                    const isValidDate = !isNaN(inputDate.getTime());
                    field.onChange(isValidDate ? inputDate : null);
                  }}
                  {...field}
                />
              </FormControl>
              <FormDescription>The date of the event!</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="entryFees"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Entry Fees*</FormLabel>
              <FormControl>
                <Input
                  placeholder="in INR"
                  type="number"
                  onChange={(e) => {
                    const value = parseFloat(e.target.value);
                    field.onChange(value);
                  }}
                />
              </FormControl>
              <FormDescription>
                The entry fees per person, 0 for free.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="teamSize"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Team size*</FormLabel>
              <FormControl>
                <Input
                  placeholder="3"
                  type="number"
                  onChange={(e) => {
                    const value = parseFloat(e.target.value);
                    field.onChange(value);
                  }}
                />
              </FormControl>
              <FormDescription>Enter the max-members in a team</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="venue"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Venue*</FormLabel>
              <FormControl>
                <Input placeholder="Senete Hall, UVCE" {...field} />
              </FormControl>
              <FormDescription>
                The venue if the event is offline, else online.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  onChange={(e) => {
                    // Ensure that there are files present in the event
                    if (e.target.files && e.target.files.length > 0) {
                      field.onChange(e.target.files[0]);
                    }
                  }}
                />
              </FormControl>
              <FormDescription>
                Poster of the event, or anything else.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="link"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Link</FormLabel>
              <FormControl>
                <Input placeholder="https://someimportantlink.com" {...field} />
              </FormControl>
              <FormDescription>Some important Link</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={submitting}>
          {submitting ? "adding..." : "Add this Event"}
        </Button>
      </form>
    </Form>
  );
}
