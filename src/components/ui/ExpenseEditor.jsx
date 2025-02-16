import Modal from "./Modal";
import ExpenseForm from "./ExpenseForm";
import { updateExpense, queryClient } from '../../util/http';
import { useContext } from "react";
import { ExpenseModalContext } from "../../store/expense-modal-context";
import { showSuccessNotification } from "../../util/notification";

export default function ExpenseEditor() {
   const { editModalIsOpen, handleCloseEditModal, selectedRecord, setSelectedRecord } = useContext(ExpenseModalContext);

   function handleSuccessUpdate() {
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
      showSuccessNotification('Record was successfully modified');
      handleCloseEditModal();
      setSelectedRecord(null);
   }

   return (
      <Modal open={editModalIsOpen} onClose={handleCloseEditModal}>
         <ExpenseForm title='Edit Expense' record={selectedRecord} mutationFn={updateExpense} onCancel={handleCloseEditModal} onSuccess={handleSuccessUpdate} />
      </Modal>
   );
}