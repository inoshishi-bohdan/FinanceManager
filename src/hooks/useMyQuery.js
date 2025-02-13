import { useNavigate } from 'react-router-dom';
import { showInfoNotification } from "../util/notification";
import { useContext } from "react";
import { AuthContext } from "../store/authentication-context";
import { useQuery } from "@tanstack/react-query";

export default function useMyQuery(queryFn, queryKey) {
   const navigate = useNavigate();
   const { changeIsAuthenticated } = useContext(AuthContext);
   const { data, isPending, isError, error } = useQuery({
      queryKey: queryKey,
      queryFn: queryFn
   });

   if (isError) {
      switch (error.code) {
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
      data,
      isPending
   };
}