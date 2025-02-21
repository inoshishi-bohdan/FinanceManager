import BarChart from './BarChart'
import useChart from '../../hooks/useChart';
import { fetchExpenseStatistic, fetchExpenseRecordPeriod } from '../../util/http';
import ChartHeader from './ChartHeader';
import LoadingIndicator from '../ui/LoadingIndicator';

export default function ExpenseChart() {
   const {
      chartData,
      currencies,
      recordPeriod: expenseRecordPeriod,
      selectedCurrency,
      selectedYear,
      isLoadingChartData,
      isPendingCurrencies,
      isPendingRecordPeriod: isPendingExpenseRecordPeriod,
      handleSelectedCurrencyChange,
      handleSelectedYearChange
   } = useChart({
      chartQueryFn: fetchExpenseStatistic,
      chartQueryKey: ['expenses, expense-statistic'],
      recordPeriodQueryFn: fetchExpenseRecordPeriod,
      recordPeriodQueryKey: ['expense-record-period']
   });

   let content;

   if (isPendingCurrencies || isPendingExpenseRecordPeriod) {
      content = <LoadingIndicator />
   }

   if (currencies && expenseRecordPeriod) {
      content = <>
         <ChartHeader
            title='Expense'
            selectedYear={selectedYear}
            selectedCurrency={selectedCurrency}
            recordPeriod={expenseRecordPeriod}
            currencies={currencies}
            onCurrencyChange={handleSelectedCurrencyChange}
            onYearChange={handleSelectedYearChange}
         />
         <BarChart isLoadingChartData={isLoadingChartData} chartData={chartData} title='Expese' />
      </>;
   }

   return (
      <div className='chart'>
         {content}
      </div>
   );
}