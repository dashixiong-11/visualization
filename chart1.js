const Chart1 = {
    timeId: null,
    myChart: echarts.init($('#chart-1')[0]),
    index: 0,
    setTitle: function (name) { $('#name1').text(name) },
    setStatus: function (status) { $('#status1').text(status) },
    setType: function (type) { $('#type1').text(type) },
    setWarning: function (warning) { $('#warning1').text(warning) },
    machineList: [],
    _render: function () {
        this.setTitle(this.machineList[this.index].name)
        this.setStatus(this.machineList[this.index].status)
        this.setType(this.machineList[this.index].type)
        this.setWarning(this.machineList[this.index].warning)
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
    setOption: function (leftValue, middleValue, rightValue) {
        return {
            series: [
                {
                    type: 'gauge',
                    progress: {
                        show: true,
                        width: 8
                    },
                    center: ['20%', '60%'],
                    radius: '50%',
                    axisLine: {
                        lineStyle: {
                            width: 8
                        }
                    },
                    axisTick: {
                        show: true,
                        splitNumber: 5,
                        length: '3%',
                        distance: 3
                    },
                    splitLine: {
                        length: '6%',
                        distance: 5,
                        lineStyle: {
                            width: 1,
                            color: '#999'
                        }
                    },
                    axisLabel: {
                        show: false,
                        distance: 5,
                        color: '#999',
                        fontSize: 10
                    },
                    pointer: {
                        show: false
                    },
                    title: {
                        show: false
                    },
                    detail: {
                        valueAnimation: true,
                        color: '#fff',
                        fontSize: px(20),
                        offsetCenter: [0, '70%'],
                        formatter: "{value}%"
                    },
                    data: [
                        {
                            value: leftValue,
                        }
                    ]
                },
                {
                    type: 'gauge',
                    axisLine: {
                        lineStyle: {
                            width: 10,
                            color: [
                                [0.3, '#67e0e3'],
                                [0.7, '#37a2da'],
                                [1, '#fd666d']
                            ]
                        }
                    },
                    radius: '60%',
                    pointer: {
                        itemStyle: {
                            color: 'auto'
                        },
                        width: '2%'
                    },
                    axisTick: {
                        distance: -10,
                        length: 4,
                        lineStyle: {
                            color: '#fff',
                            width: 1
                        }
                    },
                    splitLine: {
                        distance: -9,
                        length: 5,
                        lineStyle: {
                            color: '#fff',
                            width: 2
                        }
                    },
                    axisLabel: {
                        color: 'auto',
                        distance: 20,
                        fontSize: px(10)
                    },
                    detail: {
                        valueAnimation: true,
                        formatter: '{value}',
                        color: 'auto',
                        offsetCenter: [0, '100%']
                    },
                    data: [
                        {
                            value: middleValue,
                            name: '当前温度'
                        }
                    ]
                },
                {
                    type: 'gauge',
                    progress: {
                        show: true,
                        width: 8
                    },
                    center: ['80%', '60%'],
                    radius: '50%',
                    axisLine: {
                        lineStyle: {
                            width: 8
                        }
                    },
                    axisTick: {
                        show: true,
                        splitNumber: 5,
                        length: '3%',
                        distance: 3
                    },
                    splitLine: {
                        length: '6%',
                        distance: 5,
                        lineStyle: {
                            width: 1,
                            color: '#999'
                        }
                    },
                    axisLabel: {
                        show: false,
                        distance: 5,
                        color: '#999',
                        fontSize: 10
                    },
                    pointer: {
                        show: false
                    },
                    title: {
                        show: false
                    },
                    detail: {
                        valueAnimation: true,
                        color: '#fff',
                        fontSize: 15,
                        offsetCenter: [0, '70%'],
                        formatter: "{value}%"
                    },
                    data: [
                        {
                            value: rightValue,
                        }
                    ]
                }
            ]
        }
    },
    init: function ({list, callback}) {
        this.machineList = list
        $('#prev1').click(() => {
            this.prev(callback)
        })
        $('#next1').click(() => {
            this.next(callback)
        })
        callback(this.machineList[this.index])
        this._render()
    },
    render: function (leftValue, middleValue, rightValue) {
        this.myChart.setOption(this.setOption(leftValue, middleValue, rightValue))
    }
}

window.My_Chart1 = Chart1