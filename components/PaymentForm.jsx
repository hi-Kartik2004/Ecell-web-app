"use client";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { MdPolicy, MdSecurity } from "react-icons/md";
import { CheckIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { BiCheck } from "react-icons/bi";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/firebase/config";
import { BsCheck2Circle } from "react-icons/bs";
import { getFirestore, getDocs, query, where } from "firebase/firestore";

function PaymentForm({ data }) {
  const router = useRouter();
  const pathname = usePathname();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [Leader, setLeader] = useState({});
  let formValues = sessionStorage.getItem("registerForm");
  const [error, setError] = useState();
  formValues = JSON.parse(formValues);

  const checkPaymentAlreadyMade = async (paymentId) => {
    console.log("paymentId: ", paymentId);
    const db = getFirestore();
    const registrationsCollection = collection(db, "registrations");

    // Create a query to check for the existence of the paymentId
    const q = query(
      registrationsCollection,
      where("paymentId", "==", paymentId),
      where("paymentId", "!=", "Free")
    );

    try {
      const querySnapshot = await getDocs(q);

      // If there are documents in the query snapshot, check if any are not marked as "Free"
      const existingRegistrations = querySnapshot.docs.filter(
        (doc) => doc.data().entryFees !== 0
      );

      // If there are existing registrations (not marked as "Free"), return true
      console.log(existingRegistrations.length);
      return existingRegistrations.length > 0;
    } catch (error) {
      console.error("Error checking payment:", error);
      // Handle error accordingly
      return false;
    }
  };

  function validatePaymentDetails(paymentId, fees) {
    return true;
  }

  async function makePayment(e) {
    e.preventDefault();
    const paymentId = e.target.paymentId.value;
    if (!paymentId) {
      setError("Missing Payment Id");
      return;
    }

    // check if payment already made - use server for this
    if (await checkPaymentAlreadyMade(paymentId)) {
      setError("PaymentId already used");
      return;
    }

    // check if the payment has been made to E-CELL UVCE account and amount - use server for this
    if (
      !validatePaymentDetails(
        paymentId,
        data.entryFees * (formValues.teamMembers.length + 1)
      )
    ) {
      setError("Incorrect Receiver");
      return;
    }

    handleRegistrationDetails(formValues, paymentId);
  }

  // Function to handle Firestore operation
  async function addMessageToFirestore({ formData }, paymentId) {
    try {
      const docData = {
        ...formData,
        timestamp: Date.now(),
        eventId: data.id,
        eventName: data.name,
        paymentId: paymentId,
      };

      const collectionRef = collection(db, "registrations");
      await addDoc(collectionRef, docData);

      return true;
    } catch (error) {
      console.error("Error in Firestore operation:", error);
      return false;
    }
  }

  async function handleRegistrationDetails(values, paymentId) {
    setSubmitting(true);

    try {
      const isDocAdded = await addMessageToFirestore(
        { formData: values },
        paymentId
      );

      if (isDocAdded) {
        const formData = values;
        setLeader({
          leaderEmail: formData.leaderEmail,
          leaderName: formData.leaderName,
          leaderBranch: formData.leaderBranch,
          leaderYear: formData.leaderYear,
          leaderPhone: formData.leaderPhone || "",
          paymentId: paymentId,
        });
        setSubmitted(true);

        // reset the form after successful submission
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

  return (
    <>
      {submitted ? (
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
      ) : (
        <div className="flex flex-col items-center my-10 w-full">
          <div className="p-4 rounded-lg bg-muted border">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6x-ZkJK5Os7Y5HmpPsCOStJDS6EjGrdbC4eKcpaCiiQ&s"
              alt="qr-code"
            />
          </div>
          <h3 className=" mt-4 text-xl font-semibold">
            {data.entryFees * (formValues.teamMembers.length + 1) === 0
              ? "Proceed by clicking the button below!"
              : `Make a payment of Rs ${
                  data.entryFees * (formValues.teamMembers.length + 1)
                }`}
          </h3>
          <p className="text-muted-foreground">
            Kartikeya Saini - Treasurer E-Cell UVCE
          </p>
          <form
            className="mt-10 w-full flex flex-col gap-2"
            onSubmit={(e) => {
              makePayment(e);
            }}
          >
            <label
              htmlFor="payemnt-id"
              className={`text-sm  text-muted-foreground ${
                error && "text-red-500"
              }`}
            >
              Enter Payment Id {error && "(" + error + ")"}
            </label>
            <Input
              type="text"
              name="paymentId"
              placeholder="Payment id"
              value={data.entryFees === 0 ? "Free" : null}
              disabled={data.entryFees === 0}
              required={true}
            />

            <Button
              type="submit"
              className="flex items-center gap-2 font-semibold text-md"
            >
              <MdSecurity size={18} />{" "}
              {submitting ? "Validating..." : "Complete Registeration"}
            </Button>
          </form>
          <Separator className="mt-10" />
          <div className="flex flex-col items-start justify-between">
            <div>
              <h3 className="mt-10 text-xl font-semibold text-center">
                Terms & Conditions
              </h3>
              <div className="flex flex-col gap-2 mt-5">
                <div className="flex items-center gap-2">
                  <BiCheck size={30} />
                  <p className="text-muted-foreground">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Quisquam quae commodi eum!
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <BiCheck size={30} />
                  <p className="text-muted-foreground">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Quisquam quae commodi eum!
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <BiCheck size={30} />
                  <p className="text-muted-foreground">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Quisquam quae commodi eum!
                  </p>
                </div>
              </div>
            </div>

            <Button variant="link" className="mt-4" asChild>
              <Link href="/legals">Legal Stuff</Link>
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

export default PaymentForm;
