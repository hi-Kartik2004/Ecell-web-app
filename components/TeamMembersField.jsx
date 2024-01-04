"use client";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "@radix-ui/react-context-menu";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useRef } from "react";

// const formSchema = z.object({
//   teamName: z.string().min(2, "Team Name must be at least 2 characters."),
//   leaderName: z.string().min(2, "Leader Name must be at least 2 characters."),
//   leaderYear: z.coerce
//     .number()
//     .min(1, "Leader Year must be at least 1.")
//     .max(5, "Leader Year must be at most 5."),
//   leaderBranch: z
//     .string()
//     .min(2, "Leader Branch must be at least 2 characters."),
//   leaderEmail: z.string().email("Invalid Email."),
//   leaderPhone: z.coerce.number().min(1000000000, "Invalid Phone Number."),
//   comments: z.optional(z.string()),
// });

function TeamMembersField({ member, index, remove }) {
  const ref = useRef(null);

  return (
    <div className="flex flex-col gap-8" ref={ref}>
      <FormField
        control={member.control}
        name={`teamMembers.${index}.memberName`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Member Name*</FormLabel>
            <FormControl>
              <Input placeholder="Member's name" {...field} />
            </FormControl>
            <FormDescription>Keep it innovative and short.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={member.control}
        name={`teamMembers.${index}.memberYear`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Member's Academic Year*</FormLabel>
            <FormControl>
              <Input placeholder="Member's Year" {...field} />
            </FormControl>
            <FormDescription>
              Eg: 1 for first year, 2 for second ... 5 for M.tech
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={member.control}
        name={`teamMembers.${index}.memberBranch`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Member's Branch*</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormDescription>
              The branch in which this member is currently studying.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={member.control}
        name={`teamMembers.${index}.memberEmail`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Member's Email*</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormDescription>
              This would be your member's contact email.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={member.control}
        name={`teamMembers.${index}.memberPhone`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Member's Phone*</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormDescription>
              Member's primary contact phone Number (without +91)
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

export default TeamMembersField;
