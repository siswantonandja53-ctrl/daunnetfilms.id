/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState, Suspense } from "react";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
    SortingState,
    ColumnFiltersState,
    VisibilityState,
} from "@tanstack/react-table";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from '@/components/ui/skeleton';

const SkeletonDataTable: React.FC = () => {
    return (
        <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-6 w-1/4" />
        </div>
    );
};

interface DataTableProps {
    data: any[];
}

const DataTable: React.FC<DataTableProps> = ({ data }) => {
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [sorting, setSorting] = useState<SortingState>([
        { id: "createdAt", desc: true }
    ]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

    const columns: ColumnDef<any>[] = [
        {
            accessorKey: 'id',
            header: () => 'ID',
            cell: info => info.getValue(),
        },
        {
            accessorKey: 'amount',
            header: () => 'Amount',
            cell: info => {
                const value = info.getValue() as number; // Cast to number
                const formattedValue = new Intl.NumberFormat('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                }).format(value);
                return formattedValue;
            },
        },
        {
            accessorKey: 'status',
            header: () => 'Status',
            cell: info => info.getValue(),
        },
        {
            accessorKey: 'createdAt',
            header: () => 'Created At',
            cell: info => {
                const value = info.getValue() as Date;
                const date = new Date(value);
                if (isNaN(date.getTime())) {
                    return 'Invalid date'; // Return a default value if the date is invalid
                }
                const formattedDate = new Intl.DateTimeFormat('id-ID', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                }).format(date);
                return formattedDate;
            },
        },
        {
            accessorKey: 'orderItems',
            header: () => 'Order Items',
            cell: info => {
                const items = info.getValue() as any;
                return (
                    <ul>
                        {items.map((item: any) => (
                            <li key={item.id}>
                                {item.quantity} x {item.productSlug} @ {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(item.price)}
                            </li>
                        ))}
                    </ul>
                );
            },
        },
    ];

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            columnFilters,
            pagination,
            columnVisibility,
        },
        onColumnVisibilityChange: setColumnVisibility,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    function toggleColumnVisibility(column: any, value: boolean) {
        column.toggleVisibility(value);
    }

    return (
        <div className="w-full">
            <div className="flex items-center pb-4">
                <Suspense fallback={<SkeletonDataTable />}>
                    <div className="flex gap-2 w-1/2">
                        <Input
                            placeholder="Filter Order Items Name..."
                            onChange={(event) => {
                                const value = event.target.value;
                                setColumnFilters((old) =>
                                    old
                                        .filter((filter) => filter.id !== "orderItems") // Remove the existing filter
                                        .concat(value ? [{ id: "orderItems", value }] : []) // Add the new filter if value is not empty
                                );
                            }}
                            className="max-w-sm"
                        />
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button  className="ml-auto bg-mooi-orange hover:bg-mooi-pink2 text-semi-white hover:text-semi-white">
                                Filter Column
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {table
                                .getAllColumns()
                                .filter(
                                    (column) => column.getCanHide()
                                )
                                .map((column) => {
                                    return (
                                        <DropdownMenuCheckboxItem
                                            key={column.id}
                                            className="capitalize bg-transparent data-[state=checked]:bg-mooi-pink/10 data-[state=checked]:text-mooi-orange my-1 hover:bg-mooi-pink hover:text-mooi-orange"
                                            checked={column.getIsVisible()}
                                            onCheckedChange={(value) =>
                                                toggleColumnVisibility(column, !!value)
                                            }
                                        >
                                            {column.id}
                                        </DropdownMenuCheckboxItem>
                                    )
                                })}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </Suspense>
            </div>
            <Suspense fallback={<SkeletonDataTable />}>
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id} className="bg-semi-white text-primary1 hover:bg-primary1/10">
                                    {headerGroup.headers.map((header) => (
                                        <TableHead key={header.id}>
                                            {flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </Suspense>
            <div className="flex items-center justify-between space-x-2 py-4">
                <Button

                    className="bg-mooi-orange hover:bg-mooi-pink2 text-semi-white hover:text-semi-white"        
                    
                    size="sm"
                    onClick={() => setPagination((old) => ({ ...old, pageIndex: old.pageIndex - 1 }))}
                    disabled={!table.getCanPreviousPage()}
                >
                    Previous
                </Button>
                <span>
                    Page{' '}
                    <strong>
                        {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                    </strong>{' '}
                </span>
                <Button
                    className="bg-mooi-orange hover:bg-mooi-pink2 text-semi-white hover:text-semi-white"
                    
                    size="sm"
                    onClick={() => setPagination((old) => ({ ...old, pageIndex: old.pageIndex + 1 }))}
                    disabled={!table.getCanNextPage()}
                >
                    Next
                </Button>
            </div>
        </div>
    );
};

export default DataTable;