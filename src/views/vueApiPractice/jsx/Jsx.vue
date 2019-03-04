<script>
import ChildJsx from './ChildJsx'

export default {
    data () {
        return {
            name: 'this is name data'
        }
    },

    methods: {
        buttonClick () {
            alert('click')
        }
    },

    render (h) {
        const tit = 'title'
        return <div>
            <ChildJsx name="来自父级的name"/>
            <h1>{ this.name }</h1>
            <h1>{ tit }</h1>
            <p>你好 这是使用的 JSX 语法 </p>
            <el-button onClick={this.buttonClick}>alert</el-button>
        </div>
    }
}
</script>
