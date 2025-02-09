import React from 'react'
import {
   flexRender,
} from '@tanstack/react-table'
import TablePagination from './TablePagination';
import TableHeader from './TableHeader';

export default function Table({ tableConfiguration, name }) {
   return (
      <div className='table-container'>
      <h1 className='table-name'>{name}</h1>
         <div className='table-responsive'>
            <table className="table table-hover table-bordered">
               <TableHeader tableConfiguration={tableConfiguration} />
               <tbody>
                  {tableConfiguration.getRowModel().rows.map(row => {
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
         <TablePagination tableConfiguration={tableConfiguration} />
      </div>
   );
}