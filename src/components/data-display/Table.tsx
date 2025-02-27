import React from 'react'
import {
   flexRender,
} from '@tanstack/react-table'
import TablePagination from './TablePagination';
import TableHeader from './TableHeader';
import {
   ColumnFiltersState,
   getCoreRowModel,
   getFacetedMinMaxValues,
   getFacetedRowModel,
   getFacetedUniqueValues,
   getFilteredRowModel,
   getPaginationRowModel,
   getSortedRowModel,
   useReactTable,
} from '@tanstack/react-table'

export default function Table({ data, columns, name, onAddRecord }) {
   const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
   const config = useReactTable({
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
      autoResetPageIndex: false, //turn off auto reset of pageIndex
      debugTable: true,
      debugHeaders: true,
      debugColumns: false,
   })

   return (
      <div className='table-container'>
         <h1 className='table-name'>{name}</h1>
         <button className='btn btn-success add-button' onClick={onAddRecord}>Add Record +</button>
         <div className='table-responsive'>
            <table className="table table-hover table-bordered m-0">
               <TableHeader tableConfiguration={config} />
               <tbody>
                  {config.getRowModel().rows.map(row => {
                     return (
                        <tr key={row.id}>
                           {row.getVisibleCells().map(cell => {
                              return (
                                 <td key={cell.id}>
                                    {flexRender(
                                       cell.column.columnDef.cell,
                                       cell.getContext()
                                    )}
                                 </td>
                              )
                           })}
                        </tr>
                     )
                  })}
               </tbody>
            </table>
         </div>
         <TablePagination tableConfiguration={config} />
      </div>
   );
}