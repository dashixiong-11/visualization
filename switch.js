const My_Switch = {
    bind: function () {
        $('#alert').hide()
        $('#switch-map').click(() => {
            $('#alert').show()
            $('#alert').click((e) => {
                if (e.target === e.currentTarget) {
                    $('#alert').hide()
                }
            })
        })
    },
    render: function ({nodes, callback}) {
        let zTreeObj;
        let setting = {
            callback: {
                onClick: (event, treeId, treeNode) => {
                    $('#alert').hide()
                    callback(event, treeId, treeNode)
                }
            }
        };        // zTree 的参数配置，后面详解

        $(document).ready(function () { zTreeObj = $.fn.zTree.init($("#tree-wrapper"), setting, nodes); });

    },
}
My_Switch.bind()
window.My_Switch = My_Switch
