import LineChart from './LineChart'
import useChart from '../../hooks/useChart';
import { fetchNetWorthStatistic, fetchIncomeRecordPeriod } from '../../util/http';
import ChartHeader from './ChartHeader';
import LoadingIndicator from '../ui/LoadingIndicator';

export default function NetWorthChart() {
      const {
         chartData,
         currencies,
         recordPeriod: netWorthRecordPeriod,
         selectedCurrency,
         selectedYear,
         isLoadingChartData,
         isPendingCurrencies,
         isPendingRecordPeriod: isPendingNetWorthRecordPeriod,
         handleSelectedCurrencyChange,
         handleSelectedYearChange
      } = useChart({
         chartQueryFn: fetchNetWorthStatistic,
         chartQueryKey: ['incomes, expenses, net-worth-statistic'],
         recordPeriodQueryFn: fetchIncomeRecordPeriod,
         recordPeriodQueryKey: ['net-worth-record-period']
      });
   
      let content;
   
      if (isPendingCurrencies || isPendingNetWorthRecordPeriod) {
         content = <LoadingIndicator />;
      }
   
      if (currencies && netWorthRecordPeriod) {
         content = <>
            <ChartHeader
               title='Net Worth'
               selectedYear={selectedYear}
               selectedCurrency={selectedCurrency}
               recordPeriod={netWorthRecordPeriod}
               currencies={currencies}
               onCurrencyChange={handleSelectedCurrencyChange}
               onYearChange={handleSelectedYearChange}
            />
            <LineChart isLoadingChartData={isLoadingChartData} chartData={chartData} />
         </>
      }
   
      return (
         <div className='chart'>
            {content}
         </div>
      );
}