import MainNavigation from '../components/MainNavigation.jsx'
import { Outlet } from 'react-router-dom'
import { BASE_URL } from '../util/http';
import { jwtDecode } from "jwt-decode";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RootLayout() {
   const navigate = useNavigate();

   useEffect(() => {
      const interval = 1000 * 60 * 14;
      let intervalId;

      async function refreshTokens() {
         const refreshToken = localStorage.getItem('refreshToken');
         const accessToken = localStorage.getItem('accessToken');

         if (refreshToken && accessToken) {
            try {
               const decoded = jwtDecode(accessToken);
               const userId = decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
               const request = { userId, refreshToken };
               const url = BASE_URL + '/api/Auth/refreshToken';

               const response = await fetch(url, {
                  method: 'POST',
                  headers: {
                     'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(request),
               });

               if (response.status === 401) {
                  const errorData = await response.json();
                  throw new Error(`Refresh token request failed: ${response.status} - ${errorData?.message || 'Unauthorized'}`);
               }

               try {
                  const resData = await response.json();
                  localStorage.setItem('accessToken', resData.accessToken);
                  localStorage.setItem('refreshToken', resData.refreshToken);
               } catch (jsonError) {
                  console.error("Error parsing JSON response:", jsonError);
                  throw new Error("Invalid JSON response from refresh token endpoint.");
               }

            } catch (error) {
               //show message
               console.error("Token refresh failed:", error);
               localStorage.removeItem('accessToken');
               localStorage.removeItem('refreshToken');
               navigate('/login');
            }
         }
      }
      refreshTokens();
      intervalId = setInterval(refreshTokens, interval);

      return () => {
         clearInterval(intervalId);
      };
   }, []);


   // const navigation = useNavigation();

   return (
      <>
         <MainNavigation />
         <main>
            {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
            <Outlet />
         </main>
      </>
   );
}