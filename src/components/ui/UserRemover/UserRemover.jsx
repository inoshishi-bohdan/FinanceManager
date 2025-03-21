import { showInfoNotification } from "../../../util/notification";
import DeleteConfirmation from "../DeleteConfirmation/DeleteConfirmation";
import { deleteMyAccount } from "../../../util/http";
import Modal from "../Modal/Modal";
import { UserModalContext } from "../../../store/user-modal-context";
import { useContext } from 'react'
import { AuthContext } from "../../../store/authentication-context";
import { useNavigate } from "react-router-dom";

export default function UserRemover() {
   const { deleteModalIsOpen, handleCloseDeleteModal } = useContext(UserModalContext);
   const { changeIsAuthenticated } = useContext(AuthContext);
   const navigate = useNavigate();

   function handleSuccessDelete() {
      queryClient.invalidateQueries();
      showInfoNotification('Your account was successfully deleted');
      handleCloseDeleteModal();
      changeIsAuthenticated(false);
      navigate('/login');
   }

   return (
      <Modal open={deleteModalIsOpen} onClose={handleCloseDeleteModal}>
         <DeleteConfirmation text='Do you want to permanently delete your account?' mutateFn={deleteMyAccount} onSuccess={handleSuccessDelete} onCancel={handleCloseDeleteModal} />
      </Modal>
   );
}