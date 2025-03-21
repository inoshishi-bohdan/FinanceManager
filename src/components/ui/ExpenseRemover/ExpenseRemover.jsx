import { useContext } from "react";
import { ExpenseModalContext } from "../../../store/expense-modal-context";
import { queryClient } from "../../../util/http";
import { showSuccessNotification } from "../../../util/notification";
import DeleteConfirmation from "../DeleteConfirmation/DeleteConfirmation";
import { deleteExpense } from "../../../util/http";
import Modal from "../Modal/Modal";

export default function ExpenseRemover() {
      const {deleteModalIsOpen, handleCloseDeleteModal, selectedRecord, setSelectedRecord} = useContext(ExpenseModalContext);
      
      function handleSuccessDelete() {
         queryClient.invalidateQueries({ queryKey: ['expenses'] });
         showSuccessNotification('Record was successfully deleted');
         handleCloseDeleteModal();
         setSelectedRecord(null);
      }

   return (
      <Modal open={deleteModalIsOpen} onClose={handleCloseDeleteModal}>
         <DeleteConfirmation mutateFn={() => deleteExpense(selectedRecord?.id ?? 0)} onSuccess={handleSuccessDelete} onCancel={handleCloseDeleteModal}  />
      </Modal>
   );
}