// Import necessary libraries and components
"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
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
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState, useEffect } from "react";
import { storage } from "@/firebase/config";

// Helper function to get file extension
function getFileExtension(fileName) {
  return fileName.split(".").pop().toLowerCase();
}

// Form schema for validation
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters."),
  teamSize: z.coerce.number().min(1, "Team size must be at least 1."),
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
  entryFees: z.coerce.number().min(0, "Please enter a valid entry fees."),
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
  link: z.optional(z.string().trim().url({ message: "Invalid URL" })),
  prizes: z.string().min(2, "Please enter a valid prize."),
});

// Function to handle Firestore operation
async function addMessageToFirestore({ formData }) {
  const timestamp = new Date().getTime();

  try {
    const imageFile = formData.image;

    if (imageFile.size === 0) {
      console.warn("File size is 0 bytes. Skipping upload.");
      return false;
    }

    const storageRef = ref(storage, `images/${imageFile.name}_${timestamp}`);

    try {
      await uploadBytes(storageRef, imageFile);
    } catch (uploadError) {
      console.error("Error uploading to Storage:", uploadError);
      throw uploadError;
    }

    let downloadURL;
    try {
      downloadURL = await getDownloadURL(storageRef);
    } catch (downloadError) {
      console.error("Error getting Download URL:", downloadError);
      throw downloadError;
    }

    const docData = {
      ...formData,
      timestamp: Date.now(),
      image: downloadURL,
    };

    const collectionRef = collection(db, "events");
    const docRef = await addDoc(collectionRef, docData);

    return true;
  } catch (error) {
    console.error("Error in Firestore operation:", error);
    return false;
  }
}

// Main component for the form
export default function EventForm() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      description: "",
      venue: "",
      entryFees: 0,
      image: null,
      teamSize: 1,
      date: "",
      link: "",
      prizes: "",
    },
  });

  // Function to handle form submission
  async function onSubmit(values) {
    console.log("Form Values:", values); // Log form values

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

  // Render UI based on form state
  if (submitted) {
    return (
      <div className="text-center h-[45vh] mt-20 mb-12 gap-4 flex flex-col justify-center">
        <BsCheck2Circle size={50} />
        <div className="p-2 rounded-md border">
          <p className="text-start">
            Thanks for filling the form. The event should show up shortly.
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
          name="prizes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rewards*</FormLabel>
              <FormControl>
                <Textarea placeholder="what is to be won?" {...field} />
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
                <Input {...field} />
              </FormControl>
              <FormDescription>
                Enter the max members possible in a team
              </FormDescription>
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
                      // Use setValue instead of field.onChange
                      form.setValue("image", e.target.files[0]);
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
          {submitting ? "Adding..." : "Add this Event"}
        </Button>
      </form>
    </Form>
  );
}
