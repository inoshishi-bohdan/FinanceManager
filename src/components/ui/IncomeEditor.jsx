import Modal from "./Modal";
import IncomeForm from "./IncomeForm";
import { updateIncome, queryClient } from '../../util/http';
import { useContext } from "react";
import { IncomeModalContext } from "../../store/income-modal-context";
import { showSuccessNotification } from "../../util/notification";

export default function IncomeEditor() {
   const { editModalIsOpen, handleCloseEditModal, selectedRecord, setSelectedRecord } = useContext(IncomeModalContext);

   function handleSuccessUpdate() {
      queryClient.invalidateQueries({ queryKey: ['incomes'] });
      showSuccessNotification('Record was successfully modified');
      handleCloseEditModal();
      setSelectedRecord(null);
   }

   return (
      <Modal open={editModalIsOpen} onClose={handleCloseEditModal}>
         <IncomeForm title='Edit Income' record={selectedRecord} mutationFn={updateIncome} onCancel={handleCloseEditModal} onSuccess={handleSuccessUpdate} />
      </Modal>
   );
}