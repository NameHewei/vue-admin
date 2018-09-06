<template>
    <div>
        <p>欢迎</p>
        <Test
            label="密码" 
            placeholder="请填写密码"
            @input="handleInput"
        ></Test>    
    </div> 
</template>

<script>
    // import Name from './components/Name.vue'
    
    export default {
        components: {
            // Name
        },

        data() {
            return {
                
            }
        },

        methods: {
            handleInput(v) {
                console.log(v)
            }
        }
    }
</script>

<style lang="css">
    p{
        color:#fff;
        font-size: 20px;
    }
</style>
