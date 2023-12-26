// Import necessary libraries and components
"use client";
import React, { useEffect, useState } from "react";
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
import Link from "next/link";
import { Separator } from "./ui/separator";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/firebase/config";

// Validation schema for an individual team member
const getTeamMemberSchema = (index) =>
  z.object({
    name: z
      .string()
      .min(2, `Team Member ${index + 1} Name must be at least 2 characters.`),
    year: z.coerce
      .number()
      .max(5, `Team Member ${index + 1} Year must be at least 1 and max 5.`),
    branch: z
      .string()
      .min(3, `Team Member ${index + 1} Branch must be at least 3 characters.`),
    email: z
      .string()
      .email(`Please enter a valid email for Team Member ${index + 1}.`),
    phone: z.coerce
      .number()
      .min(
        1000000000,
        `Please enter a valid phone number for Team Member ${index + 1}.`
      ),
  });

// Main component for the form
export default function RegisterForm({ data }) {
  const formSchema = z.object({
    teamName: z.string().min(2, "Team Name must be at least 2 characters."),
    name: z.string().min(2, "Name must be at least 2 characters."),
    uucms: z.string().min(14, "Uucms Number must be at least 14 characters."),
    year: z.coerce.number().max(5, "Year must be at least 1 and max 5."),
    branch: z.string().min(3, "Branch must be at least 3 characters."),
    teamSize: z.coerce
      .number()
      .min(1, "Team size must be at least 1.")
      .max(data.teamSize, `Max team size is ${data.teamSize}.`),
    email: z.string().email("Please enter a valid contact email."),
    phone: z.coerce
      .number()
      .min(1000000000, "Please enter a valid contact number."),
    comments: z.string(),
    teamLeader: z.object({
      name: z
        .string()
        .min(2, "Team Leaders Name must be at least 2 characters."),
      year: z.coerce
        .number()
        .max(5, "Team Leader Year must be at least 1 and max 5."),
      branch: z
        .string()
        .min(3, "Team Leader Branch must be at least 3 characters."),
      email: z.string().email("Please enter a valid email for Team Leader."),
      phone: z.coerce
        .number()
        .min(1000000000, "Please enter a valid phone number for Team Leader."),
    }),
    teamMembers: z.array(z.object({})), // Placeholder for team members
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      teamName: "",
      name: "",
      uucms: "",
      branch: "",
      email: "",
      comments: "",
      teamLeader: {
        name: "",
        year: "",
        branch: "",
        email: "",
        phone: "",
      },
      teamMembers: Array.from({ length: data.teamSize }, (_, index) => ({
        name: "",
        year: "",
        branch: "",
        email: "",
        phone: "",
      })),
    },
  });

  async function addRegistrationToFirestore({ formData }) {
    try {
      console.log("Adding registration to Firestore...");

      const docData = {
        teamName: formData.teamName,
        teamLeader: formData.teamLeader,
        teamMembers: formData.teamMembers,
        eventId: data.id,
        eventName: data.name,
        timestamp: Date.now(),
      };

      const collectionRef = collection(db, "registrations");
      await addDoc(collectionRef, docData);
      console.log("Registration added successfully.");

      return true;
    } catch (error) {
      console.error("Error in Firestore operation:", error);
      return false;
    }
  }

  // Function to handle form submission
  // Function to handle form submission
  const onSubmit = async (values) => {
    console.log("Form Values:", values);

    setSubmitting(true);

    try {
      // Validate team members using the generated schema
      const teamMembersSchema = z.array(
        getTeamMemberSchema(values.teamMembers.length)
      );

      teamMembersSchema.parse(values.teamMembers);

      const isDocAdded = await addRegistrationToFirestore({ formData: values });

      if (isDocAdded) {
        setSubmitted(true);
        // reset the form after successful submission
        form.reset({
          teamName: "",
          name: "",
          uucms: "",
          branch: "",
          email: "",
          comments: "",
          teamLeader: {
            name: "",
            year: "",
            branch: "",
            email: "",
            phone: "",
          },
          teamMembers: Array.from({ length: data.teamSize }, (_, index) => ({
            name: "",
            year: "",
            branch: "",
            email: "",
            phone: "",
          })),
        });
      } else {
        setSubmitted(false);
        console.log("Not added!");
      }
    } catch (error) {
      console.error("Error in form submission:", error);
      setSubmitted(false);
    } finally {
      setSubmitting(false);
    }
  };

  // Render UI based on form state
  if (submitted) {
    return (
      <div className="text-center h-[45vh] mt-20 mb-12 gap-4 flex flex-col justify-center">
        <BsCheck2Circle size={50} />
        <div className="p-2 rounded-md border">
          <p className="text-start">
            Thanks for filling the form. You have registered for this event!
          </p>
        </div>
        <div>
          <Button variant="outline">
            <Link href="/events">Register for another event</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={(e) => {
          form.handleSubmit(onSubmit);
        }}
        className="space-y-8"
      >
        {/* Team Name Field */}
        <FormField
          control={form.control}
          name="teamName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Team Name*</FormLabel>
              <FormControl>
                <Input placeholder="Your Beautiful Team Name" {...field} />
              </FormControl>
              <FormDescription>Keep it innovative and short.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Team Leader Fields */}
        <FormField
          control={form.control}
          name="teamLeader.name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Team Leader*</FormLabel>
              <FormControl>
                <Input placeholder="Prince" {...field} />
              </FormControl>
              <FormDescription>
                The email below must belong to this person.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="teamLeader.email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Team Leader Email*</FormLabel>
              <FormControl>
                <Input placeholder="teamleader@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="teamLeader.phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Team Leader Phone*</FormLabel>
              <FormControl>
                <Input placeholder="9876543210" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Year Field */}
        <FormField
          control={form.control}
          name="year"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Team Leader year*</FormLabel>
              <FormControl>
                <Input placeholder="" type="number" {...field} />
              </FormControl>
              <FormDescription>- academic year (5 for M.tech)</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Branch Field */}
        <FormField
          control={form.control}
          name="branch"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Team Leader Branch*</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription>
                branches (ISE, CSE, AIML, ECE, EEE, ME, Civil, Architecture,
                M.tech specific branches)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Team Size Field */}
        {data.teamSize > 1 && (
          <FormField
            control={form.control}
            name="teamSize"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Team Size*</FormLabel>
                <FormControl>
                  <Input placeholder="" type="number" {...field} />
                </FormControl>
                <FormDescription>
                  Keep it within the specified range.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {/* Comments Field */}
        <FormField
          control={form.control}
          name="comments"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Other Comments*</FormLabel>
              <FormControl>
                <Textarea placeholder="..." {...field} />
              </FormControl>
              <FormDescription>
                Anything else you want to tell us?
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={submitting}>
          {submitting ? "Please wait..." : "Register"}
        </Button>
      </form>
    </Form>
  );
}
