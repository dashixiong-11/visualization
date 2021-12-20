const Time = {
    newDate: new Date(),
    GetStringTime: function (num) {
        return num > 9 ? num : `0${num}`
    },
    GetWeek: function (num) {
        const hash = {
            0: '星期日',
            1: '星期一',
            2: '星期二',
            3: '星期三',
            4: '星期四',
            5: '星期五',
            6: '星期六',
        }
        return hash[num]
    },
    GetRange: function (startDate) {
        let startTime = new Date(Date.parse(startDate.replace(/-/g, "/"))).getTime();
        let endTime = Date.now()
        let res = parseInt(Math.abs((startTime - endTime)) / (1000 * 60 * 60 * 24) + '')
        return res;
    },
    GetTime: function () {
        const date = new Date()
        const year = date.getFullYear()
        const month = this.GetStringTime(date.getMonth() + 1)
        const day = this.GetStringTime(date.getDate())
        const week = this.GetWeek(date.getDay())
        const hour = this.GetStringTime(date.getHours())
        const minute = this.GetStringTime(date.getMinutes())
        const second = this.GetStringTime(date.getSeconds())
        return {
            time: `${hour}:${minute}:${second}`,
            now: `${year}.${month}.${day}`,
            week: week
        }
    },
    render: function () {
        const nodeTime = $('#render-time')
        const nodeWeek = $('#render-week')
        const nodeNow = $('#render-now')
        nodeTime.text(this.GetTime().time)
        nodeWeek.text(this.GetTime().week)
        nodeNow.text(this.GetTime().now)
    },
    renderRangeTime: function (startTime) {
        $('#render-range').text(`已安全运行 ${this.GetRange(startTime)} 天`)
    }

}

setInterval(() => {
    Time.render()
    Time.renderRangeTime('2001-11-11')
}, 1000)
