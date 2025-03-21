import React, { useContext } from 'react'
import { Income } from '../../../models/Income'
import IncomeEditor from '../../ui/IncomeEditor/IncomeEditor'
import {
   ColumnDef,
   RowData,
} from '@tanstack/react-table'
import Table from '../Table/Table'
import RowActions from '../../ui/RowActions/RowActions'
import IncomeCreator from '../../ui/IncomeCreator/IncomeCreator'
import { IncomeModalContext } from '../../../store/income-modal-context'
import IncomeRemover from '../../ui/IncomeRemover/IncomeRemover'
import PageContent from '../../layout/PageContent/PageContent'

declare module '@tanstack/react-table' {
   //allows us to define custom properties for our columns
   interface ColumnMeta<TData extends RowData, TValue> {
      filterVariant?: 'text' | 'range' | 'select'
   }
}

export default function IncomeTable({ data }) {
   const { handleOpenEditModal, handleOpenDeleteModal, handleOpenCreateModal, setSelectedRecord } = useContext(IncomeModalContext);
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
         <PageContent title='My Incomes' subtitle="You don't have income records">
            <button className='btn btn-primary mt-3' onClick={handleOpenCreateModal}>Add Record +</button>
         </PageContent>
      );
   } else {
      content = (<Table onAddRecord={handleOpenCreateModal} data={data} columns={columns} name='My Incomes' />);
   }

   return (
      <>
         <IncomeCreator />
         <IncomeEditor />
         <IncomeRemover />
         {content}
      </>
   );
}