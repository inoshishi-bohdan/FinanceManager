import { useNavigate } from "react-router-dom";
import ErrorBox from "./ErrorBox";
import AuthInput from "./AuthInput";
import { register } from "../../util/http";
import useMyMutation from "../../hooks/useMyMutation";
import { showSuccessNotification } from "../../util/notification";

export default function RegisterForm() {
   const navigate = useNavigate();
   const { mutate, responseMessage, isPending } = useMyMutation(register, handleSuccess);

   function handleSuccess() {
      navigate('/login');
      showSuccessNotification('You were successfully registered');
   }

   async function handleSubmit(event) {
      event.preventDefault();
      const fd = new FormData(event.target);
      const data = Object.fromEntries(fd.entries());
      const request = {
         userName: data.userName,
         email: data.email,
         password: data.password
      };

      mutate(request);
   }

   return (
      <form className='auth' onSubmit={handleSubmit}>
         <h4 className='text-center auth mb-4'>Sign Up</h4>
         {responseMessage && responseMessage.message && <ErrorBox message={responseMessage.message} errors={responseMessage.errors} />}
         <AuthInput required type="text" label='User name' name='userName' id='userName' />
         <AuthInput required type="email" label='Email address' name='email' id='email' />
         <AuthInput required type="password" label='Password' name='password' id='password' />
         <button type="submit" className={`btn btn-primary auth mt-4`} disabled={isPending}>
            {isPending ? 'Submitting...' : 'Sign Up'}
         </button>
      </form>
   );
}