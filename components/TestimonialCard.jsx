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

function TestimonialCard() {
  return (
    <div>
      <div className="flex justify-center">
        <Card className="max-w-[400px] w-full bg-muted">
          <CardHeader className="flex gap-2 w-full">
            <div className="flex gap-2 items-center fle">
              <CardTitle className="text-lg ">
                Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum dolor
              </CardTitle>
            </div>
            <CardDescription className="text-sm">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias
              nostrum sapiente asperiores accusantium ipsum quo aspernatur
            </CardDescription>
          </CardHeader>
          <CardFooter className="gap-2">
            <Avatar className="w-10 h-10">
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt="@shadcn"
                className="rounded-full object-cover"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <div>
              <p className="text-sm">Lorem, ipsum.</p>
              <p className="text-xs text-muted-foreground">
                Lorem, ipsum dolor.
              </p>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default TestimonialCard;
