<template>
    <div class="ud-navigate">
        <el-menu 
            default-active="2" 
            @open="handleOpen" 
            @close="handleClose" 
            text-color="#fff"
            background-color="rgba(0,0,0,.1)"
        > 
            <el-submenu :index="`${index}`" v-for="(item, index) in menu" :key="index">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>{{ item.title }}</span>
                </template>
                <el-menu-item v-for="(val, i) in item.children" :index="`${index}-${i}`" @click="changePage(val.name)" :key="i">{{ val.title }}</el-menu-item>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
import axios from 'axios'
    export default {
        data() {
            return {
                menu: [
                    { title: 'ECharts', children: [{ title: 'All-Charts', name: 'echarts'}] },
                    { title: 'WangEditor', children: [{ title: 'ediotr', name: 'wangEditor'}] },
                    { title: 'Other', children: [{ title: 'upload-img', name: 'uploadImg'}] },
                ]
            }
        },

        mounted() {
            /* this.$http({
                method: 'get',
                url: 'user/',
                successFn: (res) => {
                    console.log(res, 'res');
                }
            }) */
        },

        computed:{
            ak(){
                return 'aaaa'
            }
        },
        
        methods: {
            changePage(name) {
                this.$router.push({name})
            },
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },

            ko(){

            }
        }
    }
</script>

<style type="text/scss" lang="scss">
    .ud-navigate .el-menu{
        border-right:none;
     }
</style>