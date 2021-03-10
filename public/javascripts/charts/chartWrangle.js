import { scaleOrdinal } from 'd3-scale';
import { stack, stackOffsetNone, stackOrderNone } from 'd3-shape';
import colors from './colors';

export default function wrangleData() {
    //BACK DATA
    let vis = this;
    console.log('here')
    console.log(vis.nestedBackData)
    for (let i = 0; i < vis.nestedBackData.length; i++) {
        if (vis.nestedBackData[i].key === vis.risk) {
            vis.datafiltered = vis.nestedBackData[i].values;
        }
    }

    vis.minYear = Math.min(...[...new Set(vis.datafiltered.map(item => item.year))]);
    vis.maxYear = Math.max(...[...new Set(vis.datafiltered.map(item => item.year))]);
    function range(start, stop) {
        let range = [];
        const length = stop - start;
        for (let i = 0; i <= length; i++) {
            range[i] = start;
            start++;
        }
        return range;
    }

    vis.range = range(vis.minYear, vis.maxYear);

    function fillYears(arr, range, fillVal) {
        const arrYear = [...new Set(arr.map(item => item.year))].sort();
        const gaps = range.filter(val => !arrYear.includes(val));
        for (const e of gaps) {
            let obj = {};
            obj.year = e;
            obj.rel_value = fillVal;
            arr.push(obj);
        }
        arr.sort((a, b) => a.year - b.year);
        return arr;
    }

    vis.datafiltered = fillYears(vis.datafiltered, vis.range, 0);

    //FRONT DATA
    function transformFront(data) {
        let trans = {};
        let transItem;
        data.forEach((i, idx) => {
            if (i.year in trans) {
                transItem = trans[i.year];
            } else {
                transItem = {};
                transItem.year = i.year;
            }
            transItem[i.sub_grp] = i.rel_value;
            trans[i.year] = transItem;
        });
        let result = [];
        for (let i in trans) result.push(trans[i]);
        return result;
    }

    function fillGapsFront(arr, range, subs, fillVal) {
        //First add year if missing;
        const arrYear = [...new Set(arr.map(item => item.year))].sort();
        const yearGaps = range.filter(val => !arrYear.includes(val));
        for (const e of yearGaps) {
            let obj = {};
            obj.year = e;
            arr.push(obj);
        }
        //Then add subgrps if missing
        arr.forEach(obj => {
            const arrKeys = Object.keys(obj).filter(e => e != 'year');
            const arrGaps = subs.filter(val => !arrKeys.includes(val));
            arrGaps.forEach(e => {
                obj[`${e}`] = fillVal;
            });
        });
        arr.sort((a, b) => a.year - b.year);
        return arr;
    }

    vis.dataFront = [];
    for (let i = 0; i < vis.frontData.length; i++) {
        if (vis.frontData[i].risk_ind === vis.risk) vis.dataFront.push(vis.frontData[i]);
    }
    vis.dataFront = vis.dataFront.sort((a, b) => a.year - b.year);
    vis.dataStack = transformFront(vis.dataFront); //Prepare data for d3.stack()
    vis.dataStack = fillGapsFront(vis.dataStack, vis.range, vis.subsFill, 0);

    vis.stack = stack().keys(vis.subsFill).order(stackOrderNone).offset(stackOffsetNone);

    vis.stackData = vis.stack(vis.dataStack);

    function compareValues(key, order = 'asc') {
        return function innerSort(a, b) {
            if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
                // property doesn't exist on either object
                return 0;
            }

            const varA = typeof a[key] === 'string' ? a[key].toUpperCase() : a[key];
            const varB = typeof b[key] === 'string' ? b[key].toUpperCase() : b[key];

            let comparison = 0;
            if (varA > varB) {
                comparison = 1;
            } else if (varA < varB) {
                comparison = -1;
            }
            return order === 'desc' ? comparison * -1 : comparison;
        };
    }

    vis.stackData.sort(compareValues('key'));
    let colorArr = colors.defaultColors(vis.subsFill);
    //COLORS FOR THE STACKS
    if (vis.datafiltered[0].grp === 'Kulturgruppen') {
        vis.colors = scaleOrdinal(vis.subsFill, colors.colorCrops);
    } else {
        vis.colors = scaleOrdinal(vis.subsFill, colorArr);
    }
    vis.updateVis();
}
