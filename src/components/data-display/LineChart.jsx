import {
   VictoryChart,
   VictoryLine,
   VictoryTheme,
   VictoryTooltip,
   VictoryVoronoiContainer
} from "victory";
import LoadingIndicator from "../ui/LoadingIndicator";

export default function LineChart({ chartData, isLoadingChartData }) {
   return (<div className="chart-body">
      {isLoadingChartData && <LoadingIndicator />}
      {chartData && <>
         <VictoryChart
            domainPadding={{ x: 15, y: 5 }}
            theme={VictoryTheme.clean}
            containerComponent={
               <VictoryVoronoiContainer
                  voronoiDimension="x"
                  labels={({ datum }) =>
                     `total : ${datum.y}`
                  }
                  labelComponent={
                     <VictoryTooltip />
                  }
               />
            }
         >
            <VictoryLine
               data={chartData.map((d) => ({ x: d.month, y: d.totalAmount }))}
               interpolation='natural'
               animate={{ duration: 1000 }}
            />
         </VictoryChart>
      </>}
   </div>
   );
}