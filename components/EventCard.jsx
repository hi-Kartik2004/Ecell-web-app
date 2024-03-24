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
import { date } from "zod";
import { FaLocationDot } from "react-icons/fa6";

function EventCard({ data, expired }) {
  return (
    <Card className="max-w-[400px] w-full">
      <CardHeader>
        <div className="mb-2 flex justify-between">
          <Badge variant={"secondary"}>
            {data?.entryFees == 0 ? "Free" : "Rs " + data?.entryFees + " /-"}
          </Badge>
          <div className="flex items-center gap-1">
            <BsPerson />{" "}
            <span className="text-sm">
              {data?.teamSize == 1 ? "1" : "1" + ` - ${data?.teamSize}`}
            </span>
          </div>
        </div>
        <CardTitle className="">{data?.name}</CardTitle>
      </CardHeader>
      <CardContent className="-mt-2">
        <CardDescription className="line-clamp-3">
          {data?.description}
        </CardDescription>

        <div className="w-full flex justify-center">
          <div className="mt-4 flex justify-center w-[275px] h-[275px] bg-muted rounded-md">
            <img
              src={`${data.image}`}
              alt={`${data.name}`}
              className="rounded-md object-cover bg-muted"
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 items-center">
            <BsCalendar /> <span className="text-xs">{data?.date}</span>
          </div>
          <div>
            <Link
              href={`mailto:${data.email || "kudlu2004@gmail.com"}`}
              className="text-sm hover:underline underline-offset-4 flex gap-2 items-center"
            >
              <FaLocationDot /> <span className="text-xs">{data?.venue}</span>
            </Link>
          </div>
        </div>
        {expired ? (
          <Link href={`/register/${data.id}`}>
            <Button variant="">View Details &rarr;</Button>
          </Link>
        ) : (
          <Link href={`/register/${data.id}`}>
            <Button variant="">Register &rarr;</Button>
          </Link>
        )}
      </CardFooter>
    </Card>
  );
}

export default EventCard;
