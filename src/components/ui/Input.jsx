export default function Input({label, id, ...props }) {
   return (
      <div className="mb-2">
         <label htmlFor={id} className="form-label">{label}</label>
         <input {...props} id={id} className="form-control" />
      </div>
   );
}