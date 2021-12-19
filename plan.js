export const Plan = {
    list: [],
    timeId: '',
    render: function ({list, img}) {
        $('#image').attr('src', img)
        this.timeId = setTimeout(() => {
            const l = list
            let planHeight = $('#plan-wrapper')[0].clientHeight
            let planWidth = $('#plan-wrapper')[0].clientWidth
            $(".card").remove();
            l.forEach((item) => {
                const $ul = $('<ul></ul>')
                item.content.split(';').forEach(i => {
                    $ul.append($(`<li>${i}</li>`))
                })
                const $div = $(`<div class="card" id='card-${item.id}'
style='top:${item.top * planHeight + 'px'};left: ${item.left * planWidth + 'px'}'
> <span class="card-item">${item.title}</span> </div>`)
                $div.append($ul)
                $('#plan-wrapper').append($div)
            })
        }, 500)
    }
}