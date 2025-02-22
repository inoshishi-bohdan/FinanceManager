import {
   VictoryChart,
   VictoryPie,
   VictoryTheme
} from "victory";
import LoadingIndicator from "../ui/LoadingIndicator";

export default function PieChart({ chartData, isLoadingChartData }) {
   return (
      <div className="chart-body">
         {isLoadingChartData && <LoadingIndicator />}
         {chartData && chartData.length === 0 && <>
            <p className="fs-2 m-0"> No Data</p>
         </>}
         {chartData && chartData.length > 0 && <VictoryPie
            data={chartData.map((d) => ({ x: d.categoryName, y: d.recordCount }))}
            innerRadius={50}
            padAngle={2} 
            labels={({ datum }) => `${datum.x}`} 
            theme={VictoryTheme.clean}    
         />}
      </div>
   );
}