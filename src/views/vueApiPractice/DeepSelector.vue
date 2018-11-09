<template>
    <div>
        <div>
            <h2 class="need">深度作用选择器 >>> (alias:/deep/)</h2>
            <pre>
                .parent /deep/ .need {
                    color: rgb(7, 197, 108)
                }
                .parent >>> .need {
                    color: rgb(7, 197, 108)
                }
            </pre>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
    .need{
        margin: 0
    }
</style>
