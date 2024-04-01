"use client";

// Import necessary components and functions
import React from "react";
import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { db } from "@/firebase/config";
import {
  collection,
  query,
  orderBy,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  addDoc,
  where,
} from "firebase/firestore";

import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { useUser } from "@clerk/nextjs";
var axios = require("axios");

// Define function to convert timestamp to IST date
const convertToISTDate = (timestamp) => {
  const dateObj = new Date(timestamp);
  // Set input date object to UTC time zone
  dateObj.setUTCHours(0, 0, 0, 0);
  const ISTOffset = 330; // Offset in minutes for IST
  const ISTTimestamp = dateObj.getTime() + ISTOffset * 60 * 1000;
  const ISTDate = new Date(ISTTimestamp);
  return ISTDate.toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata" });
};

// Define columns for the table

// Define the PoojaRegistrationsTable component
export function TransactionsTable() {
  //   const { isLoaded, user } = useUser();
  //   if (!isLoaded || !user) return null;
  const [data, setData] = React.useState([]);
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});

  const columns = [
    {
      accessorKey: "senderUPI",
      header: "Sender UPI",
    },
    {
      accessorKey: "transactionId",
      header: "TransactionID",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "phone",
      header: "Phone",
    },
    {
      accessorKey: "timestamp",
      header: "timstamp",
      cell: ({ row }) => (
        <div>{row.getValue("timestamp").toDate().toLocaleDateString()}</div>
      ),
    },
    {
      accessorKey: "status",
      header: "status",
    },

    {
      accessorKey: "transactionScreenshot",
      header: "Screenshot",
      cell: ({ row }) => (
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm" variant="secondary">
              View
            </Button>
          </DialogTrigger>
          <DialogContent>
            <div className="p-4">
              <div className="bg-muted">
                <img
                  src={row.getValue("transactionScreenshot")}
                  alt={`screenshot-for-transaction-${row.getValue("name")}`}
                  className="bg-muted h-[350px]"
                />
              </div>
            </div>
          </DialogContent>
        </Dialog>
      ),
    },
    {
      accessorKey: "Approve",
      header: "Approve",
      cell: ({ row }) => (
        <Button size="sm" onClick={() => handleApprove(row)}>
          Approve
        </Button>
      ),
    },
    {
      accessorKey: "actions",
      header: "Reject",
      cell: ({ row }) => (
        <Button
          size="sm"
          onClick={() => handleDelete(row)}
          variant="destructive"
        >
          Delete
        </Button>
      ),
    },
  ];

  async function addMemberToFirebase(email) {
    const membersRef = collection(db, "members");
    const member = {
      email: email,
      isMember: true,
      isAdmin: false,
      timestamp: new Date(),
    };
    // check if the person with same email has already registered
    const checker = await getDocs(
      query(membersRef, where("email", "==", email))
    );

    if (checker.docs.length > 0) {
      await updateDoc(checker.docs[0].ref, member);

      alert("Membership renewed");

      return;
    }

    try {
      await addDoc(membersRef, member);
      console.log("Document written with ID: ", member.email);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }

  const handleApprove = async (row) => {
    try {
      // add the user email with the isMember as true to mongo db
      try {
        await addMemberToFirebase(row.original.email);
      } catch (err) {
        alert(err);
        return;
      }

      await updateDoc(doc(db, "transactions", row.original.docId), {
        status: "approved",
      });

      // Update table data record status to approved
      setData((prevData) =>
        prevData.map((item) =>
          item.docId === row.original.docId
            ? { ...item, status: "approved" }
            : item
        )
      );
      alert("Transaction Approved");
    } catch (error) {
      console.error("Error approving record:", error);
    }
  };

  const handleDelete = async (row) => {
    try {
      await deleteDoc(doc(db, "transactions", row.original.docId));
      // Update table data to remove the deleted record
      setData((prevData) =>
        prevData.filter((item) => item.docId !== row.original.docId)
      );
    } catch (error) {
      console.error("Error deleting record:", error);
    }
  };

  // Fetch data from Firestore on component mount
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const ref = collection(db, "transactions");
        const querySnapshot = await getDocs(
          query(ref, orderBy("timestamp", "desc"))
        );
        const fetchedData = querySnapshot.docs.map((doc) => ({
          docId: doc.id,
          ...doc.data(),
        }));
        setData(fetchedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Define table using useReactTable hook
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  // Return JSX for rendering the table
  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <div className="flex gap-4 items-center justify-between flex-wrap w-full">
          <div className="flex gap-4 items-center flex-wrap max-w-[800px]">
            <Input
              placeholder="Filter emails..."
              value={table.getColumn("email")?.getFilterValue() ?? ""}
              onChange={(event) =>
                table.getColumn("email")?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
            <Input
              placeholder="Filter by transaction id's"
              value={table.getColumn("transactionId")?.getFilterValue() ?? ""}
              onChange={(event) =>
                table
                  .getColumn("transactionId")
                  ?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
          </div>

          <div className="flex flex-col justify-center items-start gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="md:ml-auto">
                  Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>

            <Input
              placeholder="Filter by status..."
              value={table.getColumn("status")?.getFilterValue() ?? ""}
              onChange={(event) =>
                table.getColumn("status")?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
          </div>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {cell.column.accessorKey === "timestamp" ||
                      cell.column.accessorKey === "courseExpires" ? (
                        <div>{convertToISTDate(cell.value)}</div>
                      ) : (
                        flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
      </div>
    </div>
  );
}

export default TransactionsTable;
