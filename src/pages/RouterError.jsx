import MainNavigation from '../components/layout/MainNavigation/MainNavigation';
import PageContent from '../components/layout/PageContent/PageContent';
import { useRouteError } from 'react-router-dom';

export default function RouterErrorPage() {
   const error = useRouteError();

   let title = 'An error occurred!';
   let message = 'Something went wrong';

   if (error) {
      // Handle React Router errors (thrown by loaders/actions)
      switch (error.status) {
          case 401:
              title = 'Unauthorized!';
              message = error?.data?.message ?? "Authentication is required.";
              break;
          case 404:
              title = 'Not Found!';
              message = error?.data?.message ?? "Can't find the resource or page.";
              break;
          case 500:
              title = 'Server Error!';
              message = error?.data?.message ?? "A server error occurred.";
              break;
          default:
              message = error.message || "An unknown error occurred.";
      }
  }

   return (
      <>
         <MainNavigation />
         <main>
            <PageContent title={title}>
               <p>{message}</p>
            </PageContent>
         </main>
      </>
   );
}