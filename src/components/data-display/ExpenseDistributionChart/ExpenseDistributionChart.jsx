import PieChart from '../PieChart/PieChart'
import { fetchExpenseDistribution, fetchExpenseRecordPeriod } from '../../../util/http';
import LoadingIndicator from '../../ui/LoadingIndicator/LoadingIndicator';
import useDistributionChart from '../../../hooks/useDistributionChart';
import DistributionChartHeader from '../DistributionChartHeader/DistributionChartHeader'

export default function ExpenseDistributionChart() {
   const {
      chartData,
      recordPeriod: expenseRecordPeriod,
      selectedMonth,
      selectedYear,
      isLoadingChartData,
      isPendingRecordPeriod: isPendingExpenseRecordPeriod,
      handleSelectedMonthChange,
      handleSelectedYearChange
   } = useDistributionChart({
      chartQueryFn: fetchExpenseDistribution,
      chartQueryKey: ['expenses, expense-distribution-statistic'],
      recordPeriodQueryFn: fetchExpenseRecordPeriod,
      recordPeriodQueryKey: ['expenses, expense-record-period']
   });

   let content;

   if (isPendingExpenseRecordPeriod) {
      content = <LoadingIndicator />
   }

   if (expenseRecordPeriod) {
      content = <>
         <DistributionChartHeader
            title='Expense Distribution'
            selectedYear={selectedYear}
            selectedMonth={selectedMonth}
            recordPeriod={expenseRecordPeriod}
            onMonthChange={handleSelectedMonthChange}
            onYearChange={handleSelectedYearChange}
         />
         <PieChart isLoadingChartData={isLoadingChartData} chartData={chartData} />
      </>
   }

   return (
      <div className='chart'>
         {content}
      </div>
   );

}