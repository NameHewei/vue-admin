import { Graph } from '@antv/x6'

Graph.registerNode('custom-rect', {
    inherit: 'rect', // 继承自 Shape.Rect
    width: 300, // 默认宽度
    height: 40, // 默认高度
    attrs: {
        body: {
            rx: 5, // 圆角矩形
            ry: 5,
            strokeWidth: 0,
            fill: '#5755a1',
        },
        label: {
            fill: '#fff',
            fontSize: 12,
            refX: 6, // x 轴偏移，类似 css 中的 margin-left
            textAnchor: 'left', // 左对齐
        }
    },
})
