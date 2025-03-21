import Modal from "../Modal/Modal";
import IncomeForm from "../IncomeForm/IncomeForm";
import { createIncome, queryClient } from '../../../util/http';
import { useContext } from "react";
import { IncomeModalContext } from "../../../store/income-modal-context";
import { showSuccessNotification } from "../../../util/notification";

export default function IncomeCreator() {
   const { createModalIsOpen, handleCloseCreateModal } = useContext(IncomeModalContext);

   function handleSuccessCreate() {
      queryClient.invalidateQueries({ queryKey: ['incomes'] });
      showSuccessNotification('Record was successfully created');
      handleCloseCreateModal()
   }

   return (
      <Modal open={createModalIsOpen} onClose={handleCloseCreateModal}>
         <IncomeForm title='Create Income' mutationFn={createIncome} onCancel={handleCloseCreateModal} onSuccess={handleSuccessCreate} />
      </Modal>
   );
}