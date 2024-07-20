"use client";
import React, { useState } from "react";
import { BiCheckCircle, BiCopy } from "react-icons/bi";
import globalData from "@/app/data";

function QrCodeComponent({ upiId, qrCodeImg }) {
  const [correctIcon, setCorrectIcon] = useState(false);
  setTimeout(() => {
    setCorrectIcon(false);
    clearTimeout();
  }, 1000);

  return (
    <div>
      <div className="p-2 rounded-lg border mb-4 bg-muted shadow shadow-primary/50 flex gap-4 justify-around flex-wrap items-center">
        <p>{globalData?.paymentUpiId}</p>
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
      <div className="p-4 rounded-lg bg-muted border flex justify-center items-center">
        <img
          src={globalData?.paymentQrCode}
          alt="qr-code"
          className="max-w-[250px] rounded flex-grow-0"
        />
      </div>
    </div>
  );
}

export default QrCodeComponent;
