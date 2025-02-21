import {
   VictoryChart,
   VictoryBar,
   VictoryTheme,
   VictoryTooltip
} from "victory";
import LoadingIndicator from "../ui/LoadingIndicator";

export default function BarChart({ chartData, isLoadingChartData }) {
   return (
      <div className="chart-body">
         {isLoadingChartData && <LoadingIndicator />}
         {chartData && <>
            <VictoryChart
               domainPadding={{ x: 15, y: 5 }}
               theme={VictoryTheme.clean}
            >
               <VictoryBar
                  data={chartData.map((d) => ({ x: d.month, y: d.totalAmount }),)}
                  animate={{ duration: 1000 }}
                  labelComponent={<VictoryTooltip />}
                  labels={({ datum }) => `total: ${datum.y}`}
               />
            </VictoryChart>
         </>}
      </div>
   );
}