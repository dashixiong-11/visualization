const Chart3 = {
    machineList: [],
    index: 0,
    myChart: echarts.init($('#chart-3')[0]),
    setTitle: function (name) { $('#name3').text(name) },
    prev: function (callback) {
        this.index--
        if (this.index < 0) {
            this.index += 1
        } else {
            this._render()
            callback(this.machineList[this.index])
        }
    },
    _render: function () {
        this.setTitle(this.machineList[this.index].name)
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
    setOption: function () {

    },
    bind: function (callback) {
        $('#prev3').click(() => {
            this.prev(callback)
        })
        $('#next3').click(() => {
            this.next(callback)
        })
    },
    init: function ({list, callback}) {
        this.machineList = list
        this.bind(callback)
        this._render()
        callback(this.machineList[this.index])
    },
    render: function (options) {
        this.myChart.setOption(options)
    }
}
window.My_Chart3 = Chart3