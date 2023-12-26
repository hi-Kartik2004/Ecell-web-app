import { doc, getDoc } from "firebase/firestore";
import React from "react";
import { db } from "@/firebase/config";
import {
  BiCalendar,
  BiLocationPlus,
  BiPhone,
  BiSolidLocationPlus,
} from "react-icons/bi";
import { FaLocationDot } from "react-icons/fa6";
import { MdGroup, MdMarkEmailRead } from "react-icons/md";
import { PiHandCoins } from "react-icons/pi";
import Link from "next/link";
import { FaPhoneAlt } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import EventForm from "@/components/EventForm";
import { Separator } from "@/components/ui/separator";
import RegisterForm from "@/components/RegisterForm";

async function page({ params }) {
  let data;
  try {
    const eventRef = doc(db, "events", params.id);
    const snapshot = await getDoc(eventRef);
    data = snapshot.data();
  } catch (error) {
    console.error(error);
  }

  return (
    <>
      <section className="flex flex-wrap container gap-10 mt-16 py-10 justify-between">
        <div className="max-w-[650px] w-full">
          <div className="w-full h-[100px] rounded-md">
            <img
              src={`https://source.unsplash.com/random/350X350/?${data.name}`}
              alt="unsplash_image_for_this_event"
              className="w-full h-full object-cover rounded-md bg-muted"
            />
          </div>
          <div className="mt-4">
            <h1 className="text-2xl font-semibold">{data.name}</h1>
            <div className="flex items-center justify-between mt-4">
              <div className="flex flex-col gap-2">
                <div className="flex gap-2 items-center">
                  <BiCalendar />{" "}
                  <span className="text-muted-foreground text-sm">
                    {data.date}
                  </span>
                </div>

                <div className="flex gap-2 items-center">
                  <FaLocationDot />

                  <span className="text-muted-foreground text-sm">
                    {data.venue}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex gap-2 items-center">
                  <PiHandCoins />

                  <span className="text-muted-foreground text-sm">
                    Rs {data.entryFees} /- per head
                  </span>
                </div>

                <div className="flex gap-2 items-center">
                  <MdGroup />

                  <span className="text-muted-foreground text-sm">
                    {data.teamSize == 1 ? "Solo" : `1 - ${data.teamSize}`}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h1 className="text-xl font-semibold">About the event</h1>
            <p className="text-muted-foreground mt-2">{data?.description}</p>
          </div>

          <div className="mt-8">
            <h1 className="text-xl font-semibold">Rewards</h1>
            <p className="text-muted-foreground mt-2">{data?.prizes}</p>
          </div>

          <div className="mt-8">
            <h1 className="text-xl font-semibold">Contact</h1>
            <div className="mt-2 flex gap-2 items-center">
              <p>{"Rushil BR"}</p> -
              <Link
                href={`tel:${data?.presidentPhone}`}
                className="flex items-center gap-2 text-muted-foreground hover:underline underline-offset-4"
              >
                <FaPhoneAlt />
                <span>+91 12345 67890</span>
              </Link>
            </div>
            <div className="mt-2 flex gap-2 items-center">
              <p>{"Rushil BR"}</p> -
              <Link
                href={`mailto:${data?.email}`}
                className="flex items-center gap-2 text-muted-foreground hover:underline underline-offset-4"
              >
                <MdMarkEmailRead />
                <span>{data?.email}</span>
              </Link>
            </div>
          </div>

          <div className="mt-8 w-full">
            <img
              src={`${data.image}`}
              alt={`${data.name}`}
              className=" object-cover rounded-md bg-muted"
            />
          </div>
        </div>

        {/* <Separator className="my-2" /> */}

        <div className="max-w-[600px] w-full bg-card p-8 py-10 rounded-md border">
          <h1 className="text-3xl font-semibold text-center">
            <span className="text-primary">Register</span> for {data.name}!
          </h1>

          <p className="text-center text-muted-foreground mt-2">
            lorem ipsum dor sit ipem
          </p>

          <div className="mt-6 pr-4">
            <RegisterForm data={data} />
          </div>
        </div>

        {/* <Separator className="my-2" /> */}
      </section>

      <Separator className="my-4" />
    </>
  );
}

export default page;
