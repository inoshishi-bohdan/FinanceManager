import BarChart from '../BarChart/BarChart'
import useChart from '../../../hooks/useChart';
import { fetchIncomeStatistic, fetchIncomeRecordPeriod } from '../../../util/http';
import ChartHeader from '../ChartHeader/ChartHeader';
import LoadingIndicator from '../../ui/LoadingIndicator/LoadingIndicator';

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
      recordPeriodQueryKey: ['incomes, income-record-period']
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