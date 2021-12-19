const Chart2 = {
    machineList: [],
    index: 0,
    setTitle: function (name) { $('#name2').text(name) },
    setStatus: function (status) { $('#status2').text(status) },
    setTemperature: function (t) { $('#temperature').text(t) },
    setRoomTemperature: function (rt) { $('#room-temperature').text(rt) },
    _render: function () {
        this.setTitle(this.machineList[this.index].name)
        this.setStatus(this.machineList[this.index].status)
        this.setTemperature(this.machineList[this.index].temperature)
        this.setRoomTemperature(this.machineList[this.index].roomTemperature)
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
    init: function ({list, callback}) {
        this.machineList = list
        this.bind(callback)
        this._render()
    },
}

window.My_Chart2 = Chart2