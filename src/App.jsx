import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RootLayout from './pages/Root';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import RouterErrorPage from './pages/RouterError';
import HomePage from './pages/Home';
import IncomePage from './pages/Incomes';
import ExpensePage from './pages/Expenses';
import StatisticPage from './pages/Statistics';
import NavigateErrorPage from './pages/NavigateError';
import AuthenticationContextProvider from './store/authentication-context';
import ProtectedRoute from './components/ProtectedRoute';

const router = createBrowserRouter([
   {
      path: '/',
      element: <RootLayout />,
      errorElement: <RouterErrorPage />,
      children: [
         { index: true, element: <HomePage /> },
         {
            path: 'incomes',
            element: <ProtectedRoute />,
            children: [{ index: true, element: <IncomePage /> }]
         },
         {
            path: 'expenses',
            element: <ProtectedRoute />,
            children: [{ index: true, element: <ExpensePage /> }]
         },
         {
            path: 'statistics',
            element: <ProtectedRoute />,
            children: [{ index: true, element: <StatisticPage /> }]
         },
         { path: 'login', element: <LoginPage /> },
         { path: 'register', element: <RegisterPage /> },
         { path: 'error', element: <NavigateErrorPage /> },
      ],
   }
]);

function App() {
   return (
      <AuthenticationContextProvider>
         <RouterProvider router={router} />;
      </AuthenticationContextProvider>
   );
}

export default App
