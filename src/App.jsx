import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RootLayout from './pages/Root';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import RouterErrorPage from './pages/RouterError';
import HomePage from './pages/Home';
import NavigateErrorPage from './pages/NavigateError';
import AuthenticationContextProvider from './store/authentication-context';
import ProtectedRoute from './components/layout/ProtectedRoute';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './util/http';
import { lazy, Suspense } from 'react';
import LoadingIndicator from './components/ui/LoadingIndicator';

const IncomePage = lazy(() => import('./pages/Incomes'));
const ExpensePage = lazy(() => import('./pages/Expenses'));
const StatisticPage = lazy(() => import('./pages/Statistics'));
const SettingPage = lazy(() => import('./pages/Settings'));

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
            children: [{
               index: true, element: (
                  <Suspense fallback={<LoadingIndicator />}>
                     < IncomePage />
                  </Suspense>
               )
            }]
         },
         {
            path: 'expenses',
            element: <ProtectedRoute />,
            children: [{
               index: true, element: (
                  <Suspense fallback={<LoadingIndicator />}>
                     <ExpensePage />
                  </Suspense>
               )
            }]
         },
         {
            path: 'statistics',
            element: <ProtectedRoute />,
            children: [{
               index: true, element: (
                  <Suspense fallback={<LoadingIndicator />}>
                     <StatisticPage />
                  </Suspense>
               )
            }]
         },
         {
            path: 'settings',
            element: <ProtectedRoute />,
            children: [{
               index: true, element: (
                  <Suspense fallback={<LoadingIndicator />}>
                     <SettingPage />
                  </Suspense>
               )
            }]
         },
         { path: 'login', element: <LoginPage /> },
         { path: 'register', element: <RegisterPage /> },
         { path: 'error', element: <NavigateErrorPage /> },
      ],
   }
]);


function App() {
   return (
      <QueryClientProvider client={queryClient}>
         <AuthenticationContextProvider>
            <RouterProvider router={router} />;
         </AuthenticationContextProvider>
      </QueryClientProvider>
   );
}

export default App
