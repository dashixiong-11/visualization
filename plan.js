const Plan = {
    list: [],
    timeId: '',
    listenerFn: function (e) {
        let _e = e
        let left = 0
        let top = 0
        const target = _e.currentTarget
        let diffX = _e.clientX - target.offsetLeft // 鼠标点击物体那一刻相对于物体左侧边框的距离=点击时的位置相对于浏览器最左边的距离-物体左边框相对于浏览器最左边的距离
        let diffY = _e.clientY - target.offsetTop
        $('#plan-wrapper')[0].onmousemove = function (e2) {
            let __e = e2
            left = __e.clientX - diffX
            top = __e.clientY - diffY

            // 控制拖拽物体的范围只能在浏览器视窗内，不允许出现滚动条
            if (left < 0) {
                left = 0
            } else if (left > $('#plan-wrapper')[0].clientWidth - target.offsetWidth) {
                left = $('#plan-wrapper')[0].innerWidth - target.offsetWidth
            }
            if (top < 0) {
                top = 0
            } else if (top > $('#plan-wrapper')[0].clientHeight - target.offsetHeight) {
                top = $('#plan-wrapper')[0].innerHeight - target.offsetHeight
            }
            _e.currentTarget.style.left = left + 'px'
            _e.currentTarget.style.top = top + 'px'
        }
        $('#plan-wrapper')[0].onmouseup = (e) => { // 当鼠标弹起来的时候不再移动
            $('#plan-wrapper')[0].onmousemove = null
            $('#plan-wrapper')[0].onmouseup = null // 预防鼠标弹起来后还会循环（即预防鼠标放上去的时候还会移动）
            this.GetNodeData()
        }
    },
    GetNodeData: function () {
        const divS = document.getElementsByClassName('card')
        const divArray = Array.prototype.slice.apply(divS)
        const copy = JSON.parse(JSON.stringify(this.list))
        const planWidth = $('#plan-wrapper')[0].clientWidth
        const planHeight = $('#plan-wrapper')[0].clientHeight
        divArray.forEach(div => {
            const id = parseInt(div.id)
            const left = parseInt((div.style.left).replace('px', ''))
            const top = parseInt((div.style.top).replace('px', ''))
            copy.forEach(c => {
                if (c.id === id) {
                    Object.assign(c, {
                        left: left / planWidth,
                        top: top / planHeight
                    })
                }
            })
        })
        localStorage.setItem('list', (JSON.stringify(copy)))
        this.render({
            list: JSON.parse(JSON.stringify(copy))
        })
    },
    setImage: function ({img}) {
        $('#image').attr('src', img)
    },
    push: function ({data, keys}) {
        const object = {
            id: data[keys.id],
            title: data[keys.title],
            top: 0,
            left: 0
        }
        this.list.push(object)
        this.render({list: this.list})
    },
    render: function ({list}) {
        this.list = list;
        this.timeId = setTimeout(() => {
            $(".card").remove();
            const l = list || this.list
            let planHeight = $('#plan-wrapper')[0].clientHeight
            let planWidth = $('#plan-wrapper')[0].clientWidth
            l.forEach((item) => {
                const $ul = $('<ul></ul>')
                const $div = $(`<div class="card" id='${item.id}'
style='top:${item.top * planHeight + 'px'};left: ${item.left * planWidth + 'px'}'
> <span class="card-item">${item.title}</span> </div>`)
                $div.append($ul)
                $('#plan-wrapper').append($div)
                $(`#${item.id}`)[0].onmousedown = null
                $(`#${item.id}`).mousedown(this.listenerFn.bind(this))
            })
        }, 500)
    },

    delete: function (id) {
        let index = 0
        this.list.forEach((item, i) => {
            if (item.id === id) {
                index = i
            }
        })
        const copy = JSON.parse(JSON.stringify(this.list))
        copy.splice(index, 1)
        this.cardId = ''
        this.title = ''
        this.list = (JSON.parse(JSON.stringify(copy)))
        this.render({list: this.list})
    },
    confirm: function (callback) {
        callback(this.list)
    }
}

window.My_Plan = Plan