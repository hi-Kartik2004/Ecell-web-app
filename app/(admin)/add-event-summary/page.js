import Editor from "@/components/Editor";
import SummaryEditor from "@/components/SummaryEditor";
import React from "react";

function page() {
  return (
    <div className="mt-24">
      <SummaryEditor type="event-summary" />
    </div>
  );
}

export default page;
