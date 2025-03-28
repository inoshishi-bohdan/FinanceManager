import { useContext } from "react";
import PageContent from "../components/layout/PageContent/PageContent";
import { AuthContext } from '../store/authentication-context';
import incomePicture from '../assets/income.jpg'
import expensePicture from '../assets/expense.jpg'
import statisticPicture from '../assets/statistic.jpg'
import InfoCard from "../components/ui/InfoCard/InfoCard";
import useMyQuery from '../hooks/useMyQuery';
import { BASE_URL, fetchMyProfileInfo, fetchProfileImage } from '../util/http'
import LoadingIndicator from '../components/ui/LoadingIndicator/LoadingIndicator';
import { motion } from "framer-motion";

export default function HomePage() {
   const { isAuthenticated } = useContext(AuthContext);
   const { data: profileInfo, isPending: isPendingMyProfileInfo } = useMyQuery(
      fetchMyProfileInfo,
      ['my-profile-info'],
      isAuthenticated);
   const { data: profileImage, isPending: isPendingMyProfileImage } = useMyQuery(
      ({ signal, queryKey }) => fetchProfileImage({
         signal: signal,
         id: queryKey[queryKey.length - 1].id
      }),
      ['my-profile-image', { id: profileInfo?.profileImageId }],
      !!(profileInfo?.profileImageId && isAuthenticated)
   );

   let content;

   if (isAuthenticated) {
      if (isPendingMyProfileImage || isPendingMyProfileInfo) {
         content = <LoadingIndicator />
      }

      if (profileInfo && profileImage) {
         content = <>
            <motion.img
            initial={{opacity: 0, scale: 0}}
            animate={{opacity: 1, scale: 1}}
            transition={{duration: 0.5 }} 
            className="main-profile-image"
              src={`${BASE_URL}/images/${profileImage.path}`}
               alt={profileImage.caption} />
            <motion.h1
               initial={{ x: -20, opacity: 0 }}
               animate={{ x: 0, opacity: 1 }}
               transition={{ duration: 0.5 }}
               className="text-white text-center"
            >Welcome, {profileInfo.userName}</motion.h1>
            <motion.h4
               initial={{ x: 20, opacity: 0 }}
               animate={{ x: 0, opacity: 1 }}
               transition={{ duration: 0.5 }}
               className="text-white  text-center"
            >Let's organise your finances</motion.h4>
         </>
      }
   } else {
      content = <PageContent title='Welcome to Finance Manager' subtitle='Please login or sign up to start your work'>
         <div className="card-container">
            <InfoCard
               src={incomePicture}
               alt='income'
               text="Elevate your financial management with our Incomes page. Easily add, organize, and analyze your sources of income, providing you with a comprehensive overview of your financial success."
            />
            <InfoCard
               src={expensePicture}
               alt='expense'
               text="Effortlessly manage, categorize, and track your expenses with our intuitive web app. Add, update, and delete transactions with ease, ensuring a streamlined financial experience."
            />
            <InfoCard
               src={statisticPicture}
               alt='statistic chart'
               text="Unlock insights into your financial journey with our Statistics page. Visualize your income, expenses, and net worth through interactive charts, empowering you to make informed decisions and achieve your financial goals."
            />
         </div>
      </PageContent>
   }

   return (
      content
   );
}