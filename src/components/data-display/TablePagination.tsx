import React from 'react'

export default function TablePagination({ tableConfiguration }) {
   return (
      <div className='pagination-container'>
         <div className='pagination-navigation'>
            <button
               className="btn btn-outline-light "
               onClick={() => tableConfiguration.setPageIndex(0)}
               disabled={!tableConfiguration.getCanPreviousPage()}
            >
               {'<<'}
            </button>
            <button
               className="btn btn-outline-light"
               onClick={() => tableConfiguration.previousPage()}
               disabled={!tableConfiguration.getCanPreviousPage()}
            >
               {'<'}
            </button>
            <button
               className="btn btn-outline-light"
               onClick={() => tableConfiguration.nextPage()}
               disabled={!tableConfiguration.getCanNextPage()}
            >
               {'>'}
            </button>
            <button
               className="btn btn-outline-light"
               onClick={() => tableConfiguration.setPageIndex(tableConfiguration.getPageCount() - 1)}
               disabled={!tableConfiguration.getCanNextPage()}
            >
               {'>>'}
            </button>
            <div className="d-flex flex-column justify-content-center align-items-center text-white ms-3">
               <p className='m-0'>Page</p>
               <p className='fw-bold m-0'>
                  {tableConfiguration.getState().pagination.pageIndex + 1} of{' '}
                  {tableConfiguration.getPageCount()}
               </p>
            </div>
         </div>
         <div className='d-flex align-items-center justify-content-center gap-3'>
            <p style={{ width: '200px' }} className='text-white m-0'>Go to page:</p>
            <input
               type="number"
               defaultValue={tableConfiguration.getState().pagination.pageIndex + 1}
               onChange={e => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0
                  tableConfiguration.setPageIndex(page)
               }}
               className="form-control page-selector"
            />
            <select
               className='form-select page-volume-select'
               value={tableConfiguration.getState().pagination.pageSize}
               onChange={e => {
                  tableConfiguration.setPageSize(Number(e.target.value))
               }}
            >
               {[10, 20, 30, 40, 50].map(pageSize => (
                  <option key={pageSize} value={pageSize}>
                     Show {pageSize}
                  </option>
               ))}
            </select>
         </div>
      </div>
   );
}