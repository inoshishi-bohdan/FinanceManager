import Modal from "./Modal";

export default function EditIncomeForm({ isOpen, record, onClose }) {
   return (
      <Modal open={isOpen} className="edit-form" onClose={onClose}>
         <p>Edit form</p>
      </Modal>
   );
}