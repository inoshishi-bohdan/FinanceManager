import MainNavigation from '../components/MainNavigation.jsx'
import { Outlet } from 'react-router-dom'
import { ToastContainer, Bounce } from 'react-toastify';
import useRefresh from '../hooks/useRefresh.js';

export default function RootLayout() {
   useRefresh();
   // const navigation = useNavigation();

   return (
      <>
         <MainNavigation />
         <ToastContainer
            position="bottom-center"
            autoClose={2500}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable
            pauseOnHover
            theme="colored"
            transition={Bounce}
         />
         <main>
            {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
            <Outlet />
         </main>
      </>
   );
}