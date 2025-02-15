import React from 'react'
import {
   flexRender,
} from '@tanstack/react-table'
import Filter from '../ui/Filter'
import { useMediaQuery } from 'react-responsive';

export default function TableHeader({ tableConfiguration }) {
   const isSmallScreen = useMediaQuery({ query: '(max-width: 984px)' });

   return (
      <thead className='table-light'>
         {tableConfiguration.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
               {headerGroup.headers.map(header => {
                  return (
                     <th key={header.id} colSpan={header.colSpan} className='align-top'>
                        {header.isPlaceholder ? null : (
                           <>
                              <div
                                 {...{
                                    className: header.column.getCanSort()
                                       ? 'cursor-pointer select-none'
                                       : '',
                                    onClick: header.column.getToggleSortingHandler(),
                                 }}
                              >
                                 {flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                 )}
                                 {{
                                    asc: ' 🔼',
                                    desc: ' 🔽',
                                 }[header.column.getIsSorted() as string] ?? null}
                              </div>
                              {header.column.getCanFilter() && !isSmallScreen ? (
                                 <div>
                                    <Filter column={header.column} />
                                 </div>
                              ) : null}
                           </>
                        )}
                     </th>
                  )
               })}
            </tr>
         ))}
      </thead>
   );
}