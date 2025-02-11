import { BASE_URL } from '../util/http';
import { useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { showErrorNotification, showInfoNotification } from '../util/notification.js';
import { AuthContext } from '../store/authentication-context.jsx';
import { getAccessToken, getRefreshToken, getUserIdFromAccessToken, setAccessToken, setRefreshToken } from '../util/auth.js';

export default function useRefresh() {
   const navigate = useNavigate();
   const { changeIsAuthenticated } = useContext(AuthContext);
   const isRefreshing = useRef(false);

   useEffect(() => {
      const interval = 1000 * 60 * 14;
      let intervalId;

      async function refreshTokens() {
         if (isRefreshing.current) return;
         isRefreshing.current = true;

         const refreshToken = getRefreshToken();
         const accessToken = getAccessToken();

         if (!refreshToken || !accessToken) {
            isRefreshing.current = false;
            return;
         }

         let userId;
         try {
            userId = getUserIdFromAccessToken(accessToken);
         } catch (error) {
            showErrorNotification(`JWT Decode Error: ${error.message}`);
            changeIsAuthenticated(false);
            navigate('/login');
            isRefreshing.current = false;
            return;
         }

         const request = { userId, refreshToken };
         const url = `${BASE_URL}/api/Auth/refreshToken`;

         let response;
         try {
            response = await fetch(url, {
               method: 'POST',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify(request),
            });
         } catch (error) {
            console.error("Fetch Error:", error);
            navigate('/error', { state: { message: "A network error occurred", status: 500 } });
            isRefreshing.current = false;
            return;
         }

         if (!response) {
            isRefreshing.current = false;
            return;
         }

         if (response.status === 401) {
            try {
               const resData = await response.json();
               showInfoNotification(resData.message);
            } catch {
               showErrorNotification('Invalid refresh token JSON response');
            } finally {
               changeIsAuthenticated(false);
               navigate('/login');
               isRefreshing.current = false;
               return;
            }
         }

         if (!response.ok) {
            try {
               const resData = await response.json();
               navigate('/error', { state: { message: resData.message, status: response.status } });
            } catch {
               navigate('/error', { state: { message: "Could not refresh token", status: 500 } });
            } finally {
               changeIsAuthenticated(false);
               navigate('/login');
               isRefreshing.current = false;
               return;
            }
         }

         try {
            const resData = await response.json();
            setAccessToken(resData.accessToken);
            setRefreshToken(resData.refreshToken);
         } catch {
            showErrorNotification('Invalid refresh token JSON response');
            changeIsAuthenticated(false);
            navigate('/login');
         } finally {
            isRefreshing.current = false;
         }
      }

      refreshTokens();
      intervalId = setInterval(refreshTokens, interval);

      return () => clearInterval(intervalId);
   }, [navigate, changeIsAuthenticated]);
}