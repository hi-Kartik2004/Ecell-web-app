import React from "react";

function Foot() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="dark:bg-[url('/texture-pattern.svg')] bg-[url('/texture-pattern-light.svg')] p-2 text-center">
      <span className="text-sm">&copy; {currentYear} E-Cell UVCE, Bengaluru | Most Rights Reserved</span>
    </div>
  );
}

export default Foot;
