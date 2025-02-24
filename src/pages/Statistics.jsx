import IncomeChart from "../components/data-display/IncomeChart";
import ExpenseChart from "../components/data-display/ExpenseChart";
import NetWorthChart from "../components/data-display/NetWorthChart";
import IncomeDistributionChart from "../components/data-display/IncomeDistributionChart";
import ExpenseDistributionChart from "../components/data-display/ExpenseDistributionChart";

export default function StatisticPage() {
   return (
      <>
         <h1 className="statistic-title">My Statistic</h1>
         <div className="chart-container">
            <IncomeChart />
            <IncomeDistributionChart />
            <ExpenseChart />
            <ExpenseDistributionChart />
            <NetWorthChart />
         </div>
      </>

   );
}