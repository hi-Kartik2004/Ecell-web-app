"use client";
import React, { useState } from "react";
import { BiCheckCircle, BiCopy } from "react-icons/bi";

function QrCodeComponent({ upiId, qrCodeImg }) {
  const [correctIcon, setCorrectIcon] = useState(false);
  setTimeout(() => {
    setCorrectIcon(false);
    clearTimeout();
  }, 1000);

  return (
    <div>
      <div className="px-4 py-2 rounded-lg border mb-4 bg-muted shadow shadow-primary/50 flex gap-4 justify-around flex-wrap items-center">
        <p>9901848766@ybl</p>
        {/* Copy button */}
        <div
          onClick={() => {
            setCorrectIcon(true);
            navigator.clipboard.writeText("9901848766@ybl");
          }}
          className=""
        >
          {correctIcon ? (
            <BiCheckCircle size={20} className="text-primary" />
          ) : (
            <BiCopy size={20} className="text-primary" />
          )}
        </div>
      </div>
      <div className="p-4 rounded-lg bg-muted border">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6x-ZkJK5Os7Y5HmpPsCOStJDS6EjGrdbC4eKcpaCiiQ&s"
          alt="qr-code"
        />
      </div>
    </div>
  );
}

export default QrCodeComponent;
