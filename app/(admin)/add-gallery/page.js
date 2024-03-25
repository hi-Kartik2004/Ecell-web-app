"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db, storage } from "@/firebase/config";
import { toast } from "@/components/ui/use-toast";
import data from "@/app/data";
import { Toaster } from "@/components/ui/toaster";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";

function AddGallery() {
  const [photo, setPhoto] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (!photo) {
      console.error("Please select a photo");
      return;
    }

    const formData = new FormData(e.target);
    const timestamp = new Date().getTime();

    try {
      const imageFile = formData.get("image");

      if (photo.size === 0) {
        console.warn("File size is 0 bytes. Skipping upload.");
        return false;
      }

      const storageRef = ref(storage, `gallery/${photo.name}_${timestamp}`);

      await uploadBytes(storageRef, photo);

      const downloadURL = await getDownloadURL(storageRef);

      const docData = {
        name: formData.get("name"),
        image: downloadURL,
        timestamp: new Date(),
      };

      const galleryRef = collection(db, "gallery");

      await addDoc(galleryRef, docData);

      toast({
        title: "Added photo to gallery",
        description: "It might take up to a minute to show up!",
      });

      // Reset form and state
      e.target.reset();
      setPhoto(null);
    } catch (error) {
      console.error("Error in Firestore operation:", error);
      toast({
        title: "Failed to Add photo to gallery",
        description: error.message,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mt-24">
      <Toaster />
      <div className="flex justify-center flex-col items-center">
        <h1 className="text-3xl text-center font-bold">
          {data?.addGalleryPageHeading}
        </h1>
        <p className="text-muted-foreground text-center mt-2">
          {data?.addGalleryPageDescription}
        </p>
      </div>

      <div className="flex justify-center mb-10">
        <form
          className="max-w-[600px] mt-10 hover:shadow-lg hover:shadow-primary/50 flex flex-col gap-4 p-4 border rounded-lg"
          onSubmit={handleFormSubmit}
        >
          <h2 className="text-2xl text-center">Add Photo form</h2>
          <Input
            type="text"
            name="name"
            placeholder="Enter heading"
            required={true}
          />
          <Input
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            required={true}
            name="image"
          />
          <Button type="submit" disabled={submitting}>
            {submitting ? "Submitting..." : "Add Photo to Gallery"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default AddGallery;
