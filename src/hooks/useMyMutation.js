import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { showInfoNotification } from "../util/notification";
import { useContext } from "react";
import { AuthContext } from "../store/authentication-context";

export default function useMyMutation(mutationFn, onSuccess) {
   const navigate = useNavigate();
   const { changeIsAuthenticated } = useContext(AuthContext);
   const [responseMessage, setResponseMessage] = useState(null);
   const { mutate, isPending, data } = useMutation({
      mutationFn: mutationFn,
      onError: handleError,
      onSuccess: onSuccess
   });
   
   function handleError(error) {
      switch (error.code) {
         case 400:
            setResponseMessage(error.info);
            break;
         case 401:
            changeIsAuthenticated(false);
            navigate('/login');
            showInfoNotification(error.info?.message || 'Unauthorized. Please login again');
            break;
         case 404:
            changeIsAuthenticated(false);
            navigate('/error', { state: { message: error.info?.message, status: 404 } });
            break;
         default:
            changeIsAuthenticated(false)
            navigate('/error', { state: { message: error.message, status: error.code } });
      }
   }

   return {
      mutate,
      isPending,
      responseMessage,
      data,
   };
}