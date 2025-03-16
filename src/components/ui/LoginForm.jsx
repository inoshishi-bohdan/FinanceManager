import ErrorBox from "./ErrorBox";
import AuthInput from "./AuthInput";
import { login } from "../../util/http";
import useMyMutation from "../../hooks/useMyMutation";
import { setAccessToken, setRefreshToken } from "../../util/auth";
import { useContext } from "react";
import { AuthContext } from "../../store/authentication-context";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import SubmitButton from "./SubmitButton";

export default function LoginForm() {
   const { changeIsAuthenticated } = useContext(AuthContext);
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
      <motion.form
         initial={{opacity: 0, y: 30}}
         animate={{opacity: 1, y: 0}}
         transition={{duration: 0.4}} 
         className='auth'
         onSubmit={handleSubmit}
      >
         <h4 className='text-center auth mb-4'>Login</h4>
         {responseMessage && responseMessage.message && <ErrorBox message={responseMessage.message} errors={responseMessage.errors} />}
         <AuthInput required type="email" label='Email address' name='email' id='email' />
         <AuthInput required type="password" label='Password' name='password' id='password' />
         <SubmitButton isPending={isPending} text='Login' />
      </motion.form>
   );
}