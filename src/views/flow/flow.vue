<template>
    <div>
        <div id="container"></div>
    </div>
</template>

<script>
import { Graph } from '@antv/x6'
export default {
    /* AntV X6 */
    name: 'Flow',

    mounted () {
        const dataFlow =
            {
                startNode: { name: '开始', id: 'startEvent1' },
                userNode: [
                    {
                        name: '李四任务1',
                        id: 'cs_1',
                        tasks: [{
                            startTime: '2021-01-12 09:50:47',
                            message: '第1步',
                            userName: '王五',
                            reviewTime: '2021-01-12 09:52:29',
                            status: '已审批'
                        }
                        ]
                    },
                    {
                        name: '候选用户王五',
                        id: 'cs_2',
                        tasks: [
                            {
                                startTime: '2021-01-12 09:52:29',
                                message: '第2步',
                                reviewTime: '2021-01-12 10:14:06',
                                status: '已审批'
                            },
                            {
                                startTime: '2021-01-12 11:06:20',
                                message: '第4步',
                                userName: '测试管理员',
                                reviewTime: '2021-01-12 11:06:56',
                                status: '已审批'
                            }
                        ]
                    },
                    {
                        name: '候选组测试组',
                        id: 'cs_3',
                        tasks: [
                            {
                                startTime: '2021-01-12 10:14:06',
                                message: '第3步',
                                reviewTime: '2021-01-12 10:25:26',
                                status: '已审批'
                            },
                            {
                                startTime: '2021-01-12 10:59:51',
                                message: '第3步',
                                reviewTime: '2021-01-12 11:03:29',
                                status: '已审批'
                            },
                            {
                                startTime: '2021-01-12 11:04:41',
                                message: '第4步',
                                reviewTime: '2021-01-12 11:06:20',
                                status: '已审批'
                            },

                            {
                                startTime: '2021-01-12 11:06:56',
                                message: '第4步',
                                userName: '李四,赵六',
                                reviewTime: '2021-01-12 11:07:14',
                                status: '已审批'
                            }
                        ]
                    },
                    {
                        name: '候选用户赵六，李四',
                        id: 'cs_42',
                        tasks: [
                            {
                                startTime: '2021-01-12 10:25:26',
                                message: '第4步',
                                reviewTime: '2021-01-12 10:59:51',
                                status: '已审批'
                            },
                            {
                                startTime: '2021-01-12 11:03:29',
                                message: '第4步',
                                reviewTime: '2021-01-12 11:04:41',
                                status: '已审批'
                            },
                            {
                                startTime: '2021-01-12 11:07:14',
                                message: '第4步',
                                userName: '李四',
                                reviewTime: '2021-01-12 11:18:29',
                                status: '已审批'
                            }
                        ]
                    },
                    {
                        name: '王五任务',
                        id: 'cs_41',
                        tasks: []
                    },
                    {
                        name: '李四任务',
                        id: 'cs_6',
                        tasks: [
                            {
                                startTime: '2021-01-12 13:47:28',
                                message: '第4步',
                                userName: '赵六',
                                reviewTime: '2021-01-12 13:47:59',
                                status: '已审批'
                            }
                        ]
                    },
                    {
                        name: '流程发起人',
                        id: 'cs_5',
                        tasks: [
                            {
                                startTime: '2021-01-12 11:18:29',
                                message: '第4步',
                                reviewTime: '2021-01-12 13:47:28',
                                status: '已审批'
                            }
                        ]
                    }
                ],
                endNode: {
                    name: '结1束',
                    id: 'sid-BEDAEB42-74EB-4D9E-AE43-3D4EA89037FA'
                },
                gateway: [
                    {
                        name: '判断节点',
                        id: 'sid-B75E7605-1757-4E28-AA94-878C769B480B',
                        type: 'exclusive'
                    },
                ],
                flow: [
                    {
                        targetRef: 'cs_1',
                        sourceRef: 'startEvent1'
                    },
                    {
                        targetRef: 'cs_2',
                        sourceRef: 'cs_1'
                    },
                    {
                        targetRef: 'sid-B75E7605-1757-4E28-AA94-878C769B480B',
                        sourceRef: 'cs_3'
                    },
                    {
                        targetRef: 'cs_6',
                        sourceRef: 'cs_41'
                    },
                    {
                        targetRef: 'cs_5',
                        sourceRef: 'cs_42'
                    },
                    {
                        targetRef: 'cs_3',
                        sourceRef: 'cs_2'
                    },
                    {
                        targetRef: 'sid-BEDAEB42-74EB-4D9E-AE43-3D4EA89037FA',
                        sourceRef: 'cs_6'
                    },
                    {
                        targetRef: 'cs_6',
                        sourceRef: 'cs_5'
                    },
                    {
                        targetRef: 'cs_42',
                        sourceRef: 'sid-B75E7605-1757-4E28-AA94-878C769B480B'
                    },
                    {
                        targetRef: 'cs_41',
                        sourceRef: 'sid-B75E7605-1757-4E28-AA94-878C769B480B'
                    }

                ]
            }

        let edges = dataFlow.flow.map(v => ({
            source: v.sourceRef,
            target: v.targetRef,
            attrs: {
                line: {
                    stroke: '#6E6E6E', // 指定 path 元素的填充色
                },
            },
        }))

        let rankNodes = []
        // con
        /* 获取当前流程信息及其人员信息 */
        const getFlowNode = (currentId) => {
            /* 先在流程中找到下一个节点 */
            const flow = dataFlow.flow.filter(v => v.sourceRef === currentId)
            if (flow.length) {
                flow.forEach(item => {
                    const p = dataFlow.userNode.find(v => v.id === item.targetRef)
                    if (p) {
                        rankNodes.push(p)
                    } else {
                        /* 处理判断节点 */
                        const judge = dataFlow.gateway.find(v => v.id === item.targetRef)
                        if (judge) {
                            rankNodes.push(judge)
                        }
                    }
                })

                return flow
            }
            return []
        }
        const main = (id) => {
            const getData = getFlowNode(id)
            if (getData.length) {
                getData.forEach(item => {
                    main(item.targetRef)
                })
            }
        }

        let currentJudge = 0
        const parentIsJudge = (id) => {
            // 父元素是否是判断节点
            const target = dataFlow.flow.find(v => v.targetRef === id)
            if (target) {
                return dataFlow.gateway.findIndex(v => v.id === target.sourceRef) > -1
            }
            return false
        }

        main(dataFlow.startNode.id)
        rankNodes = [dataFlow.startNode, ...rankNodes, ...dataFlow.gateway, dataFlow.endNode]
        let deep = -1
        rankNodes = rankNodes.map(v => {
            let x = 400
            if (parentIsJudge(v.id)) {
                // 判断节点
                if (currentJudge === 0) {
                    x = 100
                    currentJudge++
                } else if (currentJudge === 1) {
                    x = 700
                    currentJudge++
                }
            } else {
                deep++
            }
            const rectWidth = v.name.length * 18
            return {
                x: x - rectWidth / 2, // Number，必选，节点位置的 x 值
                y: 120 * deep, // Number，必选，节点位置的 y 值
                width: rectWidth, // Number，可选，节点大小的 width 值
                height: 40, // Number，可选，节点大小的 height 值
                attrs: {
                    body: {
                        fill: '#E8E8E8',
                        strokeWidth: 1,
                        stroke: '#C0C0C0'
                    },
                    label: {
                        text: v.name,
                    },
                },
                ...v
            }
        })

        edges = [...edges, ...dataFlow.gateway, dataFlow.startNode, dataFlow.endNode]
        const data = {
            // 节点
            nodes: rankNodes,
            // 边
            edges: edges
        }

        const graph = new Graph({
            container: document.getElementById('container'),
            width: 1000,
            height: 1600,
            grid: true,
        })

        graph.fromJSON(data)
        rankNodes.forEach(v => {
            if (v.tasks) {
                const text = v.tasks.map(item => `${item.userName || ''} ${item.status}-${item.message}`).toString()
                const width = text.length * 12
                graph.addNode({
                    width: width,
                    height: 30,
                    x: v.x + 2 + v.width / 2,
                    y: v.y + 44,
                    shape: 'custom-rect',
                    attrs: {
                        body: {
                            fill: '#2ECC71',
                            stroke: '#000',
                        },
                        label: {
                            text: text,
                        },
                    },
                })
            }
        })
    },

}
</script>

<style lang="scss" scoped>

</style>
