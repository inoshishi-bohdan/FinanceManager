import MainNavigation from '../components/layout/MainNavigation.jsx'
import { Outlet } from 'react-router-dom'
import { ToastContainer, Bounce } from 'react-toastify';
import useMyMutation from "../hooks/useMyMutation.js";
import { refreshTokens } from '../util/http.js';
import { useEffect } from 'react';
import { getAccessToken, getRefreshToken, getUserIdFromAccessToken, setAccessToken, setRefreshToken } from '../util/auth.js';

export default function RootLayout() {
   const { mutate } = useMyMutation(refreshTokens, handleSuccess);

   function handleSuccess(data) {
      setAccessToken(data.accessToken);
      setRefreshToken(data.refreshToken);
   }

   useEffect(() => {
      const interval = 1000 * 60 * 13;
      let intervalId;

      function handleRefreshTokens() {
         const refreshToken = getRefreshToken();
         const accessToken = getAccessToken();

         if (!refreshToken || !accessToken) {
            return;
         }

         const userId = getUserIdFromAccessToken(accessToken);
         const request = { userId, refreshToken };

         mutate(request);
      }

      handleRefreshTokens();

      intervalId = setInterval(handleRefreshTokens, interval);
      return () => clearInterval(intervalId);
   }, [mutate]);

   // const navigation = useNavigation();
   return (
      <>
         <MainNavigation />
         <ToastContainer
            position="bottom-center"
            autoClose={2500}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable
            pauseOnHover
            theme="colored"
            transition={Bounce}
         />
         <main>
            {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
            <Outlet />
         </main>
      </>
   );
}