<template>
    <div style="background-color: #f6f6f6;min-height:100vh;">
        <el-container>
            <el-header>
                <div class="header">
                    <div class="app-name">
                        <router-link to="/platform-admin">{{$globalData.appInfo.appname}}后台管理系统</router-link>
                    </div>
                    <span class="app-title">尊敬的管理员：<span
                            style="color:red;font-weight:bolder">{{ admin.nickname }}</span>&nbsp; 你好</span>
                    <div class="app-logOut">
                        <el-button style="margin-right: 100px" type="primary" @click="logout">退出登录</el-button>
                    </div>
                </div>
            </el-header>
            <el-container>
                <div class="mainBody">
                    <el-aside>
                        <el-col :span="24">
                            <el-menu default-active="0" class="el-menu-vertical-demo" @select="handleSelect"
                                background-color="#24292f" text-color="#fff" active-text-color="#409EFF">
                                <el-menu-item index="0">
                                    <i class="el-icon-s-platform"></i>
                                    <span>系统信息概览</span>
                                </el-menu-item>
                                <el-menu-item index="1">
                                    <i class="el-icon-goods"></i>
                                    <span>商品管理</span>
                                </el-menu-item>
                                <el-menu-item index="2">
                                    <i class="el-icon-s-goods"></i>
                                    <span slot="title">订单管理</span>
                                </el-menu-item>
                                <el-menu-item index="3">
                                    <i class="el-icon-s-custom"></i>
                                    <span slot="title">商家管理</span>
                                </el-menu-item>
                                <el-menu-item index="4">
                                    <i class="el-icon-s-custom"></i>
                                    <span slot="title">用户管理</span>
                                </el-menu-item>
                                <el-menu-item index="5">
                                    <i class="el-icon-s-custom"></i>
                                    <span slot="title">分类管理</span>
                                </el-menu-item>
                            </el-menu>
                        </el-col>
                    </el-aside>
                    <el-main>
                        <el-button type="primary" icon="el-icon-refresh" style="margin-bottom:10px" :loading="loading" @click="refresh">{{ctt}}</el-button>
                        <dashBoard v-if="mode == 0"></dashBoard>
                        <IdleGoods v-if="mode == 1"></IdleGoods>
                        <orderList v-if="mode == 2"></orderList>
                        <merchantList v-if="mode==3"></merchantList>
                        <userList v-if="mode == 4"></userList>
                        <categoryList v-if="mode==5"></categoryList>
                    </el-main>
                </div>
            </el-container>
        </el-container>
        <div class="foot">
            <app-foot></app-foot>
        </div>
    </div>
</template>

<script>
import AppFoot from '../common/AppFoot.vue'
import IdleGoods from '../common/IdleGoods.vue'
import orderList from '../common/orderList.vue'
import userList from '../common/userList.vue'
import dashBoard from '../common/dashBoard.vue'
import categoryList from '../common/categoryList.vue'
import merchantList from '../common/merchantList.vue'
export default {
    name: "platform-admin",
    components: {
        AppFoot,
        IdleGoods,
        orderList,
        userList,
        dashBoard,
        categoryList,
        merchantList
    },
    data() {
        return {
            mode: 0,
            admin: {
                nickname: '管理员',
            },
            loading:false,
            ctt:"更新数据"
        }
    },
    created() {
        this.admin.nickname = this.$sta.adminName;
        if (this.$sta.adminName.length != 0) sessionStorage.setItem("nickname", this.$sta.adminName);
        else { this.admin.nickname = sessionStorage.getItem("nickname") }

    },
    methods: {
        refresh(){
            this.loading = true;
            this.ctt = "正在更新中...";
            let tempMode = this.mode;
            this.mode=5;
            let that = this;
            setTimeout(_=>{
                that.mode = tempMode;
                that.loading = false;
                that.ctt = "更新数据";
            },1000);
        },
        logout() {
            this.$api.loginOut({
            }).then(res => {
                if (res.status_code === 1) {
                    this.$sta.isLogin = false;
                    this.$sta.adminName = '';
                    this.$router.push({ path: '/login-admin' });
                }
            }).catch(e => {
                console.log(e)
            })
        },
        handleSelect(val) {
            if (this.mode !== val) {
                this.mode = val
            }
        },
    },
}
</script>

<style scoped>
.header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    min-width: 100vw;
    height: 58px;
    background: #24292f;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: #24292f solid 2px;
    z-index: 1000;
}

.app-name {
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 10vw;
    flex: 1;
    height: 100%;
    border-right: 1px solid #24292f;
}

.app-name a {
    color: white;
    font-size: 24px;
    font-weight: 800;
    text-decoration: none;
    padding: 0 20px;
}

.app-title {
    display: flex;
    justify-content: center;
    flex: 8;
    font-size: 24px;
    color: white;
}

.app-logOut {
    display: flex;
    flex: 1;
    justify-content: flex-end;
    align-items: center;
}

.mainBody {
    display: flex;
    width: 100%;
}

aside {
    flex: 1;
    box-sizing: content-box;
    min-width: 10vw;
    min-height: calc(100vh - 120px);
    background-color: #24292f;
    border-bottom: 2px solid #24292f;
    border-right: 1px solid #24292f;
}

main {
    flex: 9;
}

.foot {
    /* position: absolute;
    left: 0;
    bottom: 0; */
    width: 100%;
    height: 58px;
    background-color: #24292f;
}
</style>