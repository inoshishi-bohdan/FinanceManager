import PieChart from './PieChart'
import { fetchIncomeDistribution, fetchIncomeRecordPeriod } from '../../util/http';
import LoadingIndicator from '../ui/LoadingIndicator';
import useDistributionChart from '../../hooks/useDistributionChart';
import DistributionChartHeader from './DistributionChartHeader'

export default function IncomeDistributionChart() {
   const {
      chartData,
      recordPeriod: incomeRecordPeriod,
      selectedMonth,
      selectedYear,
      isLoadingChartData,
      isPendingRecordPeriod: isPendingIncomeRecordPeriod,
      handleSelectedMonthChange,
      handleSelectedYearChange
   } = useDistributionChart({
      chartQueryFn: fetchIncomeDistribution,
      chartQueryKey: ['incomes, income-distribution-statistic'],
      recordPeriodQueryFn: fetchIncomeRecordPeriod,
      recordPeriodQueryKey: ['incomes, income-record-period']
   });

   let content;

   if (isPendingIncomeRecordPeriod) {
      content = <LoadingIndicator />
   }

   if (incomeRecordPeriod) {
      content = <>
         <DistributionChartHeader
            title='Income Distribution'
            selectedYear={selectedYear}
            selectedMonth={selectedMonth}
            recordPeriod={incomeRecordPeriod}
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