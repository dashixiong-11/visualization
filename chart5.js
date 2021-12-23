/*
import {DrawWave} from './util/DrawWave.js'
import {DrawTemp} from './util/DrawTemp.js'
*/


const Table = {
    node: null,
    headerOption: {},
    render: function ({headerData, list}) {
        const headerDataKeys = Object.keys(headerData)
        const $table = $('<table></table>')
        const $thead = $('<thead></thead>')
        const $tbody = $('<tbody></tbody>')
        const $tr = $('<tr></tr>')
        headerDataKeys.forEach(k => {
            $tr.append($(`<th>${headerData[k]}</th>`))
        })
        $thead.html($tr)
        list.forEach(l => {
            const $tr2 = $('<tr></tr>')
            for (let i = 0; i < headerDataKeys.length; i++) {
                $tr2.append($(`<td>${l[headerDataKeys[i]] ? l[headerDataKeys[i]] : ' -'}</td>`))
            }
            $tbody.append($tr2)
        })
        $table.html($thead).append($tbody)
        $('#my-table').html($table)
    }
}
window.My_Table = Table