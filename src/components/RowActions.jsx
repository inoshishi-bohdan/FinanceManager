export default function RowActions({row}) {
   return (
      <div className="d-flex flex-wrap gap-2">
         <button type="button" className="btn btn-outline-warning action-button" onClick={() => console.log(row.original)} >Edit</button> 
         <button type="button" className="btn btn-outline-danger action-button" onClick={() => console.log(row.original)} >Delete</button> 
      </div>
   );
}