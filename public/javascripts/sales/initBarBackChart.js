import BarBackChart from '../charts/BarBackChart';
import chartParams from './chartParams';
import { charts, selectorCharts, headerCharts } from './BarBackChartParameter';
import Select from '../charts/Select';
let select = new Select();

charts.forEach((chart, i) => {
    if (!chart.barBackChart)
        chart.barBackChart = new BarBackChart(selectorCharts[i], headerCharts[i], chartParams);
});

export { select, charts };
