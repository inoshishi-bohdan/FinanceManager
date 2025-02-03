import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RootLayout from './pages/Root';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import ErrorPage from './pages/Error';
import HomePage from './pages/Home';
import IncomePage from './pages/Incomes';
import ExpensesPage from './pages/Expenses';
import StatisticsPage from './pages/Statistics';
import { action as registerAction } from './pages/Register';
import { action as loginAction } from './pages/Login';

const router = createBrowserRouter([
   {
     path: '/',
     element: <RootLayout />,
     errorElement: <ErrorPage />,
     children: [
       { index: true, element: <HomePage /> },  
       {path: 'incomes', element: <IncomePage />},
       {path: 'expenses', element: <ExpensesPage />}    ,
       {path: 'statistics', element: <StatisticsPage />},
       {path: 'login', element: <LoginPage />, action: loginAction},
       {path: 'register', element: <RegisterPage />, action: registerAction} 
     ]
   }
 ]);


function App() {
   return <RouterProvider router={router} />;
}

export default App
