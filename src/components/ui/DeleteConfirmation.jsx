import modalClasses from './Modal.module.css'
import ErrorBox from './ErrorBox'
import useMyMutation from "../../hooks/useMyMutation";

export default function DeleteConfirmation({mutateFn, onSuccess, onCancel, text = 'Are you sure you want to delete this record?' }) {
   const { mutate, responseMessage, isPending } = useMyMutation(mutateFn, onSuccess);

   function handleDeleteRecord() {
      mutate();
   }

   return (
      <div className="d-flex flex-column justify-content-center gap-4">
         <div className="mt-3 mb-0">
            <h3 className="text-center">{text}</h3>
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