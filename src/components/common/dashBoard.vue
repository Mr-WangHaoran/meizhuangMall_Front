<template>
    <div class="main-border">
        <!-- 1 -->
        <div class="item">
            <div class="title">
                用户注册数 <el-tag type="success">全平台</el-tag>
            </div>
            <el-divider></el-divider>
            <div class="content">{{ userCount_tweened.toFixed(0) }}</div>
        </div>
        <!-- 2 -->
        <div class="item">
            <div class="title">
                今日登录过的用户 <el-tag type="success">全平台</el-tag>
            </div>
            <el-divider></el-divider>
            <div class="content">{{ userCount_add_tweened.toFixed(0) }}</div>
        </div>
        <!-- 3 -->
        <div class="item">
            <div class="title">
                订单总数 <el-tag type="success">全平台</el-tag>
            </div>
            <el-divider></el-divider>
            <div class="content">{{ orderCount_tweened.toFixed(0) }}</div>
            <el-divider></el-divider>
            <div class="mytag">
                <el-tag effect="dark" type="danger">订单</el-tag>
            </div>
        </div>
        <!-- 4 -->
        <div class="item">
            <div class="title">
                今日新增订单数 <el-tag type="info">较昨天</el-tag>
            </div>
            <el-divider></el-divider>
            <div class="content">{{ orderCount_add_tweened.toFixed(0) }}</div>
            <el-divider></el-divider>
            <div class="mytag">
                <el-tag effect="dark" type="danger">订单</el-tag>
            </div>
        </div>
        <!-- 5 -->
        <div class="item">
            <div class="title">
                评论总数 <el-tag type="success">全平台</el-tag>
            </div>
            <el-divider></el-divider>
            <div class="content">{{ msgCount_tweened.toFixed(0) }}</div>
        </div>
        <!-- 6 -->
        <div class="item">
            <div class="title">
                今日新增评论数 <el-tag type="info">较昨天</el-tag>
            </div>
            <el-divider></el-divider>
            <div class="content">{{ msgCount_add_tweened.toFixed(0) }}</div>
        </div>
        <!-- 7 -->
        <div class="item">
            <div class="title">
                商品总数 <el-tag type="success">全平台</el-tag>
            </div>
            <el-divider></el-divider>
            <div class="content">{{ goodsCount_tweened.toFixed(0) }}</div>
            <el-divider></el-divider>
            <div class="mytag">
                <el-tag effect="dark" type="warning">商品</el-tag>
            </div>
        </div>
        <!-- 8 -->
        <div class="item">
            <div class="title">
                今日新增商品数 <el-tag type="info">较昨天</el-tag>
            </div>
            <el-divider></el-divider>
            <div class="content">{{ goodsCount_add_tweened.toFixed(0) }}</div>
            <el-divider></el-divider>
            <div class="mytag">
                <el-tag effect="dark" type="warning">商品</el-tag>
            </div>
        </div>
        <!-- 9 -->
        <div class="item">
            <div class="title">
                未完成或已取消的订单 <el-tag type="success">全平台</el-tag>
            </div>
            <el-divider></el-divider>
            <div class="content">{{ orderCount_no_finish_tweened.toFixed(0) }}</div>
            <el-divider></el-divider>
            <div class="mytag">
                <el-tag effect="dark" type="danger">订单</el-tag>
            </div>
        </div>
        <!-- 10 -->
        <div class="item">
            <div class="title">
                完成订单数 
                <el-tag type="success">全平台</el-tag> 
            </div>
            <el-divider></el-divider>
            <div class="content">{{ orderCount_finish_tweened.toFixed(0) }}</div>
            <el-divider></el-divider>
            <div class="mytag">
                <el-tag effect="dark" type="danger">订单</el-tag>
            </div>
        </div>
    </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具 js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import request from '../../utils/request';
import gsap from 'gsap';
var dura=0.5;
export default {
    //import 引入的组件需要注入到对象中才能使用
    components: {},
    props: {},
    data() {
        //这里存放数据
        return {
            userCount:0,
            userCount_tweened:0,//
            userCount_add:0,
            userCount_add_tweened:0,//
            orderCount:0,
            orderCount_tweened:0,//
            orderCount_add:0,
            orderCount_add_tweened:0,//
            msgCount:0,
            msgCount_tweened:0,//
            msgCount_add:0,
            msgCount_add_tweened:0,//
            goodsCount:0,
            goodsCount_tweened:0,//
            goodsCount_add:0,
            goodsCount_add_tweened:0,//
            orderCount_no_finish:0,
            orderCount_no_finish_tweened:0,//
            orderCount_finish:0,
            orderCount_finish_tweened:0,//
        };
    },
    //计算属性 类似于 data 概念
    computed: {},
    //监控 data 中的数据变化
    watch: {
        userCount(n){
            gsap.to(this,{duration:dura, userCount_tweened:Number(n) || 0});
        },
        userCount_add(n){
            gsap.to(this,{duration:dura, userCount_add_tweened:Number(n) || 0});
        },
        orderCount(n){
            gsap.to(this,{duration:dura, orderCount_tweened:Number(n) || 0});
        },
        orderCount_add(n){
            gsap.to(this,{duration:dura, orderCount_add_tweened:Number(n) || 0});
        },
        msgCount(n){
            gsap.to(this,{duration:dura, msgCount_tweened:Number(n) || 0});
        },
        msgCount_add(n){
            gsap.to(this,{duration:dura, msgCount_add_tweened:Number(n) || 0});
        },
        goodsCount(n){
            gsap.to(this,{duration:dura, goodsCount_tweened:Number(n) || 0});
        },
        goodsCount_add(n){
            gsap.to(this,{duration:dura, goodsCount_add_tweened:Number(n) || 0});
        },
        orderCount_no_finish(n){
            gsap.to(this,{duration:dura, orderCount_no_finish_tweened:Number(n) || 0});
        },
        orderCount_finish(n){
            gsap.to(this,{duration:dura, orderCount_finish_tweened:Number(n) || 0});
        }
    },
    //方法集合
    methods: {
        getUserCount(){
            request({
                url:'/user/getUserCount',
                method:'get',
            }).then(res=>{
                this.userCount = res.data;
            })
        },
        getUserCountAdd(){
            request({
                url:'/user/getUserCountAdd',
                method:'get',
            }).then(res=>{
                this.userCount_add = res.data;
            })
        },
        getOrderCount(){
            request({
                url:'/order/getOrderCount',
                method:'get',
            }).then(res=>{
                this.orderCount = res.data;
            })
        },
        getOrderCountAdd(){
            request({
                url:'/order/getOrderCountAdd',
                method:'get',
            }).then(res=>{
                this.orderCount_add = res.data;
            })
        },
        getOrderCountNoFinish(){
            setTimeout(_=>{
                this.orderCount_no_finish = this.orderCount - this.orderCount_finish;
            },100);
        },
        // 完成的status为3
        getOrderCountFinish(){
            request({
                url:'/order/getOrderByStatus',
                method:'get',
                params:{'status':3}
            }).then(res=>{
                this.orderCount_finish = res.data;
            })
        },
        getMsgCount(){
            request({
                url:'/message/getAllMsg',
                method:'get',
            }).then(res=>{
                this.msgCount = res.data;
            })
        },
        getMsgCountAdd(){
            request({
                url:'/message/getAllMsgAdd',
                method:'get',
            }).then(res=>{
                this.msgCount_add = res.data;
            })
        },
        getGoodsCount(){
            request({
                url:'/idle/getAllIdleItem',
                method:'get',
            }).then(res=>{
                this.goodsCount = res.data;
            })
        },
        getGoodsCountAdd(){
            request({
                url:'/idle/getAllIdleItemAdd',
                method:'get',
            }).then(res=>{
                this.goodsCount_add = res.data;
            })
        }
    },
    //生命周期 - 创建完成（可以访问当前 this 实例）
    created() {
        this.getUserCount();
        this.getUserCountAdd();
        this.getOrderCount();
        this.getOrderCountAdd();
        this.getOrderCountFinish();
        this.getMsgCount();
        this.getMsgCountAdd();
        this.getGoodsCount();
        this.getGoodsCountAdd();
        this.getOrderCountNoFinish();
    },
    //生命周期 - 挂载完成（可以访问 DOM 元素）
    mounted() {

    },
    beforeCreate() { }, //生命周期 - 创建之前
    beforeMount() { }, //生命周期 - 挂载之前
    beforeUpdate() { }, //生命周期 - 更新之前
    updated() { }, //生命周期 - 更新之后
    beforeDestroy() { }, //生命周期 - 销毁之前
    destroyed() { }, //生命周期 - 销毁完成
    activated() { }, //如果页面有 keep-alive 缓存功能，这个函数会触发
}
</script>
<style scoped>
    .main-border{
        background-color: #FFF;
        padding: 10px 30px;
        box-shadow: 0 1px 15px -6px rgba(0,0,0,.5);
        border-radius: 5px;
        display: flex;
        flex-wrap: wrap;
    }
    .item{
        width: 200px;
        height: 200px;
        padding: 20px;
        margin-left: 50px;
        margin-top: 30px;
        margin-bottom: 30px;
        box-shadow: 0 10px 20px 10px #ccc;
        text-align: center;
    }
    .item .title{
        font-weight: bold;
        text-align: center;
    }
    .item .content{
        font-size: 3rem;
        text-align: center;
    }
    .mytag{
        position: relative;
        bottom:20px
    }
</style>