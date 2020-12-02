import BarBackChart from './ChartClass';
import initVis from './chartInit';
import wrangleData from './chartWrangle';
import updateVis from './chartUpdate';

BarBackChart.prototype.initVis = initVis;
BarBackChart.prototype.wrangleData = wrangleData;
BarBackChart.prototype.updateVis = updateVis; 

export default BarBackChart;
