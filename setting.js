const Setting = {
    cardId: '',
    planWidth: $('#wrapper')[0].clientWidth,
    planHeight: $('#wrapper')[0].clientHeight,
    list: [],
    title: '',
    content: '',
    listenerFn: function (e) {
        let _e = e
        let left = 0
        let top = 0
        const id = _e.currentTarget.id;
        this.cardId = parseInt(id)
        const target = _e.currentTarget
        let diffX = _e.clientX - target.offsetLeft // 鼠标点击物体那一刻相对于物体左侧边框的距离=点击时的位置相对于浏览器最左边的距离-物体左边框相对于浏览器最左边的距离
        let diffY = _e.clientY - target.offsetTop

        $('#wrapper')[0].onmousemove = function (e2) {
            let __e = e2
            left = __e.clientX - diffX
            top = __e.clientY - diffY

            // 控制拖拽物体的范围只能在浏览器视窗内，不允许出现滚动条
            if (left < 0) {
                left = 0
            } else if (left > $('#wrapper')[0].clientWidth - target.offsetWidth) {
                left = $('#wrapper')[0].innerWidth - target.offsetWidth
            }
            if (top < 0) {
                top = 0
            } else if (top > $('#wrapper')[0].clientHeight - target.offsetHeight) {
                top = $('#wrapper')[0].innerHeight - target.offsetHeight
            }
            // 移动时重新得到物体的距离，解决拖动时出现晃动的现象
            // document.getElementById(`card-${sid.current}`).style.left = left + 'px'
            // document.getElementById(`card-${sid.current}`).style.top = top + 'px'
            _e.currentTarget.style.left = left + 'px'
            _e.currentTarget.style.top = top + 'px'
        }
        $('#wrapper')[0].onmouseup = (e) => { // 当鼠标弹起来的时候不再移动
            $('#wrapper')[0].onmousemove = null
            $('#wrapper')[0].onmouseup = null // 预防鼠标弹起来后还会循环（即预防鼠标放上去的时候还会移动）
            this.GetNodeData()
        }
    },
    Edit: function () {
        this.list.forEach(l => {
            if (l.id === this.cardId) {
                this.title = l.title
                this.content = l.content
                $("input[name = title]").val(l.title)
            }
        })
    },
    GetNodeData: function () {
        const divS = document.getElementsByClassName('card')
        const divArray = Array.prototype.slice.apply(divS)
        const copy = JSON.parse(JSON.stringify(this.list))
        divArray.forEach(div => {
            const id = parseInt(div.id)
            const left = parseInt((div.style.left).replace('px', ''))
            const top = parseInt((div.style.top).replace('px', ''))
            copy.forEach(c => {
                if (c.id === id) {
                    Object.assign(c, {
                        left: left / this.planWidth,
                        top: top / this.planHeight
                    })
                }
            })
        })
        localStorage.setItem('list', (JSON.stringify(copy)))
        this.list = JSON.parse(JSON.stringify(copy))
        this.render(JSON.parse(JSON.stringify(copy)))
    },
    bindGetData: function (callback) {
        $('#get-data').click((e) => {
            callback(this.list)
        })
    },
    render: function (list) {
        const l = list || this.list
        $(".card").remove();
        l.forEach((item) => {
            const $ul = $('<ul></ul>')
            const $div = $(`<div class="card" id='${item.id}'
style='top:${item.top * this.planHeight + 'px'};left: ${item.left * this.planWidth + 'px'}'
> <span class="card-item">${item.title}</span> </div>`)
            $div.append($ul)
            $('#wrapper').append($div)
            $(`#${item.id}`).mousedown(this.listenerFn.bind(this))
        })
    },
    init: function ({list, GetData}) {
        this.list = list
        this.render()
        this.bindGetData(GetData)
    },
    push: function ({data, keys}) {
        const object = {
            id: data[keys.id],
            title: data[keys.title],
            top: 0,
            left: 0
        }
        this.list.push(object)
        this.render()
    },
    delete: function (id) {
        let index = 0
        this.list.forEach((item, i) => {
            console.log(item.id);
            if (item.id === id) {
                index = i
            }
        })
        const copy = JSON.parse(JSON.stringify(this.list))
        copy.splice(index, 1)
        this.cardId = ''
        this.title = ''
        $("input[name = title]").val('')
        this.list = (JSON.parse(JSON.stringify(copy)))
        this.render()
    },
    confirm: function (callback) {
        callback(this.list)
    }
}

window.My_Setting = Setting