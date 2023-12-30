import React from "react";
import { AiOutlineLoading } from "react-icons/ai";

function Loader() {
  return (
    <div>
      <div className="flex flex-col gap-2 mt-16 items-center">
        {/* <div className="animate-spin"> */}
        <AiOutlineLoading size={35} className="animate-spin" />
        {/* </div> */}

        <p className="mt-4 text-md">Loading...</p>
      </div>
    </div>
  );
}

export default Loader;
