import { useLocation } from 'react-router-dom';
import MainNavigation from '../components/MainNavigation';
import PageContent from '../components/PageContent';

export default function NavigateErrorPage() {
   const location = useLocation();

   let title = 'An error occurred!';
   let message = 'Something went wrong';
   let status = location.state?.status;

   if (location.state) {
      status = status || 500; // Fallback if status is missing

      switch (status) {
         case 401:
            title = 'Unauthorized!';
            message = location.state?.message ?? "Authentication is required.";
            break;
         case 404:
            title = 'Not Found!';
            message = location.state?.message ?? "Can't find the resource or page.";
            break;
         case 500:
            title = 'Server Error!';
            message = location.state?.message ?? "A server error occurred.";
            break;
         default:
            message = location.state.message || "An unknown error occurred.";
      }
   }

   return (
      <>
         <MainNavigation />
         <PageContent title={title}>
            <p>{message}</p>
         </PageContent>
      </>
   );
}
