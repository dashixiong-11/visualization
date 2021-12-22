const VideoSwitch = {
    machineList: [],
    index: 0,
    setTitle: function (name) {
        $('#name4').text(name)
    },
    _render: function () {
        this.setTitle(this.machineList[this.index].name)
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
        $('#prev4').click(() => {
            this.prev(callback)
        })
        $('#next4').click(() => {
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

window.Video_switch = VideoSwitch