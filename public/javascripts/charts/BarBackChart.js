export default class BarBackChart {
    constructor(
        _parentElement,
        _risk,
        yMax
    ) {
        this.parentElement = _parentElement;
        this.risk = _risk;
        this.yMax = yMax;
        this.initVis();
    }

    setYMax(yMax) {
        this.yMax = yMax;
    }
}
