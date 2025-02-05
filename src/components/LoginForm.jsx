import { useNavigate } from "react-router-dom";
import ErrorBox from "./ErrorBox";
import Input from "./Input";
import { useState, useContext } from "react";
import { AuthContext } from "../store/authentication-context";

export default function LoginForm() {
   const [isSubmitting, setIsSubmitting] = useState(false); 
   const [responseMessage, setResponseMessage] = useState(null);
   const {changeIsAuthenticated} = useContext(AuthContext);
   const navigate = useNavigate();

   async function handleSubmit(event) {
      event.preventDefault();
      setIsSubmitting(true); 
 
      const fd = new FormData(event.target);
      const data = Object.fromEntries(fd.entries());
      const request = {
         email: data.email,
         password: data.password
      };
      let response;

      try {
         response = await fetch(`https://localhost:7209/api/Auth/login`, {
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
         navigate('/error', { state: { message: "Could not login user", status: 500 } });
         return;
      }

      const resData = await response.json();
      localStorage.setItem('accessToken', resData.accessToken);
      localStorage.setItem('refreshToken', resData.refreshToken);
      changeIsAuthenticated(true);
      navigate('/');
   }

   return (
      <form className='auth' onSubmit={handleSubmit}>
         <h4 className='text-center auth mb-4'>Login</h4>
         {responseMessage && responseMessage.message && <ErrorBox message={responseMessage.message} errors={responseMessage.errors} />}
         <Input required type="email" label='Email address' name='email' id='email' />
         <Input required type="password" label='Password' name='password' id='password' />
         <button type="submit" className={`btn btn-primary auth mt-4`} disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Login'}
         </button>
      </form>
   );
}