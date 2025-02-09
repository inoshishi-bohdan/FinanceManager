import IncomeTable from "../components/IncomeTable";
import { getAccessToken } from '../util/auth'
import { useNavigate } from 'react-router-dom';
import { showInfoNotification } from "../util/notification";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../store/authentication-context";

export default function IncomePage() {
   const [incomes, setIncomes] = useState([]);
   const navigate = useNavigate();
   const { changeIsAuthenticated } = useContext(AuthContext);

   useEffect(() => {

      async function fetchIncomes() {
         const accessToken = getAccessToken();

         if (!accessToken) {
            navigate('/login');
         }

         let response;

         try {
            response = await fetch(`https://localhost:7209/api/Income/getMyIncomes`, {
               method: 'GET',
               headers: {
                  'Authorization': `Bearer ${accessToken}`
               }
            });
         } catch (error) {
            console.error("Fetch Error:", error);
            navigate('/error', { state: { message: "A network error occurred", status: 500 } });
         }

         if (response.status === 401) {
            try {
               const resData = await response.json();
               showInfoNotification(resData.message);
            } catch (error) {
               showInfoNotification('Unauthorized. Login again');
            } finally {
               changeIsAuthenticated(false);
               return redirect('/login');
            }
         }

         if (!response.ok) {
            try {
               const resData = await response.json();
               navigate('/error', { state: { message: resData.message, status: response.status } });
            } catch (error) {
               navigate('/error', { state: { message: 'Could not fetch your incomes', status: 500 } });
            }
         }

         const resData = await response.json();
         setIncomes(resData);
      };

      fetchIncomes()
   }, [navigate, changeIsAuthenticated]);

   return (
      <IncomeTable data={incomes} />
   );
}

