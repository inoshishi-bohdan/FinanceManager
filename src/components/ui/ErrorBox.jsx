import classes from "./ErrorBox.module.css";

export default function ErrorBox({ message, errors, onConfirm }) {
   return (
      <div className={classes['error']}>
         <h2>{message}</h2>
         {errors && (
            <ul>
               {Object.values(errors).map(err => <li key={err}>{err}</li>)}
            </ul>
         )}
         {onConfirm && (
            <div className={classes['confirmation-actions']}>
               <button onClick={onConfirm} className="btn btn-danger">
                  Okay
               </button>
            </div>
         )}
      </div>
   );
}