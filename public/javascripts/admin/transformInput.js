import { dsvFormat } from 'd3-dsv';

export default {
    transform: function (reader) {
        let inputType = document.querySelector('.filetype:checked').value;
        let data;
        if (inputType === 'dsv') {
            let ssv = dsvFormat(';');
            let json = ssv.parse(reader.result, function (d) {
                return {
                    act_grp: d.ACT_GRP ? d.ACT_GRP : 'Not available',
                    grp: d.GRP ? d.GRP : 'Not available',
                    sub_grp: d.SUB_GRP ? d.SUB_GRP : 'Not available',
                    risk_ind: d.RISK_IND ? d.RISK_IND : 'Not available',
                    year: d.YEAR ? d.YEAR : 'Not available',
                    rel_value: d.REL_VALUE ? +d.REL_VALUE.replace(',', '.') : 'Not available',
                    weight: d.WEIGHT ? d.WEIGHT : 'Not available',
                    base: d.BASE ? d.BASE : 'Not available',
                };
            });
            data = JSON.parse(JSON.stringify(json));
            console.log(data);
        } else if (inputType === 'json') {
            data = JSON.parse(reader.result);
        } else {
            return false;
        }

        data.forEach(obj => {
            obj.year = +obj.year;
            obj.rel_value = +obj.rel_value;
        });

        return data;
    },
};
