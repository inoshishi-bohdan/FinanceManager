import Modal from "./Modal";
import ExpenseForm from "./ExpenseForm";
import { createExpense, queryClient } from '../../util/http';
import { useContext } from "react";
import { ExpenseModalContext } from "../../store/expense-modal-context";
import { showSuccessNotification } from "../../util/notification";

export default function ExpenseCreator() {
   const { createModalIsOpen, handleCloseCreateModal } = useContext(ExpenseModalContext);

   function handleSuccessCreate() {
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
      showSuccessNotification('Record was successfully created');
      handleCloseCreateModal()
   }

   return (
      <Modal open={createModalIsOpen} onClose={handleCloseCreateModal}>
         <ExpenseForm title='Create Expense' mutationFn={createExpense} onCancel={handleCloseCreateModal} onSuccess={handleSuccessCreate} />
      </Modal>
   );
}