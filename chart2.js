const Chart2 = {
    machineList: [],
    index: 0,
    myChart: echarts.init($('#chart-2')[0]),
    setTitle: function (name) {
        $('#name2').text(name)
    },
    _render: function () {
        this.setTitle(this.machineList[this.index].name)
    },
    loopOptions: function ({value, title, unit, center, max = 100}) {
        return {
            type: 'gauge',
            progress: {
                show: true,
                width: px(10),
                itemStyle: {
                    color: 'rgb(84,112,198)'
                }
            },
            startAngle: 90,
            endAngle: -270,
            center: center,
            min: 0,
            max: max,
            radius: '70%',
            axisLine: {
                lineStyle: {
                    width: px(10),
                }
            },
            axisTick: {
                show: false
            },
            splitLine: {
                show: false,
            },
            axisLabel: {
                show: false,
            },
            pointer: {
                show: false
            },
            anchor: {
                show: false,
            },
            title: {
                show: true,
                offsetCenter: [0, '20%'],
                color: '#eee'
            },
            detail: {
                fontSize: px(18),
                offsetCenter: [0, 0],
                valueAnimation: true,
                formatter: function (value) {
                    return Math.round(value) + unit;
                },
                color: '#eee'
            },
            data: [
                {
                    value: value,
                    name: title,
                    title: {
                        color: '#eee',
                        fontWeight: 'bold',
                        offsetCenter: [0, '130%'],
                    }
                }
            ]
        }
    },
    prev: function (callback) {
        this.index--
        if (this.index < 0) {
            this.index += 1
        } else {
            this._render()
            callback(this.machineList[this.index])
        }
    },
    next: function (callback) {
        this.index++
        if (this.index >= this.machineList.length) {
            this.index -= 1
        } else {
            this._render()
            callback(this.machineList[this.index])
        }
    },
    bind: function (callback) {
        $('#prev2').click(() => {
            this.prev(callback)
        })
        $('#next2').click(() => {
            this.next(callback)
        })
        callback(this.machineList[0])
    },
    setOption: function (value) {
        return {
            series: [
                {
                    type: 'gauge',
                    radius: '85%',
                    startAngle: 210,
                    endAngle: -30,
                    min: 0,
                    max: 200,
                    splitNumber: 8,
                    axisLine: {
                        lineStyle: {
                            width: px(6),
                            color: [
                                [0.25, '#FF6E76'],
                                [0.5, '#FDDD60'],
                                [0.75, '#58D9F9'],
                                [1, '#7CFFB2']
                            ]
                        }
                    },
                    pointer: {
                        show: true,
                        width: px(4),
                        itemStyle: {
                            color: 'auto'
                        }
                    },
                    axisTick: {
                        length: px(5),
                        distance: 3,
                        lineStyle: {
                            color: 'auto',
                            width: px(1)
                        }
                    },
                    splitLine: {
                        show: false,
                    },
                    axisLabel: {
                        color: '#464646',
                        fontSize: px(16),
                        distance: -px(55),
                    },
                    detail: {
                        fontSize: px(28),
                        offsetCenter: [0, '60%'],
                        valueAnimation: true,
                        formatter: function (value) {
                            return Math.round(value) + 'pbb';
                        },
                        color: 'auto'
                    },
                    data: [
                        {
                            value: value,
                            name: '空气质量',
                            title: {
                                color: '#eee',
                                offsetCenter: [0, '90%'],
                            }
                        }
                    ]
                }
            ]
        };
    },
    renderLoop: function (value1, value2, value3) {
        echarts.init($('#loops')[0]).setOption({
            series: [
                this.loopOptions({
                    value: value1,
                    title: 'CO2',
                    unit: 'mu/m3',
                    max: 400,
                    center: ['20%', '50%'],
                }),
                this.loopOptions({
                    value: value2,
                    title: 'PM10',
                    unit: 'mu/m3',
                    max: 60,
                    center: ['50%', '50%'],
                }),
                this.loopOptions({
                    value: value3,
                    title: 'PM2.5',
                    unit: 'mu/m3',
                    center: ['80%', '50%'],
                })
            ]
        })
    },
    init: function ({list, callback}) {
        this.machineList = list
        this.bind(callback)
        this._render()
    },
    render: function ({values}) {
        this.myChart.setOption(this.setOption(values[0]))
        this.renderLoop(values[1], values[2], values[3])
    }
}

window.My_Chart2 = Chart2