<template>
    <div class="ud-main">
        <header class="ud-header">
            <div class="logo"><i class="fa fa-book fa-2x"></i></div>        
            <div class="user-info">
                 <i class="fa fa-user-circle fa-2x"></i>
                 <span>name</span>
            </div>        
        </header>
        <div class="ud-content">
            <nav class="ud-nav">
                <div class="ud-inner">
                   <Navigate/>
                </div>
            </nav>
            <div class="ud-views-container">
                <div class="views-inner">
                    <keep-alive include="sss">
                    <router-view />
                    </keep-alive>
                </div>
            </div>
        </div>
        <footer class="ud-footer">
            <div>
                  ©2017 <a href="https://github.com/NameHewei">https://github.com/NameHewei</a>
            </div>
        </footer>
    </div>
</template>

<script>
    import {mapMutations} from 'vuex'
    import Navigate from './navigate/Navigate.vue'

    export default {
        components: {
            Navigate
        },
        data() {
            return {
                
            }
        },

        mounted(){
            this.a('123333')
        },

        methods: {
            ...mapMutations(['a'])
        }
    }
</script>

<style scoped type="text/scss" lang="scss">
    .ud-main{
        .ud-header{ 
            position:absolute;
            z-index: 2;
            top:0;
            left:0;
            right:0;
            height:50px;
            line-height:50px;
            min-width:1120px;
            color: white; 
            background-color: rgba(0,0,0,.1); 
            .logo{
                float:left;
                padding-top:6px;
                margin-left: 50px;
            }
            .user-info{
                float:right;
                padding-top:6px;
                margin-right: 50px;
            }
        }
        .ud-content{
            position: absolute;
            left:0;
            top:50px;
            right:0;
            bottom:0;
            .ud-nav{ 
                position: absolute;
                width: 200px;
                left:0;
                top:0;
                bottom:0;
                background: rgba(0,0,0,.2);
            } 
            .ud-views-container{
                position: absolute;
                top:0;
                left: 200px;
                right:0;
                bottom:50px;
                padding:10px;
                min-width:900px;
                overflow: auto;
            } 
        } 
        .ud-footer{
            position:absolute;
            left:200px;
            right:0;            
            bottom:2px;
            padding:0 20px; 
            height:40px;
            min-width:860px;
            line-height: 40px;
            text-align:center;
            color:#fff;
            div{
                font-size:12px;
                border-top:1px ridge #fff;
            }
            a{
                text-decoration:none;
                color:#fff;
            }
        }
    }
</style>