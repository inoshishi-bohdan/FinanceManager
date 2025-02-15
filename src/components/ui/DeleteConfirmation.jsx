import Modal from "./Modal";
import modalClasses from './Modal.module.css'
import ErrorBox from './ErrorBox'
import useMyMutation from "../../hooks/useMyMutation";

export default function DeleteConfirmation({ record, mutateFn, onSuccess, onCancel }) {
   const { mutate, responseMessage, setResponseMessage ,isPending } = useMyMutation(mutateFn, onSuccess);
   const recordId = record?.id ?? 0;

   function handleDeleteRecord() {
      mutate(recordId);
   }

   return (
      <div className="d-flex flex-column justify-content-center gap-4">
      <div className="mt-3 mb-0">
         <h3 className="text-center">Are you sure you want to delete this record?</h3>
         <p className="fs-4 text-center m-0">This can't be undone</p>
      </div>
      {responseMessage && responseMessage.message && <ErrorBox message={responseMessage.message} errors={responseMessage.errors} />}
      <div className={modalClasses['modal-actions']}>
         <button className="btn btn-danger" onClick={handleDeleteRecord} disabled={isPending}>{isPending ? 'Submitting...' : 'Confirm'}</button>
         <button className="btn btn-primary" onClick={onCancel} disabled={isPending}>Cancel</button>
      </div>
   </div>
   );
}