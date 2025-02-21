import BarChart from './BarChart'
import useChart from '../../hooks/useChart';
import { fetchIncomeStatistic, fetchIncomeRecordPeriod } from '../../util/http';
import ChartHeader from './ChartHeader';
import LoadingIndicator from '../ui/LoadingIndicator';

export default function IncomeChart() {
   const {
      chartData,
      currencies,
      recordPeriod: incomeRecordPeriod,
      selectedCurrency,
      selectedYear,
      isLoadingChartData,
      isPendingCurrencies,
      isPendingRecordPeriod: isPendingIncomeRecordPeriod,
      handleSelectedCurrencyChange,
      handleSelectedYearChange
   } = useChart({
      chartQueryFn: fetchIncomeStatistic,
      chartQueryKey: ['incomes, income-statistic'],
      recordPeriodQueryFn: fetchIncomeRecordPeriod,
      recordPeriodQueryKey: ['income-record-period']
   });

   let content;

   if (isPendingCurrencies || isPendingIncomeRecordPeriod) {
      content = <LoadingIndicator />
   }

   if (currencies && incomeRecordPeriod) {
      content = <>
         <ChartHeader
            title='Income'
            selectedYear={selectedYear}
            selectedCurrency={selectedCurrency}
            recordPeriod={incomeRecordPeriod}
            currencies={currencies}
            onCurrencyChange={handleSelectedCurrencyChange}
            onYearChange={handleSelectedYearChange}
         />
         <BarChart isLoadingChartData={isLoadingChartData} chartData={chartData} />
      </>
   }

   return (
      <div className='chart'>
         {content}
      </div>
   );
}