"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BiNetworkChart, BiSolidBullseye } from "react-icons/bi";
import { MdWorkspacePremium } from "react-icons/md";
import globalData from "@/app/data";
import { useSearchParams } from "next/navigation";
import { ShowerHead } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  DialogClose,
  DialogDescription,
  DialogTrigger,
} from "@radix-ui/react-dialog";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { Input } from "./ui/input";
import { Button } from "@/components/ui/button";
import QrCodeComponent from "./QrCodeComponent";
import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db, storage } from "@/firebase/config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { toast, useToast } from "./ui/use-toast";
import { Toaster } from "./ui/toaster";
import { useUser } from "@clerk/nextjs";
import Loader from "./Loader";

function MembershipForm() {
  const { user, isLoaded } = useUser();
  if (!isLoaded) {
    return (
      <div className="mt-36 mb-20">
        <Loader />
      </div>
    );
  }

  const { toast } = useToast();

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [regTimestamp, setRegTimestamp] = useState(null);
  const [status, setStatus] = useState(null);

  function isTimestampWithinOneYear(timestamp) {
    // Convert the provided timestamp to milliseconds
    const milliseconds = timestamp.seconds * 1000 + timestamp.nanoseconds / 1e6;

    // Create a Date object from the milliseconds
    const providedDate = new Date(milliseconds);

    // Calculate date one year ago from today
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

    // Compare provided timestamp with date one year ago
    return providedDate > oneYearAgo;
  }

  async function checkRegistrationStatus() {
    const transactionsRef = collection(db, "transactions");
    const transactionsSnapshot = await getDocs(
      query(
        transactionsRef,
        where("email", "==", user?.emailAddresses[0]?.emailAddress),
        orderBy("timestamp", "desc")
      )
    );
    const transactionsList = transactionsSnapshot.docs.map((doc) => doc.data());
    const userTransactions = transactionsList.filter(
      (transaction) =>
        transaction.email === user?.emailAddresses[0]?.emailAddress
    );
    if (userTransactions.length > 0) {
      setRegTimestamp(userTransactions[0]?.timestamp);
      if (isTimestampWithinOneYear(userTransactions[0]?.timestamp)) {
        setStatus(userTransactions[0]?.status);
        console.log("User has already registered.");
        return true;
      }
    }
    console.log("User has not registered yet.");
    return false;
  }

  async function getImageUrlFromFirestore(imageFile) {
    // Create a reference to the file we want to download
    if (imageFile.size === 0) {
      console.warn("File size is 0 bytes. Skipping upload.");
      return false;
    }

    const storageRef = ref(
      storage,
      `transactions/${imageFile.name}_${Date.now()}`
    );

    try {
      await uploadBytes(storageRef, imageFile);
    } catch (uploadError) {
      console.error("Error uploading to Storage:", uploadError);
      throw uploadError;
    }

    const url = await getDownloadURL(storageRef);

    console.log("Image Uploaded Successfully!");
    return url;
  }

  async function addMembershipDetailsToFirebase(e) {
    e.preventDefault();
    setSubmitting(true);
    const formData = new FormData(e.target);
    console.log(formData);

    // check if the file uploaded is less than 10MB
    if (formData.get("transactionScreenshot").size > 10 * 1024 * 1024) {
      toast({
        title: "File size should be less than 10 MB",
        description: "Please upload a smaller image.",
      });

      setSubmitting(false);
      return;
    }

    const transactionUrl = await getImageUrlFromFirestore(
      formData.get("transactionScreenshot")
    );

    const transactionRef = collection(db, "transactions");
    await addDoc(transactionRef, {
      name: user?.fullName,
      email: user?.emailAddresses[0]?.emailAddress,
      phone: user?.phoneNumbers[0]?.phoneNumber,
      senderUPI: formData.get("senderUPI"),
      transactionId: formData.get("transactionId"),
      transactionScreenshot: transactionUrl,
      timestamp: new Date(),
      status: "Approval pending",
    });

    toast({
      title: "Membership Claimed Successfully!",
      description:
        "We will verify your payment and get back to you with in 24 hours.",
    });
    checkRegistrationStatus();
    setSubmitting(false);
    setSubmitted(true);
  }

  useEffect(() => {
    checkRegistrationStatus();
  }, []);

  return (
    // className="inline-flex items-center justify-center w-full h-12 px-6 mb-4 tracking-wide text-black font-bold transition duration-200 rounded-lg shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none border bg-white"
    <div>
      <Toaster />
      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20 flex justify-center">
        <div className="grid max-w-md gap-10 row-gap-5 sm:row-gap-10 lg:max-w-screen-md lg:grid-cols-2 sm:mx-auto mt-10 items-center">
          <div className="flex flex-col justify-around p-5 bg-primary shadow-xl shadow-primary/50 border rounded-lg">
            <div className="mb-6">
              <div className="flex items-center justify-between pb-6 mb-6 border-b">
                <div>
                  <p className="text-sm font-bold tracking-wider uppercase text-black">
                    {globalData?.joinPageMembershipCardMessage}
                  </p>
                  <p className="text-5xl font-extrabold text-black mt-2">
                    Rs {globalData?.joinPageMembershipCardAmount}
                  </p>
                </div>
                <div className="flex items-center justify-center w-24 h-24 border rounded-full bg-white">
                  <MdWorkspacePremium size={60} className="text-black" />

                  {/* <svg
                    className="w-10 h-10 text-black"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLidth="2"
                  >
                    <path
                      d="M4,7L4,7 C2.895,7,2,6.105,2,5v0c0-1.105,0.895-2,2-2h0c1.105,0,2,0.895,2,2v0C6,6.105,5.105,7,4,7z"
                      fill="none"
                      stroke="currentColor"
                    />
                    <path
                      d="M6,21H3v-4 l-2,0v-5c0-1.105,0.895-2,2-2h1"
                      fill="none"
                      stroke="currentColor"
                    />
                    <path
                      d="M20,7L20,7 c1.105,0,2-0.895,2-2v0c0-1.105-0.895-2-2-2h0c-1.105,0-2,0.895-2,2v0C18,6.105,18.895,7,20,7z"
                      fill="none"
                      stroke="currentColor"
                    />
                    <path
                      d="M18,21h3v-4 l2,0v-5c0-1.105-0.895-2-2-2h-1"
                      fill="none"
                      stroke="currentColor"
                    />
                    <path
                      d="M12,7L12,7 c-1.657,0-3-1.343-3-3v0c0-1.657,1.343-3,3-3h0c1.657,0,3,1.343,3,3v0C15,5.657,13.657,7,12,7z"
                      fill="none"
                      stroke="currentColor"
                    />
                    <path
                      d="M15,23H9v-6H7v-5 c0-1.105,0.895-2,2-2h6c1.105,0,2,0.895,2,2v6h-2V23z"
                      fill="none"
                      stroke="currentColor"
                    />
                  </svg> */}
                </div>
              </div>
              <div>
                <p className="mb-2 font-bold tracking-wide text-black">
                  Benefits
                </p>
                <ul className="space-y-2">
                  {globalData.joinPageMembershipCardBenefits &&
                    globalData?.joinPageMembershipCardBenefits.map(
                      (benefit) => {
                        return (
                          <li className="flex items-center">
                            <div className="mr-2">
                              <svg
                                className="w-4 h-4 text-black"
                                viewBox="0 0 24 24"
                                strokeLinecap="round"
                                strokeLidth="2"
                              >
                                <polyline
                                  fill="none"
                                  stroke="currentColor"
                                  points="6,12 10,16 18,8"
                                />
                                <circle
                                  cx="12"
                                  cy="12"
                                  fill="none"
                                  r="11"
                                  stroke="currentColor"
                                />
                              </svg>
                            </div>
                            <p className="font-medium text-gray-800">
                              {benefit}
                            </p>
                          </li>
                        );
                      }
                    )}
                </ul>
              </div>
            </div>
            <div>
              {
                <Dialog className={`${submitted && "hidden"}`}>
                  <DialogTrigger asChild>
                    <button
                      disabled={status}
                      className="inline-flex items-center justify-center w-full h-12 px-6 mb-4 tracking-wide text-black font-bold transition duration-200 rounded-lg shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none border bg-white"
                    >
                      {status ? (
                        <span className="flex gap-2 items-center">
                          {status}
                        </span>
                      ) : submitting ? (
                        "Submitting..."
                      ) : (
                        "Purchase Membership"
                      )}
                    </button>
                  </DialogTrigger>
                  <DialogContent className="overflow-auto">
                    <DialogHeader>
                      <DialogTitle>
                        {globalData?.joinPageMembershipDialogTitle}
                      </DialogTitle>
                      <DialogDescription className="text-muted-foreground text-sm">
                        {globalData?.joinPageMembershipDialogDescription}
                      </DialogDescription>
                    </DialogHeader>

                    <div className="max-w-[800px] flex items-center justify-center">
                      <QrCodeComponent />
                    </div>
                    <form
                      className="w-full flex flex-col gap-2 items-center"
                      onSubmit={(e) => addMembershipDetailsToFirebase(e)}
                    >
                      <label className="w-full">
                        <span className="text-sm text-muted-foreground">
                          Sender's UPI ID
                        </span>
                        <Input name="senderUPI" required />
                      </label>

                      <label className="w-full">
                        <span className="text-sm text-muted-foreground">
                          Transaction ID
                        </span>
                        <Input name="transactionId" required />
                      </label>

                      <label className="w-full">
                        <span className="text-sm text-muted-foreground">
                          Payment Screenshot
                        </span>
                        <Input
                          type="file"
                          name={"transactionScreenshot"}
                          required
                        />
                      </label>
                      <Button
                        type="submit"
                        className="w-full mt-4"
                        disabled={status}
                      >
                        {submitting
                          ? "Submitting..."
                          : status
                            ? "Verification Pending (24 hours)"
                            : "Claim Membership"}
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              }
              <p className="text-sm text-gray-700">
                {regTimestamp && (
                  <b>Last Applied on {regTimestamp.toDate().toDateString()}</b>
                )}
                {regTimestamp && <br />}
                {globalData?.joinPageMembershipCardDescription}
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-between p-5 bg-indigo-50 border rounded-lg shadow-2xl shadow-indigo-50/50">
            <div className="mb-6">
              <div className="flex items-center justify-between pb-6 mb-6 border-b">
                <div>
                  <p className="text-sm text-black font-bold tracking-wider uppercase"></p>
                  <p className="text-5xl font-extrabold text-black">Free</p>
                </div>
                <div className="flex items-center justify-center w-24 h-24 border rounded-full bg-blue-gray-50">
                  <svg
                    className="w-10 h-10 text-gray-700"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLidth="2"
                  >
                    <path
                      d="M12,7L12,7 c-1.657,0-3-1.343-3-3v0c0-1.657,1.343-3,3-3h0c1.657,0,3,1.343,3,3v0C15,5.657,13.657,7,12,7z"
                      fill="none"
                      stroke="currentColor"
                    />
                    <path
                      d="M15,23H9v-5H7v-6 c0-1.105,0.895-2,2-2h6c1.105,0,2,0.895,2,2v6h-2V23z"
                      fill="none"
                      stroke="currentColor"
                    />
                  </svg>
                </div>
              </div>
              <div>
                <p className="mb-2 font-bold tracking-wide text-black">
                  Benefits
                </p>
                <ul className="space-y-2">
                  {globalData.joinPageFreeCardBenefits &&
                    globalData?.joinPageFreeCardBenefits.map((benefit) => {
                      return (
                        <li className="flex items-center">
                          <div className="mr-2">
                            <svg
                              className="w-4 h-4 text-black"
                              viewBox="0 0 24 24"
                              strokeLinecap="round"
                              strokeLidth="2"
                            >
                              <polyline
                                fill="none"
                                stroke="currentColor"
                                points="6,12 10,16 18,8"
                              />
                              <circle
                                cx="12"
                                cy="12"
                                fill="none"
                                r="11"
                                stroke="currentColor"
                              />
                            </svg>
                          </div>
                          <p className="font-medium text-gray-800">{benefit}</p>
                        </li>
                      );
                    })}
                </ul>
              </div>
            </div>
            <div>
              <Link
                href="/"
                className="inline-flex items-center justify-center w-full h-12 px-6 mb-4 font-medium tracking-wide text-primary transition duration-200 bg-gray-800 rounded-lg shadow-md hover:bg-gray-900 focus:shadow-outline focus:outline-none"
              >
                Start for free &rarr;
              </Link>
              <p className="text-sm text-gray-700">
                {globalData?.joinPageFreeCardDescription}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MembershipForm;
