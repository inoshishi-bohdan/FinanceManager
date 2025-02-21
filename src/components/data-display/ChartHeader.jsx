
export default function ChartHeader({ title, selectedYear, selectedCurrency, recordPeriod, currencies, onCurrencyChange, onYearChange }) {
   return (
      <div className='chart-header'>
         <p className="fs-2 fw-semibold m-0">{title}</p>
         <div className="d-flex gap-3">
            <select onChange={onYearChange} className="form-select" value={selectedYear} >
               <option disabled>Please select year</option>
               {recordPeriod.map(year => <option key={year} value={year}>
                  {year}
               </option>)}
            </select>
            <select onChange={onCurrencyChange} className="form-select" value={selectedCurrency} >
               <option disabled>Please select currency</option>
               {currencies.map(currency => <option key={currency.id} value={currency.id}>
                  {currency.name}
               </option>)}
            </select>
         </div>
      </div>
   );
}