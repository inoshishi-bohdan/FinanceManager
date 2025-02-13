import ErrorBox from "./ErrorBox";
import Input from "./Input";
import { login } from "../../util/http";
import useMyMutation from "../../hooks/useMyMutation";
import { setAccessToken, setRefreshToken } from "../../util/auth";
import { useContext } from "react";
import { AuthContext } from "../../store/authentication-context";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
   const {changeIsAuthenticated} = useContext(AuthContext);
   const navigate = useNavigate();
   const { mutate, responseMessage, isPending } = useMyMutation(login, handleSuccess);

   function handleSuccess(data) {
      setAccessToken(data.accessToken);
      setRefreshToken(data.refreshToken);
      changeIsAuthenticated(true);
      navigate('/');
   }

   function handleSubmit(event) {
      event.preventDefault();
      const fd = new FormData(event.target);
      const data = Object.fromEntries(fd.entries());
      const request = {
         email: data.email,
         password: data.password
      };

      mutate(request);
   }

   return (
      <form className='auth' onSubmit={handleSubmit}>
         <h4 className='text-center auth mb-4'>Login</h4>
         {responseMessage && responseMessage.message && <ErrorBox message={responseMessage.message} errors={responseMessage.errors} />}
         <Input required type="email" label='Email address' name='email' id='email' />
         <Input required type="password" label='Password' name='password' id='password' />
         <button type="submit" className={`btn btn-primary auth mt-4`} disabled={isPending}>
            {isPending ? 'Submitting...' : 'Login'}
         </button>
      </form>
   );
}