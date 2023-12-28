import React from "react";
import { DataTable } from "@/components/DataTable";
import { DataTableDemo } from "@/components/RegTable";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase/config";

async function page() {
  let data = [];
  try {
    const eventCollection = collection(db, "registrations");
    const q = query(eventCollection, orderBy("timestamp", "asc"));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log("No matching documents.");
      throw new Error("No events found in the database");
    }

    // Fix: Add a return statement in the map function
    data = querySnapshot.docs.map((doc) => {
      return doc.data();
    });

    console.log(data);
  } catch (error) {
    console.error(error);
  }

  //   const data = await getData();
  return (
    <section>
      <div className="container flex flex-col items-center justify-center mt-24 w-full">
        <div className="max-w-[800px] w-full">
          <h1 className="text-center text-3xl font-semibold">Registrations</h1>
          <p className="text-center text-muted-foreground mt-2">
            lorem ipsum dor sit ipem lorem ipsum dor sit ipem
          </p>
        </div>
        <div className="w-full max-w-[1200px]">
          <div className="container mx-auto py-10 w-full">
            <DataTableDemo data={data} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default page;
