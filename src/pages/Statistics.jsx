import IncomeChart from "../components/data-display/IncomeChart";
import ExpenseChart from "../components/data-display/ExpenseChart";
import NetWorthChart from "../components/data-display/NetWorthChart";
import IncomeDistributionChart from "../components/data-display/IncomeDistributionChart";
import ExpenseDistributionChart from "../components/data-display/ExpenseDistributionChart";

export default function StatisticPage() {
   return (
      <div className="chart-container">
         <IncomeChart />
         <IncomeDistributionChart />
         <ExpenseChart />
         <ExpenseDistributionChart />
         <NetWorthChart />
      </div>
   );
}