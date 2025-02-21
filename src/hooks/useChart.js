import { useEffect, useState } from "react";
import { fetchCurrencies } from '../util/http';
import useMyQuery from "./useMyQuery";

export default function useChart({ chartQueryFn, chartQueryKey, recordPeriodQueryFn, recordPeriodQueryKey }) {
   const [selectedYear, setSelectedYear] = useState(null);
   const [selectedCurrency, setSelectedCurrency] = useState(null);

   const { isPending: isPendingRecordPeriod, data: recordPeriod } = useMyQuery(recordPeriodQueryFn, recordPeriodQueryKey);
   const { data: currencies, isPending: isPendingCurrencies } = useMyQuery(fetchCurrencies, ['currencies']);
   const { isLoading: isLoadingChartData, data: chartData } = useMyQuery(
      ({ signal, queryKey }) => chartQueryFn({
         signal: signal,
         request: queryKey[queryKey.length - 1]
      }),
      [...chartQueryKey, { currencyId: selectedCurrency, year: selectedYear }],
      !!(selectedYear && selectedCurrency));

   useEffect(() => {
      if (recordPeriod && recordPeriod.length > 0) {
         const latestYear = recordPeriod[recordPeriod.length - 1];
         setSelectedYear(latestYear);
      }
   }, [recordPeriod]);

   useEffect(() => {
      if (currencies && currencies.length > 0) {
         setSelectedCurrency(currencies[0].id);
      }
   }, [currencies]);

   function handleSelectedYearChange(event) {
      const year = Number(event.target.value)
      setSelectedYear(year);
   }

   function handleSelectedCurrencyChange(event) {
      const currencyId = Number(event.target.value)
      setSelectedCurrency(currencyId);
   }

   return ({
      chartData,
      recordPeriod,
      currencies,
      selectedCurrency,
      selectedYear,
      isLoadingChartData,
      isPendingCurrencies,
      isPendingRecordPeriod,
      handleSelectedCurrencyChange,
      handleSelectedYearChange
   });
}