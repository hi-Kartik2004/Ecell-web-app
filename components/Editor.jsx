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
import { db } from "@/firebase/config";
import { useToast } from "./ui/use-toast";
import { Toaster } from "./ui/toaster";
import { Input } from "./ui/input";
import Link from "next/link";
import { Skeleton } from "./ui/skeleton";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/firebase/config";
import { Checkbox } from "./ui/checkbox";
import { FaSpinner } from "react-icons/fa";

export const dynamic = "force-dynamic";

export default function Editor({
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
  showRecording,
}) {
  const { isLoaded, user } = useUser();
  console.log(user);
  const { toast } = useToast();
  const [title, setTitle] = useState(blogTitle || "");
  const [description, setDescription] = useState(blogDescription || "");
  const [loading, setLoading] = useState(true);
  const [addingBlog, setAddingBlog] = useState(false);

  function filterEnglishMarkdown(markdownText) {
    // Regular expression to match images in Markdown
    const imageRegex = /!\[.*?\]\([^)]+\)/g;

    // Regular expression to match strikethrough in Markdown
    const strikethroughRegex = /~~(.*?)~~/g;

    // Regular expression to match HTML comments
    const commentsRegex = /<!--[\s\S]*?-->/g;

    // Replace images with an empty string
    let filteredText = markdownText.replace(imageRegex, "");

    // Replace strikethrough with its content
    filteredText = filteredText.replace(strikethroughRegex, (match, p1) => p1);

    // Remove HTML comments
    filteredText = filteredText.replace(commentsRegex, "");

    return filteredText;
  }

  async function getTextToSpeechRecording(blog) {
    const text = filterEnglishMarkdown(blog);
    const url =
      "https://voicerss-text-to-speech.p.rapidapi.com/?key=a34892ded86347c4b6726f1b1b5426db";
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": "05a1d027bcmsh4696fdb923bcd99p1b1584jsnc0eb4d43fc88",
        "X-RapidAPI-Host": "voicerss-text-to-speech.p.rapidapi.com",
      },
      body: new URLSearchParams({
        src: text,
        hl: "en-us",
        r: "0",
        c: "mp3",
        f: "8khz_8bit_mono",
        v: "Jai",
      }),
    };

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        toast({
          title: "Failed to fetch",
          description: `${response.status} - ${response.statusText}`,
        });

        throw new Error(
          `Failed to fetch: ${response.status} - ${response.statusText}`
        );
      }

      const result = await response.blob();
      return result;
    } catch (error) {
      console.error("Error fetching recording:", error);
      toast({
        title: "Unable to fetch the audio URL",
        description: "Our limit for today has exhausted, try again tomorrow!",
      });
      throw error;
    }
  }

  async function getTheDownloadUrlFromFirestore(sessionLabel = "addBlog") {
    const timestamp = new Date().getTime();
    const blog = sessionStorage.getItem(sessionLabel);
    const boilerSentence =
      "This is a blog by " +
      user.firstName +
      " " +
      "hosted on E-cell UVCE. Titled as";
    const recordingFile = await getTextToSpeechRecording(
      boilerSentence + " " + title + " " + description + ". " + blog
    );

    if (recordingFile.size === 0 || !recordingFile) {
      console.warn("File size is 0 bytes. Skipping upload.");
      return false;
    }

    const storageRef = ref(
      storage,
      `article-recordings/${recordingFile.name}_${timestamp}`
    );

    try {
      await uploadBytes(storageRef, recordingFile);
    } catch (uploadError) {
      console.error("Error uploading to Storage recording file:", uploadError);
      throw uploadError;
    }

    let downloadURL;
    try {
      downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
    } catch (downloadError) {
      console.error("Error getting Download URL:", downloadError);
      throw downloadError;
    }
  }

  async function addBlogToFirestore() {
    setAddingBlog(true);
    try {
      const collectionRef = collection(db, "blogs");
      const recordingUrl = await getTheDownloadUrlFromFirestore();
      const docSnap = await addDoc(collectionRef, {
        title: title || "No title provided",
        description: description || "No description provided",
        user: user.firstName + " " + user.lastName,
        email: user.emailAddresses[0].emailAddress,
        blog: sessionStorage.getItem("addBlog"),
        timestamp: Date.now(),
        views: 0,
        recordingUrl: { recordingUrl },
      });
      console.log("Blog added with ID: ", docSnap.id);
      toast({
        title: "Blog Added Successfully",
        description: `Your blog might take upto few minutes to go live, its id is ${docSnap.id}`,
      });
    } catch (e) {
      console.log(e);
      toast({
        title: "Adding Blog failed",
        description: `Please refer exisiting issue on our github repo with the following error: ${e}, or raise one yourself.`,
      });
    }

    setAddingBlog(false);
  }

  async function setBlogInFirestore() {
    setAddingBlog(true);
    const blogRef = doc(db, "blogs", blogId);
    const recordingUrl = await getTheDownloadUrlFromFirestore("editBlog");
    await updateDoc(blogRef, {
      title: title || "No title provided",
      description: description || "No description provided",
      blog: sessionStorage.getItem("editBlog"),
      user: user.firstName + " " + user.lastName,
      email: user.emailAddresses[0].emailAddress,
      timestamp: Date.now(),
      recordingUrl: { recordingUrl },
    });
    toast({
      title: "Blog Edited Successfully",
      description: `Your blog might take upto few minutes to go live, its id is ${blogId}`,
    });
    setAddingBlog(false);
  }

  useEffect(() => {
    !sessionStorage.getItem("addBlog") && sessionStorage.setItem("addBlog", "");
    blogCode && sessionStorage.setItem("editBlog", blogCode);
  }, []);

  // blogCode && sessionStorage.setItem("editBlog", blogCode);

  let storedValue = "<!-- Write your blog below -->";
  if (typeof window !== "undefined") {
    storedValue = sessionStorage.getItem("addBlog")
      ? sessionStorage.getItem("addBlog")
      : "";
  }

  const [value, setValue] = React.useState(
    gradient === "Edit"
      ? sessionStorage.getItem("editBlog")
      : storedValue || "<!-- Write your blog below -->"
  );

  useEffect(() => {
    gradient === "Edit"
      ? sessionStorage.setItem("editBlog", value)
      : sessionStorage.setItem("addBlog", value);
  }, [value]);

  useEffect(() => {
    blogCode && sessionStorage.setItem("editBlog", blogCode);
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
        <div>
          <h1 className="text-3xl font-bold">
            <span className="text-primary">{gradient || "Craft"}</span>{" "}
            {sectionTitle ||
              `your ${
                type === "event-summary" ? "event Summary " : " blog "
              } for the community!`}
          </h1>
        </div>

        <div className="flex gap-4 flex-wrap">
          <Button variant="outline">
            <Link href="/manage-blogs">Manage Articles</Link>
          </Button>
          {value.length > 75 ? (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <div className="flex gap-4 items-center">
                  <Button
                    disabled={addingBlog}
                    className={`${addingBlog && "pointer-events-none"}`}
                  >
                    {addingBlog ? (
                      <div className=" animate-spin">
                        <FaSpinner />
                      </div>
                    ) : (
                      buttonText || `Publish Blog as ${user.firstName}`
                    )}
                  </Button>
                </div>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    The blog once published will be public to everyone, and can
                    be accessed other members, we will enbale text to speech
                    functionality for your cool blog 😎
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
                    </div>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  {buttonType == "edit" ? (
                    <AlertDialogAction
                      onClick={setBlogInFirestore}
                      disabled={title.length < 10 || addingBlog}
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
