/* import colors from './charts/colors';
import { select } from 'd3-selection';

const refreshColorClassification = function () {
    let colorArr = colors.defaultColors(vis.subsFill);
    
    //COLORS FOR THE STACKS

    colorsNew = scaleOrdinal(vis.subsFill, colorArr);
};

let refreshBtn = document.getElementById('refresh-btn');
refreshBtn.addEventListener('click', () => {
    console.log('click');
    refreshColorClassification()
});
 */

 
/*     refreshColorClassification() {
        let labels = document.querySelectorAll('.svg-label');
        labels = Array.prototype.slice.call(labels);
        let rects = document.querySelectorAll(`[class^="stack"]`);
        rects = Array.prototype.slice.call(rects);
        let colorArr = colors.defaultColors(labels);
        for (let i = 0; i < labels.length; i++) {
            let labelClass = labels[i].classList[1];
            labels[i].style.fill = colorArr[i];
            for (let j = 0; j < rects.length; j++) {
                let rectsClass = rects[j].classList[0].replace('stack-', '');
                if (rectsClass.includes(labelClass)) {
                    rects[j].style.fill = colorArr[i];
                }
            }
        }
    } */