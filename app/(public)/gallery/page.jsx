"use client";
import React, { useState, useEffect } from "react";
import FooterSection from "../../(sections)/FooterSection";
import { Separator } from "@/components/ui/separator";
import data from "@/app/data";
import Loader from "@/components/Loader";

const images = [
  "https://placekitten.com/600/400",
  "https://placekitten.com/400/300",
  "https://placekitten.com/600/400",
  "https://placekitten.com/400/300",
  "https://placekitten.com/800/600",
  "https://placekitten.com/800/600",
  "https://placekitten.com/600/400",
  "https://placekitten.com/400/300",
  "https://placekitten.com/600/400",
  "https://placekitten.com/400/300",
];

const Page = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  const openModal = (index) => {
    setSelectedImage(images[index]);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      closeModal();
    }
  };


  if (loading) {
    return (
      <div className="min-h-[100vh] flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <main className=" dark:bg-[url('/texture-pattern.svg')] bg-[url('/texture-pattern-light.svg')]">
      <div className={`mx-auto p-4 container flex flex-col items-center`}>
        <br />
        <br />
        <br />
        <div className="max-w-[800px]">
          <h1 className={`text-3xl font-bold mb-4 text-center`}>
            E Cell <span className="text-primary">{data.galleryPageTitle}</span>
          </h1>
          <p className=" text-center text-muted-foreground">
            {data.galleryPageDescription}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {images.map((image, index) => (
            <div
              key={index}
              className={`relative overflow-hidden transition-transform transform hover:scale-105 duration-300 ease-in-out cursor-pointer border-2 border-yellow-500 rounded-md`}
              onClick={() => openModal(index)}
            >
              <img
                src={image}
                alt={`Image ${index + 1}`}
                className="w-full h-full object-cover transition-transform transform-gpu rounded"
              />
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedImage && (
          <div
            className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-75 modal-overlay"
            onClick={handleOverlayClick}
          >
            <div className="max-w-screen-lg w-full mx-auto p-4 relative">
              <img
                src={selectedImage}
                alt="Selected Image"
                className="w-full h-full object-contain md:object-cover rounded"
              />
              <button
                onClick={closeModal}
                className={`absolute top-4 right-4  cursor-pointer bg-muted px-2 py-1 rounded`}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
      <Separator />
    </main>
  );
};

export default Page;
