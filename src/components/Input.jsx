export default function Input({ label, id, error, ...props }) {
   return (
      <div className='mb-3'>
         <label htmlFor={id} className="form-label auth">{label}</label>
         <input {...props} className={`form-control auth`} id={id} />
      </div>
   );
}

