import React from "react";

function Foot() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="bg-[url('/texture-pattern.svg')] p-4 text-center">
      &copy; {currentYear} E-Cell UVCE, Bengaluru | Most Rights Reserved
    </div>
  );
}

export default Foot;
