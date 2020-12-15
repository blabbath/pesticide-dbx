export default {
    yAxisLabel: 't/Jahr',

    color(arrTotal) {
        const grey = '#696c6b';
        const colorArr = [
            '#013935',
            '#025d57',
            '#028178',
            '#02a59a',
            '#02cabc',
            '#df5c06',
            '#fa6d10',
            '#fb8233',
            '#fd9856',
            '#feae79',
        ];
        let greyArr = [];
        for (let i = 0; i < arrTotal.length - colorArr.length; i++) {
            greyArr.push(grey);
        }
        const arr = [...colorArr, ...greyArr];
        return arr;
    },

    colorArrCrop: [
        '#013935',
        '#025d57',
        '#028178',
        '#02a59a',
        '#02cabc',
        '#02efde',
        '#17feee',

        '#df5c06',
        '#fa6d10',
        '#fb8233',
        '#fd9856',
        '#feae79',
        '#fec49d',
        '#ffd9c1',

        '#4d8211',
        '#60a314',
        '#73c418',
        '#86e51c',
        '#97e93b',
        '#a9ed5c',
        '#baf17c',
    ],
};
