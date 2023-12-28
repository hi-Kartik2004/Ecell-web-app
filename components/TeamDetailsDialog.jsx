import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Separator } from "./ui/separator";
import { data } from "autoprefixer";

function TeamDetailsDialog({ data }) {
  // Destructure properties from memberDetails

  const teamMembers = data?.teamMembers;

  return (
    <Dialog className="">
      <DialogTrigger asChild>
        <Button variant="outline" className="py-0 ml-1">
          View Team members
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[500px] overflow-auto">
        <DialogHeader>
          <DialogTitle>Team Members</DialogTitle>
          <DialogDescription>
            View details of the team members.
          </DialogDescription>
        </DialogHeader>
        <div>
          <div className="grid gap-2">
            <h4 className="text-lg font-medium">
              Team {data?.teamName} Leader :
            </h4>
            <div className="flex gap-2 items-center">
              <Label className="text-left text-muted-foreground">Name:</Label>
              <p className="text-primary"> {data?.leaderName}</p>
            </div>

            <div className="flex gap-2 items-center">
              <Label className="text-left text-muted-foreground">Year:</Label>
              <p className="text-primary"> {data?.leaderYear}</p>
            </div>

            <div className="flex gap-2 items-center">
              <Label className="text-left text-muted-foreground">Branch:</Label>
              <p className="text-primary"> {data?.leaderBranch}</p>
            </div>

            <div className="flex gap-2 items-center">
              <Label className="text-left text-muted-foreground">Phone:</Label>
              <p className="text-primary"> {data?.leaderPhone}</p>
            </div>

            <div className="flex gap-2 items-center">
              <Label className="text-left text-muted-foreground">Email:</Label>
              <p className="text-primary"> {data?.leaderEmail}</p>
            </div>

            <Separator />
          </div>
        </div>
        {teamMembers &&
          teamMembers.map((member, index) => (
            <div key={member?.memberEmail} className="grid gap-2">
              <h4 className="text-lg font-medium">Member {index + 1} :</h4>
              <div className="flex gap-2 items-center">
                <Label className="text-left text-muted-foreground">Name:</Label>
                <p className="text-primary"> {member?.memberName}</p>
              </div>

              <div className="flex gap-2 items-center">
                <Label className="text-left text-muted-foreground">Year:</Label>
                <p className="text-primary">{member?.memberYear}</p>
              </div>

              <div className="flex gap-2 items-center">
                <Label className="text-left text-muted-foreground">
                  Branch:
                </Label>
                <p className="text-primary">{member?.memberBranch}</p>
              </div>

              <div className="flex gap-2 items-center">
                <Label className="text-left text-muted-foreground">
                  Phone:
                </Label>
                <p className="text-primary">{member?.memberPhone}</p>
              </div>

              <div className="flex gap-2 items-center">
                <Label className="text-left text-muted-foreground">
                  Email:
                </Label>
                <p className="text-primary"> {member?.memberEmail}</p>
              </div>

              <Separator />

              {/* Add additional fields as needed */}
            </div>
          ))}
      </DialogContent>
    </Dialog>
  );
}

export default TeamDetailsDialog;
