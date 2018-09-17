<template>
    <div class="not-found">
        <p>404</p>   
        <p>该地址不存在</p>   
    </div>
</template>

<script>
    export default {
        data(){
            return {

            }
        }
    }
</script>

<style>
    .not-found{
        height: 100%;
        width: 100%;
    }
    p{
        margin: 0;
        text-align: center;
        font-weight: 900;
        color: #fff;
    }
    p:first-child{
        padding-top: 20px;
        margin-bottom:20px; 
        font-size: 20px;
    }
</style>