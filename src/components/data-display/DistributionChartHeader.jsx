import { monthNumberToString, MONTHS } from "../../util/mapping";

export default function DistributionChartHeader({ title, selectedYear, selectedMonth, recordPeriod, onMonthChange, onYearChange }) {
   return (
      <div className='chart-header'>
         <p className="fs-2 fw-semibold m-0">{title}</p>
         <div className="d-flex gap-3">
            <select onChange={onYearChange} className="form-select" value={selectedYear ?? ''} >
               <option value='' disabled>Please select year</option>
               {recordPeriod.map(year => <option key={year} value={year}>
                  {year}
               </option>)}
            </select>
            <select onChange={onMonthChange} className="form-select" value={selectedMonth ?? ''} >
               <option value='' disabled>Please select month</option>
               {MONTHS.map(monthNumber => <option key={monthNumber} value={monthNumber}>
                  {monthNumberToString(monthNumber)}
               </option>)}
            </select>
         </div>
      </div>
   );
}