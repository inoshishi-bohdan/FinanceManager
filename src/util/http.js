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

export async function fetchCurrencies({ signal }) {
   const response = await fetch(`${BASE_URL}/api/Currency/getList`, {
      method: 'GET',
      signal: signal
   });

   await validateResponse(response, 'An error occurred while fetching the currencies');

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

export async function fetchIncomeCategories({ signal }) {
   const response = await fetch(`${BASE_URL}/api/IncomeCategory/getList`, {
      method: 'GET',
      signal: signal
   });

   await validateResponse(response, 'An error occurred while fetching the income categories');

   const resData = await response.json();
   return resData;
}

export async function createIncome(request) {
   const accessToken = getAccessToken();
   const response = await fetch(`${BASE_URL}/api/Income/create`, {
      method: 'POST',
      headers: {
         'Authorization': `Bearer ${accessToken}`,
         'Content-Type': 'application/json'
      },
      body: JSON.stringify(request),
   });

   await validateResponse(response, 'Could not create income record');
}

export async function updateIncome({id, request}) {
   const accessToken = getAccessToken();
   const response = await fetch(`${BASE_URL}/api/Income/update/${id}`, {
      method: 'PUT',
      headers: {
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify(request),
   });

   await validateResponse(response, 'Could not update this income record');
}

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
   const response = await fetch(`${BASE_URL}/api/Expense/getMyExpenses`, {
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

export async function fetchExpenseCategories({ signal }) {
   const response = await fetch(`${BASE_URL}/api/ExpenseCategory/getList`, {
      method: 'GET',
      signal: signal
   });

   await validateResponse(response, 'An error occurred while fetching the expense categories');

   const resData = await response.json();
   return resData;
}

export async function createExpense(request) {
   const accessToken = getAccessToken();
   const response = await fetch(`${BASE_URL}/api/Expense/create`, {
      method: 'POST',
      headers: {
         'Authorization': `Bearer ${accessToken}`,
         'Content-Type': 'application/json'
      },
      body: JSON.stringify(request),
   });

   await validateResponse(response, 'Could not create expense record');
}

export async function updateExpense({id, request}) {
   const accessToken = getAccessToken();
   const response = await fetch(`${BASE_URL}/api/Expense/update/${id}`, {
      method: 'PUT',
      headers: {
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify(request),
   });

   await validateResponse(response, 'Could not update this expense record');
}

export async function deleteExpense(id) {
   const accessToken = getAccessToken();
   const response = await fetch(`${BASE_URL}/api/Expense/delete/${id}`, {
      method: 'DELETE',
      headers: {
         'Authorization': `Bearer ${accessToken}`
      }
   });

   await validateResponse(response, 'Could not delete this expense record');
}

