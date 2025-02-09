import React from 'react'
import { Income } from '../models/Income'
import {
   ColumnDef,
   ColumnFiltersState,
   RowData,
   getCoreRowModel,
   getFacetedMinMaxValues,
   getFacetedRowModel,
   getFacetedUniqueValues,
   getFilteredRowModel,
   getPaginationRowModel,
   getSortedRowModel,
   useReactTable,
} from '@tanstack/react-table'
import Table from './Table'
import RowActions from './RowActions'


declare module '@tanstack/react-table' {
   //allows us to define custom properties for our columns
   interface ColumnMeta<TData extends RowData, TValue> {
      filterVariant?: 'text' | 'range' | 'select'
   }
}

export default function IncomeTable({data}) {
   const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
   const columns = React.useMemo<ColumnDef<Income, any>[]>(
      () => [
         {
            header: 'Title',
            accessorKey: 'title',
         },
         {
            header: 'Amount',
            accessorKey: 'amount',
            meta: {
               filterVariant: 'range',
            },
         },
         {
            accessorKey: 'incomeCategory',
            header: 'Income Category',
            meta: {
               filterVariant: 'select'
            }
         },
         {
            accessorKey: 'currency',
            header: 'Currency',
            meta: {
               filterVariant: 'select'
            }
         },
         {
            header: 'Actions', // Display column header
            id: 'actions', // Important: Give the column an ID
            cell: props => <RowActions row={props.row} /> 
         }
      ],
      []
   ) 
   const tableConfig = useReactTable({
      data,
      columns,
      state: {
         columnFilters,
      },
      onColumnFiltersChange: setColumnFilters,
      getCoreRowModel: getCoreRowModel(),
      getFilteredRowModel: getFilteredRowModel(), //client-side filtering
      getSortedRowModel: getSortedRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getFacetedRowModel: getFacetedRowModel(), // client-side faceting
      getFacetedUniqueValues: getFacetedUniqueValues(), // generate unique values for select filter/autocomplete
      getFacetedMinMaxValues: getFacetedMinMaxValues(), // generate min/max values for range filter
      debugTable: true,
      debugHeaders: true,
      debugColumns: false,
   })

   return (
      <Table tableConfiguration={tableConfig} name='My Incomes' />
   );
}