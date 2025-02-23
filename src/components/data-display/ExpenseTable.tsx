import React, { useContext } from 'react'
import { Expense } from '../../models/Expense'
import {
   ColumnDef,
   RowData,
} from '@tanstack/react-table'
import Table from './Table'
import RowActions from '../ui/RowActions'
import { ExpenseModalContext } from '../../store/expense-modal-context'
import ExpenseCreator from '../ui/ExpenseCreator'
import ExpenseEditor from '../ui/ExpenseEditor'
import ExpenseRemover from '../ui/ExpenseRemover'
import PageContent from '../layout/PageContent'

declare module '@tanstack/react-table' {
   //allows us to define custom properties for our columns
   interface ColumnMeta<TData extends RowData, TValue> {
      filterVariant?: 'text' | 'range' | 'select'
   }
}

export default function ExpenseTable({ data }) {
   const { handleOpenEditModal, handleOpenDeleteModal, handleOpenCreateModal, setSelectedRecord } = useContext(ExpenseModalContext);
   const columns = React.useMemo<ColumnDef<Expense, any>[]>(
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
            accessorKey: 'expenseCategory',
            header: 'Expense Category',
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
            accessorKey: 'date',
            header: 'Date',
         },
         {
            header: 'Actions', // Display column header
            id: 'actions', // Important: Give the column an ID
            cell: props => <RowActions onEditClick={() => handleEditClick(props.row.original)} onDeleteClick={() => handleDeleteClick(props.row.original)} />
         }
      ],
      []
   )

   function handleEditClick(record) {
      setSelectedRecord(record);
      handleOpenEditModal();
   };

   function handleDeleteClick(record) {
      setSelectedRecord(record);
      handleOpenDeleteModal();
   };

   let content;

   if (data.length === 0) {
      content = (
         <PageContent title='My Expenses' subtitle="You don't have expense records">
            <button className='btn btn-primary mt-3' onClick={handleOpenCreateModal}>Add Record +</button>
         </PageContent>
      );
   } else {
      content = (<Table onAddRecord={handleOpenCreateModal} data={data} columns={columns} name='My Expenses' />);
   }

   return (
      <>
         <ExpenseCreator />
         <ExpenseEditor />
         <ExpenseRemover />
         {content}
      </>
   );
}