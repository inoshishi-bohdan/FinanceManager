import { useNavigate } from "react-router-dom";
import ErrorBox from "./ErrorBox";
import Input from "./Input";
import { useState } from "react";

export default function RegisterForm() {
   const navigate = useNavigate();
   const [isSubmitting, setIsSubmitting] = useState(false); 
   const [responseMessage, setResponseMessage] = useState(null);

   async function handleSubmit(event) {
      event.preventDefault();
      setIsSubmitting(true); 
 
      const fd = new FormData(event.target);
      const data = Object.fromEntries(fd.entries());
      const request = {
         userName: data.userName,
         email: data.email,
         password: data.password
      };
      let response;

      try {
         response = await fetch(`https://localhost:7209/api/Auth/register`, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify(request)
         });
      } catch (error) {
         console.error("Fetch Error:", error);
         navigate('/error', { state: { message: "A network error occurred", status: 500 } }); // Include status
         return;
      } finally { 
         setIsSubmitting(false);
     }

      if (response.status === 400) {
         const errorData = await response.json();
         setResponseMessage(errorData);
         return;
      }

      if (!response.ok) {
         navigate('/error', { state: { message: "Could not register user", status: 500 } });
         return;
      }
      navigate('/login');
   }

   return (
      <form className='auth' onSubmit={handleSubmit}>
         <h4 className='text-center auth mb-4'>Sign Up</h4>
         {responseMessage && responseMessage.message && <ErrorBox message={responseMessage.message} errors={responseMessage.errors} />}
         <Input required type="text" label='User name' name='userName' id='userName' />
         <Input required type="email" label='Email address' name='email' id='email' />
         <Input required type="password" label='Password' name='password' id='password' />
         <button type="submit" className={`btn btn-primary auth mt-4`} disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Sign Up'}
         </button>
      </form>
   );
}