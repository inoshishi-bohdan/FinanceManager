export default function FormSelect({ text, label, id, options, ...props }) {
   return (
      <div className="mb-2">
         <label htmlFor={id} className="form-label">{label}</label>
         <select {...props} id={id} className="form-select" aria-label="Default select example" >
            <option value='' disabled>{text}</option>
            {options.map(option => <option key={option.id} value={option.id}>
               {option.name}
            </option>)}
         </select>
      </div>
   );
}