"use client";
import React, { useEffect, useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db, storage } from "@/firebase/config";
import { useToast } from "./ui/use-toast";
import { Toaster } from "./ui/toaster";
import { Input } from "./ui/input";
import Link from "next/link";
import { Skeleton } from "./ui/skeleton";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const dynamic = "force-dynamic";

export default function SummaryEditor({
  showProfile,
  gradient,
  sectionTitle,
  buttonText,
  buttonType,
  blogId,
  blogCode,
  blogTitle,
  blogDescription,
  type,
}) {
  const { isLoaded, user } = useUser();
  console.log(user);
  const { toast } = useToast();
  const [title, setTitle] = useState(blogTitle || "");
  const [description, setDescription] = useState(blogDescription || "");
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState(null);

  async function uploadImage(imageFile) {
    const timestamp = new Date().getTime();
    const storageRef = ref(
      storage,
      `event-summary-images/${imageFile.name}_${timestamp}`
    );

    try {
      await uploadBytes(storageRef, imageFile);
      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
    } catch (error) {
      console.error("Error uploading image:", error);
      toast({
        title: "Image Upload Failed",
        description: `Could not upload the image: ${error.message}`,
      });
      throw error;
    }
  }

  async function addBlogToFirestore() {
    try {
      const collectionRef = collection(db, "event-summaries");
      const imageUrl = image ? await uploadImage(image) : null;
      const docSnap = await addDoc(collectionRef, {
        title: title || "No title provided",
        description: description || "No description provided",
        user: user.emailAddresses[0].emailAddress,
        blog: sessionStorage.getItem("event-summary"),
        timestamp: Date.now(),
        views: 0,
        imageUrl: imageUrl,
      });
      console.log("Blog added with ID: ", docSnap.id);
      toast({
        title: "Event Summary Added Successfully",
        description: `Your event summary might take up to a few minutes to go live, its id is ${docSnap.id}`,
      });
    } catch (e) {
      console.log(e);
      toast({
        title: "Adding Blog failed",
        description: `Please refer to the existing issue on our GitHub repo with the following error: ${e}, or raise one yourself.`,
      });
    }
  }

  async function setBlogInFirestore() {
    const blogRef = doc(db, "event-summaries", blogId);
    const imageUrl = image ? await uploadImage(image) : null;
    await updateDoc(blogRef, {
      title: title || "No title provided",
      description: description || "No description provided",
      blog: sessionStorage.getItem("edit-event-summary"),
      timestamp: Date.now(),
      imageUrl: imageUrl,
    });
    toast({
      title: "Blog Edited Successfully",
      description: `Your blog might take up to a few minutes to go live, its id is ${blogId}`,
    });
  }

  useEffect(() => {
    !sessionStorage.getItem("event-summary") &&
      sessionStorage.setItem("event-summary", "");
    blogCode && sessionStorage.setItem("edit-event-summary", blogCode);
  }, []);

  let storedValue = "<!-- Write your blog below -->";
  if (typeof window !== "undefined") {
    storedValue = sessionStorage.getItem("event-summary")
      ? sessionStorage.getItem("event-summary")
      : "";
  }

  const [value, setValue] = React.useState(
    gradient === "Edit"
      ? sessionStorage.getItem("edit-event-summary")
      : storedValue || "<!-- Write your blog below -->"
  );

  useEffect(() => {
    gradient === "Edit"
      ? sessionStorage.setItem("edit-event-summary", value)
      : sessionStorage.setItem("event-summary", value);
  }, [value]);

  useEffect(() => {
    blogCode && sessionStorage.setItem("edit-event-summary", blogCode);
    setLoading(false);
  }, []);

  if (!isLoaded) {
    return null;
  }

  if (loading) {
    return (
      <div className="container">
        <Skeleton className="w-full h-[100px] my-2" />
        <Skeleton className="w-full h-[90vh]" />
      </div>
    );
  }

  return (
    <div className="container my-6 min-h-full">
      <Toaster />
      <div className="flex flex-wrap gap-6 justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          <span className="text-primary">{gradient || "Craft"}</span>{" "}
          {sectionTitle ||
            `your ${
              type === "event-summary" ? "event Summary " : " blog "
            } for the community!`}
        </h1>
        <div className="flex gap-4 flex-wrap">
          <Button variant="outline">
            <Link href="/manage-event-summaries">Manage Event Summaries</Link>
          </Button>
          {value.length > 75 ? (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <div className="flex gap-4 items-center">
                  <Button>
                    {buttonText || `Publish Event Summary as ${user.firstName}`}{" "}
                  </Button>
                </div>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    The blog once published will be public to everyone, and can
                    be accessed by anyone.
                    <div className="flex flex-col flex-wrap gap-4 mt-4">
                      <Input
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                      <Input
                        placeholder="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                      />
                    </div>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  {buttonType == "edit" ? (
                    <AlertDialogAction
                      onClick={setBlogInFirestore}
                      disabled={title.length < 10}
                    >
                      Publish Edited blog
                    </AlertDialogAction>
                  ) : (
                    <AlertDialogAction
                      onClick={addBlogToFirestore}
                      disabled={title.length < 10}
                    >
                      Continue
                    </AlertDialogAction>
                  )}
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          ) : (
            <Button variant="secondary">Very little content</Button>
          )}
        </div>
      </div>

      <MDEditor
        value={value}
        onChange={setValue}
        previewOptions={{
          rehypePlugins: [[rehypeSanitize]],
        }}
        className="min-h-[95vh]"
      />
    </div>
  );
}
