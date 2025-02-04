import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RootLayout from './pages/Root';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import RouterErrorPage from './pages/RouterError';
import HomePage from './pages/Home';
import IncomePage from './pages/Incomes';
import ExpensesPage from './pages/Expenses';
import StatisticsPage from './pages/Statistics';
import { createContext, useState } from 'react';
import NavigateErrorPage from './pages/NavigateError';


export const AuthContext = createContext();

const router = createBrowserRouter([
   {
      path: '/',
      element: <RootLayout />,
      errorElement: <RouterErrorPage />,
      children: [
         { index: true, element: <HomePage /> },
         { path: 'incomes', element: <IncomePage /> },
         { path: 'expenses', element: <ExpensesPage /> },
         { path: 'statistics', element: <StatisticsPage /> },
         { path: 'login', element: <LoginPage /> },
         { path: 'register', element: <RegisterPage /> },
         { path: 'error', element: <NavigateErrorPage /> }
      ]
   }
]);

function App() {
   const [isAuthenticated, setIsAuthenticated] = useState(localStorage.accessToken ? true : false);

   function changeIsAuthenticated(value) {
      setIsAuthenticated(value);

      if (value === false) {
         localStorage.clear();
      }
   }

   return <AuthContext.Provider value={[isAuthenticated, changeIsAuthenticated]}>
      <RouterProvider router={router} />;
   </AuthContext.Provider>
}

export default App
