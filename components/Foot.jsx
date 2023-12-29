import React from "react";
import data from "@/app/data";

function Foot() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="bg-card p-2 text-center">
      <span className="text-xs md:text-sm">
        &copy; {currentYear} {data?.footText}
      </span>
    </div>
  );
}

export default Foot;
