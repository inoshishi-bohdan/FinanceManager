import { getAccessToken } from "./auth";
import { QueryClient } from "@tanstack/react-query";

export const BASE_URL = 'https://localhost:7209';
export const queryClient = new QueryClient();

async function validateResponse(response, errorMessage) {
   if (!response.ok) {
      const error = new Error(errorMessage);
      error.code = response.status;

      try {
         error.info = await response.json();
      } catch (error) {
         error.info = null;
      }

      throw error;
   }
}

export async function login(request) {
   const response = await fetch(`${BASE_URL}/api/Auth/login`, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json'
      },
      body: JSON.stringify(request)
   });

   await validateResponse(response, 'Could not login user. Try again later');

   const resData = await response.json();
   return resData;
}

export async function register(request) {
   const response = await fetch(`${BASE_URL}/api/Auth/register`, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json'
      },
      body: JSON.stringify(request)
   });

   await validateResponse(response, 'Could not register user. Try again later');
}

export async function refreshTokens(request) {
   const response = await fetch(`${BASE_URL}/api/Auth/refreshToken`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
   });

   await validateResponse(response, 'Could not refresh token');

   const resData = await response.json();
   return resData;
}

export async function fetchIncomes({ signal }) {
   const accessToken = getAccessToken();
   const response = await fetch(`${BASE_URL}/api/Income/getMyIncomes`, {
      method: 'GET',
      signal: signal,
      headers: {
         'Authorization': `Bearer ${accessToken}`
      }
   });

   await validateResponse(response, 'An error occurred while fetching the incomes');

   const resData = await response.json();
   return resData;
};

export async function deleteIncome(id) {
   const accessToken = getAccessToken(); 
   const response = await fetch(`${BASE_URL}/api/Income/delete/${id}`, {
      method: 'DELETE',
      headers: {
         'Authorization': `Bearer ${accessToken}`
      }
   });

   await validateResponse(response, 'Could not delete this income record');
}

export async function fetchExpenses({ signal }) {
   const accessToken = getAccessToken();
   const response = await fetch(`${BASE_URL}/api/Income/getMyExpenses`, {
      method: 'GET',
      signal: signal,
      headers: {
         'Authorization': `Bearer ${accessToken}`
      }
   });

   await validateResponse(response, 'An error occurred while fetching the expenses');

   const resData = await response.json();
   return resData;
}

