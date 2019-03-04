<script>
export default {
    props: {
        name: {
            type: String,
            default: 'default name'
        }
    },

    render (h) {
        return <div class="jsx-child">{ this.name }</div>
    }
}
</script>

<style scoped>
    .jsx-child{
        color: aqua
    }
</style>
