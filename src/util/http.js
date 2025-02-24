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

export async function updateIncome({ id, request }) {
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

export async function updateExpense({ id, request }) {
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

export async function fetchIncomeStatistic({ signal, request }) {
   const accessToken = getAccessToken();
   const response = await fetch(`${BASE_URL}/api/Statistic/income`, {
      method: 'POST',
      signal: signal,
      headers: {
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify(request)
   });

   await validateResponse(response, 'An error occurred while fetching the income statistic');

   const resData = await response.json();
   return resData;
}

export async function fetchExpenseStatistic({ signal, request }) {
   const accessToken = getAccessToken();
   const response = await fetch(`${BASE_URL}/api/Statistic/expense`, {
      method: 'POST',
      signal: signal,
      headers: {
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify(request)
   });

   await validateResponse(response, 'An error occurred while fetching the expense statistic');

   const resData = await response.json();
   return resData;
}

export async function fetchNetWorthStatistic({ signal, request }) {
   const accessToken = getAccessToken();
   const response = await fetch(`${BASE_URL}/api/Statistic/netWorth`, {
      method: 'POST',
      signal: signal,
      headers: {
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify(request)
   });

   await validateResponse(response, 'An error occurred while fetching the net worth statistic');

   const resData = await response.json();
   return resData;
}

export async function fetchIncomeDistribution({ signal, request }) {
   const accessToken = getAccessToken();
   const response = await fetch(`${BASE_URL}/api/Statistic/incomeDistribution`, {
      method: 'POST',
      signal: signal,
      headers: {
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify(request)
   });

   await validateResponse(response, 'An error occurred while fetching the income distribution statistic');

   const resData = await response.json();
   return resData;
}

export async function fetchExpenseDistribution({ signal, request }) {
   const accessToken = getAccessToken();
   const response = await fetch(`${BASE_URL}/api/Statistic/expenseDistribution`, {
      method: 'POST',
      signal: signal,
      headers: {
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify(request)
   });

   await validateResponse(response, 'An error occurred while fetching the expense distribution statistic');

   const resData = await response.json();
   return resData;
}

export async function fetchIncomeRecordPeriod({ signal }) {
   const accessToken = getAccessToken();
   const response = await fetch(`${BASE_URL}/api/Statistic/getIncomeRecordPeriod`, {
      method: 'GET',
      signal: signal,
      headers: {
         'Authorization': `Bearer ${accessToken}`
      }
   });

   await validateResponse(response, 'An error occurred while fetching the income record period');

   const resData = await response.json();
   return resData;
}

export async function fetchExpenseRecordPeriod({ signal }) {
   const accessToken = getAccessToken();
   const response = await fetch(`${BASE_URL}/api/Statistic/getExpenseRecordPeriod`, {
      method: 'GET',
      signal: signal,
      headers: {
         'Authorization': `Bearer ${accessToken}`
      }
   });

   await validateResponse(response, 'An error occurred while fetching the expense record period');

   const resData = await response.json();
   return resData;
}

export async function fetchProfileImage({ signal, id }) {
   const response = await fetch(`${BASE_URL}/api/ProfileImage/${id}`, {
      method: 'GET',
      signal: signal
   });

   await validateResponse(response, `An error occurred while fetching profile image with ID ${id}`);

   const resData = await response.json();
   return resData;
}

export async function fetchProfileImages({ signal }) {
   const response = await fetch(`${BASE_URL}/api/ProfileImage/getList`, {
      method: 'GET',
      signal: signal
   });

   await validateResponse(response, 'An error occurred while fetching available profile images');

   const resData = await response.json();
   return resData;
}

export async function fetchMyProfileInfo({ signal }) {
   const accessToken = getAccessToken();
   const response = await fetch(`${BASE_URL}/api/User/getMyInfo`, {
      method: 'GET',
      signal: signal,
      headers: {
         'Authorization': `Bearer ${accessToken}`
      }
   });

   await validateResponse(response, 'An error occurred while fetching your user data');

   const resData = await response.json();
   return resData;
}

export async function updateMyProfileInfo(request) {
   const accessToken = getAccessToken();
   const response = await fetch(`${BASE_URL}/api/User/updateMyInfo`, {
      method: 'PUT',
      headers: {
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify(request),
   });

   await validateResponse(response, 'Could not update your user information');
}

export async function deleteMyAccount() {
   const accessToken = getAccessToken();
   const response = await fetch(`${BASE_URL}/api/User/deleteMyAccount/`, {
      method: 'DELETE',
      headers: {
         'Authorization': `Bearer ${accessToken}`
      }
   });

   await validateResponse(response, 'Could not delete your user account');
}