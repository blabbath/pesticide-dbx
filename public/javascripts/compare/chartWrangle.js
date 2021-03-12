export default function wrangleData(scatterData) {
    //BACK DATA
    let vis = this;
    vis.scatterData = scatterData
    vis.getMax(scatterData)

    vis.updateChart()
}
