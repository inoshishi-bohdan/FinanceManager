export default function RowActions({onEditClick, onDeleteClick}) {
   return (
      <div className="d-flex flex-wrap gap-2">
         <button type="button" className="btn btn-outline-warning action-button" onClick={onEditClick} >Edit</button>
         <button type="button" className="btn btn-outline-danger action-button" onClick={onDeleteClick} >Delete</button>
      </div>
   );
}