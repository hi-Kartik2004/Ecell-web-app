import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BsCalendar,
  BsFilePerson,
  BsFilePersonFill,
  BsFillCalendar2DayFill,
  BsFillPhoneFill,
  BsMailbox,
  BsPerson,
} from "react-icons/bs";
import { Button } from "./ui/button";
import Link from "next/link";
import { BiLogoGmail } from "react-icons/bi";

function EventCard({ data }) {
  return (
    <Card className="max-w-[400px] w-full">
      <CardHeader>
        <div className="mb-2 flex justify-between">
          <Badge variant={"secondary"}>Free</Badge>
          <div className="flex items-center gap-1">
            <BsPerson /> <span className="text-sm">1-3</span>
          </div>
        </div>
        <CardTitle className="">Lorem, ipsum.</CardTitle>
      </CardHeader>
      <CardContent className="-mt-2">
        <CardDescription className="line-clamp-3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam velit
          quibusdam aliquam nihil, itaque voluptatibus laboriosam rerum id
          sapiente quidem tempora officiis vel ipsam!
        </CardDescription>

        <div className="w-full flex justify-center">
          <div className="mt-4 flex justify-center w-[275px] h-[275px]">
            <img
              src="https://placeholder.com/300X300"
              alt="poster"
              className="rounded-md object-cover"
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 items-center">
            <BsCalendar /> <span className="text-xs">12-01-2024</span>
          </div>
          <div>
            <Link
              href="mailto:kudlu2004@gmail.com"
              className="text-sm hover:underline underline-offset-4 flex gap-2 items-center"
            >
              <BiLogoGmail /> Contact
            </Link>
          </div>
        </div>
        <Button variant="">Register &rarr;</Button>
      </CardFooter>
    </Card>
  );
}

export default EventCard;
