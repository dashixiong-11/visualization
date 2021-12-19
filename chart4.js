import {DrawWave} from './util/DrawWave.js'
import {DrawTemp} from './util/DrawTemp.js'

export const Chart4 = {
    render: function ({humidity, temp}) {
        DrawWave(humidity)
        DrawTemp(temp)
    }
}