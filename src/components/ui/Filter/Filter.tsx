import { Column } from '@tanstack/react-table'
import React from 'react'
import DebouncedInput from '../DebouncedInput/DebouncedInput'

export default function Filter({ column }: { column: Column<any, unknown> }) {
   const { filterVariant } = column.columnDef.meta ?? {}
   const columnFilterValue = column.getFilterValue()
   const sortedUniqueValues = React.useMemo(
      () =>
         filterVariant === 'range'
            ? []
            : Array.from(column.getFacetedUniqueValues().keys())
               .sort()
               .slice(0, 5000),
      [column.getFacetedUniqueValues(), filterVariant]
   )

   return filterVariant === 'range' ? (
      <div>
         <div className="flex space-x-2">
            <DebouncedInput
               type="number"
               min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
               max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
               value={(columnFilterValue as [number, number])?.[0] ?? ''}
               onChange={value =>
                  column.setFilterValue((old: [number, number]) => [value, old?.[1]])
               }
               placeholder={`Min ${column.getFacetedMinMaxValues()?.[0] !== undefined
                  ? `(${column.getFacetedMinMaxValues()?.[0]})`
                  : ''
                  }`}
            />
            <DebouncedInput
               type="number"
               min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
               max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
               value={(columnFilterValue as [number, number])?.[1] ?? ''}
               onChange={value =>
                  column.setFilterValue((old: [number, number]) => [old?.[0], value])
               }
               placeholder={`Max ${column.getFacetedMinMaxValues()?.[1]
                  ? `(${column.getFacetedMinMaxValues()?.[1]})`
                  : ''
                  }`}
            />
         </div>
         <div className="h-1" />
      </div>
   ) : filterVariant === 'select' ? (
      <select
      className='filter-select form-select-sm'
         onChange={e => column.setFilterValue(e.target.value)}
         value={columnFilterValue?.toString()}
      >
         <option value="">All</option>
         {sortedUniqueValues.map(value =>
         //dynamically generated select options from faceted values feature
         {
            console.log(sortedUniqueValues);
            return <option value={value} key={value}>
               {value}
            </option>;
         }
         )}
      </select>
   ) : (
      <>
         {/* Autocomplete suggestions from faceted values feature */}
         <datalist id={column.id + 'list'}>
            {sortedUniqueValues.map((value: any) => (
               <option value={value} key={value} />
            ))}
         </datalist>
         <DebouncedInput
            type="text"
            value={(columnFilterValue ?? '') as string}
            onChange={value => column.setFilterValue(value)}
            placeholder={`Search... (${column.getFacetedUniqueValues().size})`}
            list={column.id + 'list'}
         />
         <div className="h-1" />
      </>
   )
}