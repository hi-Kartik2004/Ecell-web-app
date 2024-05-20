// Import necessary libraries and components
"use client";
import React, { useEffect, useRef, useState } from "react";
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
import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useUser } from "@clerk/nextjs";
import Loader from "./Loader";
import TeamMembersField from "./TeamMembersField";
import Link from "next/link";
import PaymentForm from "./PaymentForm";
import { useRouter, useSearchParams } from "next/navigation";
import { toast, useToast } from "./ui/use-toast";
import { Toaster } from "./ui/toaster";
import { BiEdit, BiPencil } from "react-icons/bi";

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

export async function addMessageToFirestore({ ...formData }) {
  try {
    const docData = {
      ...formData,
    };

    const collectionRef = collection(db, "registrations");
    await addDoc(collectionRef, docData);

    return true;
  } catch (error) {
    console.error("Error in Firestore operation:", error);
    return false;
  }
}

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

  const dateParts = data?.date?.split("-");
  data.dateObject = new Date(
    dateParts[2], // Year
    dateParts[1] - 1, // Month (subtract 1 because months are 0-indexed in JavaScript)
    dateParts[0] // Day
  );

  data.dateObject.setHours(23, 59, 59, 999);

  if (data?.dateObject < new Date()) {
    return (
      <div className="text-center h-[45vh] mt-20 mb-12 gap-4 flex flex-col justify-center items-center">
        <BsFillSignStopFill size={50} />
        <div className="px-4 py-2 rounded-md border">
          <h3 className="text-2xl font-semibold">Registrations Closed!</h3>
          <p className="text-center text-muted-foreground mt-2">
            The registrations for this event have closed on {data?.date}
          </p>
        </div>
        <div className="flex flex-wrap gap-4 items-center">
          <Button variant="secondary">
            <Link href={`/events`}>Events &rarr;</Link>
          </Button>
          <Button variant="secondary">
            <Link href={`/event-summaries?search=${data?.name}`}>
              Event Summary &rarr;
            </Link>
          </Button>
        </div>
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
            <Link href={`/handle-redirect?redirect=register/${data.id}`}>
              Sign in
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [teamSize, setTeamSize] = useState(1);
  const [loading, setLoading] = useState(true);
  const [Leader, setLeader] = useState({});
  const [showPayment, setShowPayment] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const [dataOfForm, setDataOfForm] = useState(null);
  const eventSourceRef = useRef(null);
  const [showDuplicatePaymentError, setShowDuplicatePaymentError] =
    useState(false);

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
      const leaderData = querySnapshot.docs[0].data();
      setLeader({
        leaderEmail: leaderData.leaderEmail,
        leaderName: leaderData.leaderName,
        leaderBranch: leaderData.leaderBranch,
        leaderYear: leaderData.leaderYear,
        leaderPhone: leaderData.leaderPhone || "",
        paymentId: leaderData.paymentId,
      });
      return true;
    }

    // If not found in leaderEmail, check memberEmail
    const qForMember = query(registrationsRef, where("eventId", "==", eventId));

    const memberQuerySnapshot = await getDocs(qForMember);

    // Check if any document is found
    if (!memberQuerySnapshot.empty) {
      // Check if any team member has the specified memberEmail
      const matchingDocument = memberQuerySnapshot.docs.find((doc) => {
        const teamMembers = doc.data().teamMembers || [];
        return teamMembers.some((member) => member.memberEmail === userEmail);
      });

      if (matchingDocument) {
        const memberData = matchingDocument.data();
        setLeader({
          leaderEmail: memberData.leaderEmail,
          leaderName: memberData.leaderName,
          leaderBranch: memberData.leaderBranch,
          leaderYear: memberData.leaderYear,
          leaderPhone: memberData.leaderPhone || "",
        });

        return true;
      }
    }

    return false;
  }

  async function checkUserRegistration() {
    const eventId = data.id;
    const userEmail = user?.emailAddresses?.[0]?.emailAddress || "";
    const isRegistered = await isUserRegistered(eventId, userEmail);
    console.log(isRegistered);
    if (isRegistered) {
      setSubmitted(true);
      setLoading(false);
    } else {
      setSubmitted(false);
      setLoading(false);
    }
  }

  useEffect(() => {
    checkUserRegistration();
  }, [submitted]);

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

  async function validatePaymentId(paymentId) {
    // validate paymentId
    if (!paymentId) return false;
    return true;
  }

  // Function to handle form submission
  async function onSubmit(values) {
    // const paymentId = searchParams("paymentId");
    sessionStorage.setItem("registerForm", JSON.stringify(values));
    setDataOfForm({
      ...values,
      ...data,
      timestamp: Date.now(),
    });
    setShowPayment(true);
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

  useEffect(() => {
    async function addDataToQueue() {
      const ref = collection(db, "paymentQueue");
      const q = query(
        collection(db, "paymentQueue"),
        where("leaderEmail", "==", user?.emailAddresses[0]?.emailAddress)
      );
      try {
        const getSnapshot = await getDocs(q);
        console.log(getSnapshot.size);
        if (!getSnapshot.empty) {
          setShowDuplicatePaymentError(true);
          return;
        }
        const snapshot = await addDoc(ref, dataOfForm);
        toast({
          title: "Team Details Saved!",
          description: "You can now proceed with the payment.",
        });
      } catch (e) {
        console.error(e);
      }
    }

    async function removeDataFromQueue() {
      const ref = collection(db, "paymentQueue");
      const q = query(ref, where("leaderEmail", "==", dataOfForm.leaderEmail));
      let querySnapshot;
      try {
        querySnapshot = await getDocs(q);
      } catch (err) {
        console.error(err);
        return; // Exit early if there's an error
      }

      // Use Promise.all to wait for all deletions to complete
      await Promise.all(
        querySnapshot.docs.map(async (doc) => {
          try {
            await deleteDoc(doc.ref);
            console.log("Successfully deleted data from payment queue");
          } catch (e) {
            console.error(e);
          }
        })
      );

      console.log("All deletions completed");
    }

    if (showPayment) {
      checkUserRegistration();
      addDataToQueue();
    }

    if (!showPayment) {
      removeDataFromQueue();
    }

    // after every 12 minutes set showPayment to false
    const interval = setInterval(() => {
      setShowPayment(false);
    }, 720000);

    return () => {
      removeDataFromQueue();
      clearInterval(interval);
    };
  }, [showPayment]);

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
            You have already registered for this event.
            {`Your team Leader is ${Leader.leaderName}, his Email is ${Leader.leaderEmail}, his Branch is ${Leader.leaderBranch}, his Year is ${Leader.leaderYear} and his Phone Number is +${Leader.leaderPhone} with payment id ${Leader.paymentId}`}
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

  if (showDuplicatePaymentError) {
    return (
      <div className="text-center h-[45vh] mt-20 mb-12 gap-4 flex flex-col justify-center items-center">
        <BsFillSignStopFill size={50} />
        <div className="px-4 py-2 rounded-md border">
          <h3 className="text-2xl font-semibold">
            You can only perform one payment at a time.
          </h3>
          <p className="text-center text-muted-foreground mt-2">
            please close other payment windows to proceed.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 items-center">
          {/* <Button
            onClick={() => {
              setShowPayment(false);
              setShowDuplicatePaymentError(false);
            }}
          >
            Shut down all other payment pages and proceed this payment with
            force
          </Button> */}
          <Button
            variant="secondary"
            onClick={() => {
              setShowPayment(false);
              setShowDuplicatePaymentError(false);
            }}
          >
            Proceed this payment with force*
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Toaster />
      {showPayment ? (
        <div className="flex flex-col items-center w-full">
          {/* <Button variant="secondary" asChild>
            <span
              onClick={() => {
                setShowPayment(false);
              }}
              className=" cursor-pointer w-full flex flex-wrap gap-2 items-center"
            >
              Edit Team Details <BiPencil size={20} />
            </span>
          </Button> */}
          <Button
            variant="link"
            onClick={() => {
              setShowPayment(false);
            }}
          >
            &rarr; Back
          </Button>
          <p className="text-red-500">
            The Email Address provided when making the payment should match with
            the leader's Email i.e the email using which you have logged in.
          </p>
          <iframe
            src={`https://konfhub.com/widget/tto?desc=false${
              "?eventId=" + data.id + "&teamName=" + dataOfForm.teamName
            }`}
            id="konfhub-widget"
            title="Register for testing this out"
            width="100%"
            height="500px"
            className="rounded-lg no-scrollbar mt-4 shadow-lg shadow-background border"
          ></iframe>
        </div>
      ) : (
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
                  <FormDescription>
                    Keep it innovative and short.
                  </FormDescription>
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
                  <FormDescription>
                    Keep it innovative and short.
                  </FormDescription>
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
                    <Input
                      className="bg-muted text-muted-foreground"
                      readOnly={field.values === "" ? false : true}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Your primary contact phone Number
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
                <TeamMembersField
                  member={member}
                  index={index}
                  remove={remove}
                />
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
      )}
    </>
  );
}
