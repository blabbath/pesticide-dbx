export default function (compare, data) {
    let dataA = [];
    let dataB = [];
    let scatterData = [];
    data.forEach(item => {
        item.risk_ind === 'figureA' ? dataA.push(item) : dataB.push(item);
    });
    dataA.forEach(item => {
        let obj = {};
        obj.year = item['year'];
        obj.x = item['rel_value'];
        obj.indicatorA = item['json_featuretype'];
        obj.sub = item['sub_grp'];
        scatterData.push(obj);
    });
    scatterData.forEach((item, i) => {
        let found = dataB.find(
            element => item.sub === element.sub_grp && item.year === element.year
        );
        if (found) {
            item.y = found['rel_value'] ? found['rel_value'] : undefined;
            item.indicatorB = found['json_featuretype'] ? found['json_featuretype'] : undefined;
        }
    });
    scatterData = scatterData.filter(item => item.hasOwnProperty('y') && item.hasOwnProperty('x'));
    compare.forEach(chart => chart.compareChart.wrangleData(scatterData));
}
