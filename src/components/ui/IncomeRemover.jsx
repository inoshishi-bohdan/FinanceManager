import { useContext } from "react";
import { IncomeModalContext } from "../../store/income-modal-context";
import { queryClient } from "../../util/http";
import { showSuccessNotification } from "../../util/notification";
import DeleteConfirmation from "./DeleteConfirmation";
import { deleteIncome } from "../../util/http";
import Modal from "./Modal";

export default function IncomeRemover() {
      const {deleteModalIsOpen, handleCloseDeleteModal, selectedRecord, setSelectedRecord} = useContext(IncomeModalContext);
   
      function handleSuccessDelete() {
         queryClient.invalidateQueries({ queryKey: ['incomes'] });
         showSuccessNotification('Record was successfully deleted');
         handleCloseDeleteModal();
         setSelectedRecord(null);
      }

   return (
      <Modal open={deleteModalIsOpen} onClose={handleCloseDeleteModal}>
         <DeleteConfirmation mutateFn={() => deleteIncome(selectedRecord?.id ?? 0)} onSuccess={handleSuccessDelete} onCancel={handleCloseDeleteModal}  />
      </Modal>
   );
}