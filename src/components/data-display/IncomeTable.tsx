import React, { useState } from 'react'
import { Income } from '../../models/Income'
import EditIncomeForm from '../ui/EditIncomeForm'
import DeleteConfirmation from '../ui/DeleteConfirmation'
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
import RowActions from '../ui/RowActions'
import { queryClient, deleteIncome } from '../../util/http'
import { showSuccessNotification } from '../../util/notification'

declare module '@tanstack/react-table' {
   //allows us to define custom properties for our columns
   interface ColumnMeta<TData extends RowData, TValue> {
      filterVariant?: 'text' | 'range' | 'select'
   }
}

export default function IncomeTable({ data }) {
   const [showEditModal, setShowEditModal] = useState(false);
   const [showDeleteModal, setShowDeleteModal] = useState(false);
   const [selectedRecord, setSelectedRecord] = useState<Income | null>(null);
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
            cell: props => <RowActions onEditClick={() => handleEditClick(props.row.original)} onDeleteClick={() => handleDeleteClick(props.row.original)} />
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

   function handleEditClick(record) {
      setSelectedRecord(record);
      setShowEditModal(true);
   };

   function handleDeleteClick(record) {
      setSelectedRecord(record);
      setShowDeleteModal(true);
   };

   function handleCloseEditModal() {
      setShowEditModal(false);
      setSelectedRecord(null);
   }
   function handleCloseDeleteModal() {
      setShowDeleteModal(false);
      setSelectedRecord(null);
   }

   function handleSuccessDelete() {
      queryClient.invalidateQueries({ queryKey: ['incomes']});
      showSuccessNotification('Record was successfully deleted');
      handleCloseDeleteModal();
   }

   return (
      <>
         <EditIncomeForm
            isOpen={showEditModal}
            record={selectedRecord}
            onClose={handleCloseEditModal}
         />
         <DeleteConfirmation
            isOpen={showDeleteModal}
            record={selectedRecord}
            onClose={handleCloseDeleteModal}
            mutateFn={deleteIncome}
            onSuccess={handleSuccessDelete}
         />
         <Table tableConfiguration={tableConfig} name='My Incomes' />
      </>
   );
}