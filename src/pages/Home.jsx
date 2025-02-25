import { useContext } from "react";
import PageContent from "../components/layout/PageContent";
import { AuthContext } from '../store/authentication-context';
import incomePicture from '../assets/income.jpg'
import expensePicture from '../assets/expense.jpg'
import statisticPicture from '../assets/statistic.jpg'
import InfoCard from "../components/ui/InfoCard";
import useMyQuery from '../hooks/useMyQuery';
import { BASE_URL, fetchMyProfileInfo, fetchProfileImage, fetchProfileImages } from '../util/http'
import LoadingIndicator from '../components/ui/LoadingIndicator';

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
            <img className="main-profile-image" src={`${BASE_URL}/images/${profileImage.path}`} alt={profileImage.caption} />
            <h1 className="text-white">Welcome, {profileInfo.userName}</h1>
            <h4 className="text-white">Let's organise your finances</h4>
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