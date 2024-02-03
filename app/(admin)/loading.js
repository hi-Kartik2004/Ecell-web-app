import Loader from "@/components/Loader";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

function loading() {
  return (
    <div className="container min-h-[60vh] flex items-center justify-center">
      <Loader />
    </div>
  );
}

export default loading;
