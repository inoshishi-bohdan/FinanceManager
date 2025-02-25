import { useContext } from "react";
import PageContent from "../components/layout/PageContent";
import { AuthContext } from '../store/authentication-context';
import incomePicture from '../assets/income.jpg'
import expensePicture from '../assets/expense.jpg'
import statisticPicture from '../assets/statistic.jpg'
import InfoCard from "../components/ui/InfoCard";

export default function HomePage() {
   const { isAuthenticated } = useContext(AuthContext);

   let content;

   if (isAuthenticated) {

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