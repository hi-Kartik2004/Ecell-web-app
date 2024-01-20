import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback, AvatarImage } from "./ui/avatar";

function TestimonialCard({ testimonial }) {
  return (
    <div>
      <div className="flex justify-center">
        <Card className="max-w-[400px] w-full bg-muted">
          <CardHeader className="flex gap-2 w-full">
            <div className="flex gap-2 items-center fle">
              <CardTitle className="text-lg ">
                {testimonial?.title || "Lorem ipsum dolor sit amet."}
              </CardTitle>
            </div>
            <CardDescription className="text-sm">
              {testimonial?.description ||
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum."}
            </CardDescription>
          </CardHeader>
          <CardFooter className="gap-2">
            <Avatar className="w-10 h-10">
              <AvatarImage
                src={`${testimonial?.personImage || "/ecell-no-bg.png"}`}
                alt={`${testimonial?.personName || "Lorem, ipsum."}`}
                className="rounded-full object-cover"
              />

              <AvatarFallback>
                {testimonial?.personName.slice(0, 2)}
              </AvatarFallback>
            </Avatar>

            <div>
              <p className="text-sm">{testimonial?.personName}</p>
              <p className="text-xs text-muted-foreground">
                {testimonial?.personSubtitle}
              </p>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default TestimonialCard;
