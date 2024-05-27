"use client";

import React, { useState } from "react";
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
import { Checkbox } from "@/components/ui/checkbox";
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
import TeamDetailsDialog from "./TeamDetailsDialog";
import Link from "next/link";
const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  // {
  //   accessorKey: "eventId",
  //   header: "Event ID",
  //   cell: ({ row }) => <div>{row.getValue("eventId")}</div>,
  // },
  {
    accessorKey: "name",
    header: "Event Name",
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "teamName",
    header: "Team Name",
    cell: ({ row }) => <div>{row.getValue("teamName")}</div>,
  },
  {
    accessorKey: "leaderName",
    header: "Leader Name",
    cell: ({ row }) => <div>{row.getValue("leaderName")}</div>,
  },
  {
    accessorKey: "leaderEmail",
    header: "Leader Email",
    cell: ({ row }) => (
      <Link href={"mailto:" + row.getValue("leaderEmail")}>
        {row.getValue("leaderEmail")}
      </Link>
    ),
  },
  {
    accessorKey: "paymentId",
    header: "Payment Id",
    cell: ({ row }) => (
      <Link href={row.getValue("paymentId")}>
        {row.getValue("paymentId") || "Free event"}
      </Link>
    ),
  },
  {
    accessorKey: "timestamp",
    header: "Registered at",
    cell: ({ row }) => (
      <div>
        {" "}
        {new Date(row.getValue("timestamp"))
          .toLocaleString("en-IN")
          .slice(0, 19)
          .replace("T", " ")}
      </div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const paymentId = row.original.paymentId;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <TeamDetailsDialog data={row.original} />

            <DropdownMenuItem onClick={() => showPaymentDetails(row.original)}>
              Show Payment Details
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => copyPaymentId(paymentId)}>
              Copy Payment ID
            </DropdownMenuItem>
            <DropdownMenuItem>
              {new Date(row.original.timestamp)
                .toISOString()
                .slice(0, 19)
                .replace("T", " ")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

const showMembersDetails = (data) => {
  // Implement logic to show members details in a modal
  console.log("Show Members Details:", data);
};

const showPaymentDetails = (data) => {
  // Implement logic to show payment details in a modal
  console.log("Show Payment Details:", data.paymentDetails);
};

const copyPaymentId = (paymentId) => {
  // Implement logic to copy payment ID to clipboard
  console.log("Copy Payment ID:", paymentId);
};

export function DataTableDemo({ data }) {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});

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

  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-2 items-center py-4">
        <div className="flex gap-4 flex-wrap w-full">
          <Input
            placeholder="Filter by event name..."
            value={table.getColumn("name")?.getFilterValue() || ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="max-w-xs"
          />

          <Input
            placeholder="Filter by team names..."
            value={table.getColumn("teamName")?.getFilterValue() || ""}
            onChange={(event) =>
              table.getColumn("teamName")?.setFilterValue(event.target.value)
            }
            className="max-w-xs"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
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
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
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
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
