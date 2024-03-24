"use client";
import data from "@/app/data";
import { ParallaxScroll } from "@/components/ParallaxScroll";

export default function Gallery() {
  return (
    <div className="container mt-24">
      <div className="flex justify-center flex-col items-center mb-4">
        <h1 className="text-3xl text-center font-bold">
          {data?.galleryPageTitle}
        </h1>
        <p className="text-muted-foreground text-center mt-2">
          {data?.galleryPageDescription}
        </p>
      </div>
      <ParallaxScroll images={images} />{" "}
    </div>
  );
}

const images = [
  "https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
  "https://images.unsplash.com/photo-1505144808419-1957a94ca61e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3070&q=80",
  "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
  "https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
  "https://images.unsplash.com/photo-1505144808419-1957a94ca61e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3070&q=80",
  "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
  "https://images.unsplash.com/photo-1682686581854-5e71f58e7e3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
  "https://images.unsplash.com/photo-1510784722466-f2aa9c52fff6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
  "https://images.unsplash.com/photo-1505765050516-f72dcac9c60e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
  "https://images.unsplash.com/photo-1439853949127-fa647821eba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2640&q=80",
  "https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
  "https://images.unsplash.com/photo-1505144808419-1957a94ca61e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3070&q=80",
  "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
  "https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
  "https://images.unsplash.com/photo-1505144808419-1957a94ca61e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3070&q=80",
  "https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
  "https://images.unsplash.com/photo-1505144808419-1957a94ca61e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3070&q=80",
  "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
  "https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
  "https://images.unsplash.com/photo-1505144808419-1957a94ca61e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3070&q=80",
  "https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
  "https://images.unsplash.com/photo-1505144808419-1957a94ca61e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3070&q=80",
  "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
  "https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
  "https://images.unsplash.com/photo-1505144808419-1957a94ca61e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3070&q=80",
];

// "use client";
// import React, { useState, useEffect } from "react";
// import FooterSection from "../../(sections)/FooterSection";
// import { Separator } from "@/components/ui/separator";
// import data from "@/app/data";
// import Loader from "@/components/Loader";

// const images = [
//   "https://placekitten.com/600/400",
//   "https://placekitten.com/400/300",
//   "https://placekitten.com/600/400",
//   "https://placekitten.com/400/300",
//   "https://placekitten.com/800/600",
//   "https://placekitten.com/800/600",
//   "https://placekitten.com/600/400",
//   "https://placekitten.com/400/300",
//   "https://placekitten.com/600/400",
//   "https://placekitten.com/400/300",
// ];

// const Page = () => {
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [darkMode, setDarkMode] = useState(false);

//   const [loading, setLoading] = useState(true);
//   useEffect(() => {
//     setLoading(false);
//   }, []);

//   const openModal = (index) => {
//     setSelectedImage(images[index]);
//   };

//   const closeModal = () => {
//     setSelectedImage(null);
//   };

//   const handleOverlayClick = (e) => {
//     if (e.target.classList.contains("modal-overlay")) {
//       closeModal();
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-[100vh] flex items-center justify-center">
//         <Loader />
//       </div>
//     );
//   }

//   return (
//     <main className=" dark:bg-[url('/texture-pattern.svg')] bg-[url('/texture-pattern-light.svg')]">
//       <div className={`mx-auto p-4 container flex flex-col items-center`}>
//         <br />
//         <br />
//         <br />
//         <div className="max-w-[800px]">
//           <h1 className={`text-3xl font-bold mb-4 text-center`}>
//             E Cell <span className="text-primary">{data.galleryPageTitle}</span>
//           </h1>
//           <p className=" text-center text-muted-foreground">
//             {data.galleryPageDescription}
//           </p>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
//           {images.map((image, index) => (
//             <div
//               key={index}
//               className={`relative overflow-hidden transition-transform transform hover:scale-105 duration-300 ease-in-out cursor-pointer border-2 border-yellow-500 rounded-md`}
//               onClick={() => openModal(index)}
//             >
//               <img
//                 src={image}
//                 alt={`Image ${index + 1}`}
//                 className="w-full h-full object-cover transition-transform transform-gpu rounded"
//               />
//             </div>
//           ))}
//         </div>

//         {/* Modal */}
//         {selectedImage && (
//           <div
//             className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-75 modal-overlay"
//             onClick={handleOverlayClick}
//           >
//             <div className="max-w-screen-lg w-full mx-auto p-4 relative">
//               <img
//                 src={selectedImage}
//                 alt="Selected Image"
//                 className="w-full h-full object-contain md:object-cover rounded"
//               />
//               <button
//                 onClick={closeModal}
//                 className={`absolute top-4 right-4  cursor-pointer bg-muted px-2 py-1 rounded`}
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//       <Separator />
//     </main>
//   );
// };

// export default Page;
