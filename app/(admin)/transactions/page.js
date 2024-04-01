import TransactionsTable from "@/components/TransactionsTable";
import { Separator } from "@/components/ui/separator";
import React from "react";

function Transactions() {
  return (
    <div className="mt-20">
      <div className="flex justify-between gap-10 relative">
        <div className="w-full container mt-4 max-w-[1200px] ">
          <div>
            <h1 className="text-2xl font-semibold">Transactions</h1>
            <p className="text-muted-foreground">
              {" "}
              View and approve all transaction details here.
            </p>
          </div>

          <Separator className="my-4" />

          <TransactionsTable />

          <div></div>
        </div>
      </div>
    </div>
  );
}

export default Transactions;
