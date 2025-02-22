import { useEffect, useState } from "react";
import useMyQuery from "./useMyQuery";

export default function useDistributionChart({ chartQueryFn, chartQueryKey, recordPeriodQueryFn, recordPeriodQueryKey }) {
      const [selectedYear, setSelectedYear] = useState(null);
      const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
   
      const { isPending: isPendingRecordPeriod, data: recordPeriod } = useMyQuery(recordPeriodQueryFn, recordPeriodQueryKey);
      const { isLoading: isLoadingChartData, data: chartData } = useMyQuery(
         ({ signal, queryKey }) => chartQueryFn({
            signal: signal,
            request: queryKey[queryKey.length - 1]
         }),
         [...chartQueryKey, { month: selectedMonth, year: selectedYear }],
         !!(selectedYear && selectedMonth));
   
      useEffect(() => {
         if (recordPeriod && recordPeriod.length > 0) {
            const latestYear = recordPeriod[recordPeriod.length - 1];
            setSelectedYear(latestYear);
         }
      }, [recordPeriod]);
      
      function handleSelectedYearChange(event) {
         const year = Number(event.target.value)
         setSelectedYear(year);
      }
   
      function handleSelectedMonthChange(event) {
         const currencyId = Number(event.target.value)
         setSelectedMonth(currencyId);
      }
   
   return {
      selectedMonth,
      selectedYear,
      chartData,
      recordPeriod,
      isLoadingChartData,
      isPendingRecordPeriod,
      handleSelectedYearChange,
      handleSelectedMonthChange
   };
}