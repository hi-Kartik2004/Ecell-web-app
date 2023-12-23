'use client'
import React, { useState } from 'react';
import FooterSection from '../(sections)/FooterSection';
import { Separator } from "@/components/ui/separator";

const images = [
    'https://placekitten.com/600/400',
    'https://placekitten.com/400/300',
    'https://placekitten.com/600/400',
    'https://placekitten.com/400/300',
    'https://placekitten.com/800/600',
    'https://placekitten.com/800/600',
    'https://placekitten.com/600/400',
    'https://placekitten.com/400/300',
    'https://placekitten.com/600/400',
    'https://placekitten.com/400/300',
];

const Page = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [darkMode, setDarkMode] = useState(false);

    const openModal = (index) => {
        setSelectedImage(images[index]);
    };

    const closeModal = () => {
        setSelectedImage(null);
    };

    const handleOverlayClick = (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            closeModal();
        }
    };

    return (
        <main>

            <div className={`container mx-auto p-4 dark:bg-[url('/texture-pattern.svg')] bg-[url('/texture-pattern-light.svg')]`}>
                <br />
                <br />
                <br />
                <h1 className={`text-3xl font-bold mb-4 text-white`}>E Cell <span className="text-primary">Gallery</span></h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                                className={`absolute top-4 right-4 text-white cursor-pointer ${darkMode ? 'bg-gray-800' : 'bg-gray-200'} px-2 py-1 rounded`}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <Separator />
            <br />
            <FooterSection />
        </main>
    );
};

export default Page;
