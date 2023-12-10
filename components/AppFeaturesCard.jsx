import React from "react";

function AppFeaturesCard() {
  return (
    <div>
      <div className="flex flex-col items-center mt-6">
        <div>
          <h3 className="text-lg font-semibold">
            1. Lorem ipsum dolor sit amet consectetur.
          </h3>
          <p className="mt-1 text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat
            alias aliquam consequatur.
          </p>
        </div>
        <div className="w-full flex justify-center">
          <div className="max-w-[400px] max-h-[400px]">
            <img
              src="https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="logo"
              className="rounded-lg shadow-lg mt-4 object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppFeaturesCard;
