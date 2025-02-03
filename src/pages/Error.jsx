import MainNavigation from '../components/MainNavigation';
import PageContent from '../components/PageContent'
import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {
   const error = useRouteError();
   let title = 'An error occured!';
   let message = 'Something went wrong';


   if (error.status === 401) {
      title = 'Unauthorized!';
      message = error?.data?.message ?? "Authentication is required";
   }

   if (error.status === 404) {
      title = 'Not Found!';
      message = error?.data?.message ?? "Can't find the resource or page";
   }

   if (error.status === 500) {
      title = 'Server Error!';
      message = error?.data?.message ?? "A server error occurred.";
   }

   return <>
      <MainNavigation />
      <main>
         <PageContent title={title}>
            <p>{message}</p>
         </PageContent>
      </main>
   </>
}