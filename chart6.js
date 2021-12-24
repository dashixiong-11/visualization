/*
import {DrawWave} from './util/DrawWave.js'
import {DrawTemp} from './util/DrawTemp.js'
*/


const Chart6 = {
    machineList: [],
    index: 0,
    myChart: echarts.init($('#chart-6')[0]),
    setOption: function () {
        const option = {
            series: [
                {
                    type: 'gauge',
                    startAngle: 225,
                    endAngle: -45,
                    min: 0,
                    max: 200,
                    splitNumber: 8,
                    axisLine: {
                        lineStyle: {
                            width: 6,
                            color: [
                                [0.25, '#FF6E76'],
                                [0.5, '#FDDD60'],
                                [0.75, '#58D9F9'],
                                [1, '#7CFFB2']
                            ]
                        }
                    },
                    pointer: {
                        icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
                        length: '12%',
                        width: 20,
                        offsetCenter: [0, '-60%'],
                        itemStyle: {
                            color: 'auto'
                        }
                    },
                    axisTick: {
                        length: 12,
                        lineStyle: {
                            color: 'auto',
                            width: 2
                        }
                    },
                    splitLine: {
                        length: 20,
                        lineStyle: {
                            color: 'auto',
                            width: 5
                        }
                    },
                    axisLabel: {
                        color: '#464646',
                        fontSize: 20,
                        distance: -60,
                    },
                    title: {
                        offsetCenter: [0, '-20%'],
                        fontSize: 30
                    },
                    detail: {
                        fontSize: 50,
                        offsetCenter: [0, '0%'],
                        valueAnimation: true,
                        formatter: function (value) {
                            return Math.round(value * 100) + 'pbb';
                        },
                        color: 'auto'
                    },
                    data: [
                        {
                            value: 0.7,
                            name: 'Grade Rating'
                        }
                    ]
                }
            ]
        };
    },
    render: function ({headerData, list}) {

    }
}
window.My_Chart6 = Chart6