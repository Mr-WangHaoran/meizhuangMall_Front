<template>
    <div class="header">
        <div class="header-container">
            <div class="app-name">
                <div id="logo">
                    <el-image src="mall.png"></el-image>
                </div>
                <el-tooltip class="item" effect="dark" content="将跳转至首页" placement="bottom-start">
                    <router-link to="/">欢迎来到{{ $globalData.appInfo.appname }}</router-link>
                </el-tooltip>
            </div>
            <div class="search-container">
                <el-input placeholder="搜索物品，支持模糊查询" v-model="searchValue" @keyup.enter.native="searchIdle">
                    <el-button slot="append" icon="el-icon-search" @click="searchIdle"></el-button>
                </el-input>
            </div>
            <el-tooltip class="item" effect="dark" content="成为商家，发布商品" placement="bottom-start">
                <el-button type="danger" icon="el-icon-plus" @click="toRelease" v-if="($globalData.userInfo.isMerchant==1&&$globalData.merchantLogin)||$globalData.userInfo.isMerchant==null">发布商品</el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="升级成为商家" placement="bottom-start">
                <el-button type="danger" icon="el-icon-plus" @click="toUpgradePage" v-if="$globalData.userInfo.isMerchant==0||$globalData.userInfo.isMerchant==null">升级成为商家</el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="查看评论" placement="bottom-start">
                <el-button type="info" icon="el-icon-chat-dot-round" @click="toMessage">消息</el-button>
            </el-tooltip>
            <router-link v-if="!isLogin" class="user-name-text" to="/login">登录</router-link>
            <el-dropdown trigger="click" v-else>
                <div style="cursor:pointer;display: flex;align-items: center;">
                    <div style="font-size: 16px;color: #eee;padding-right: 5px;">
                        {{ nicknameValue?nicknameValue: nickname }}</div>
                    <el-avatar :src="avatarValue ? avatarValue : avatar"></el-avatar>
                </div>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>
                        <div @click="toMe">个人中心</div>
                    </el-dropdown-item>
                    <el-dropdown-item divided style="color: red;">
                        <div @click="loginOut">退出登录</div>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>
<script>

export default {
    name: 'Header',
    props: ['searchInput', 'nicknameValue', 'avatarValue'],
    data() {
        return {
            searchValue: this.searchInput,
            nickname: '登录',
            avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
            isLogin: false
        };
    },
    created() {
        // console.log("header");
        if (!this.$globalData.userInfo.nickname) {
            this.$api.getUserInfo().then(res => {
                console.log('Header getUserInfo:', res);
                if (res.status_code === 1) {
                    this.nickname = res.data.nickname;
                    this.avatar = res.data.avatar;
                    res.data.signInTime = res.data.signInTime.substring(0, 10);
                    this.$globalData.userInfo = res.data;
                    this.isLogin = true;
                }
            })
        } else {
            this.nickname = this.$globalData.userInfo.nickname;
            this.avatar = this.$globalData.userInfo.avatar;
            this.isLogin = true;
        }
    },
    methods: {
        searchIdle() {
            if ('/search' !== this.$route.path) {
                this.$router.push({ path: '/search', query: { searchValue: this.searchValue } });
            } else {
                this.$router.replace({ path: '/search', query: { searchValue: this.searchValue } });
                this.$router.go(0);
            }

        },
        toMe() {
            if ('/me' !== this.$route.path) {
                this.$router.push({ path: '/me' });
            }
        },
        toMessage() {
            if ('/message' !== this.$route.path) {
                this.$router.push({ path: '/message' });
            }
        },
        toRelease() {
            if ('/release' !== this.$route.path) {
                this.$router.push({ path: '/release' });
            }
        },
        toUpgradePage(){
            if('/upgrade' !==this.$route.path){
                this.$router.push({path:'/upgrade'})
            }
        },
        loginOut() {
            this.$api.logout().then(res => {
                if (res.status_code === 1) {
                    // 将用户登录后保存的信息置空
                    this.$globalData.userInfo = {};
                    // 将商家登录模式置为false
                    this.$globalData.merchantLogin = false;
                    console.log("login out");
                    if ('/index' === this.$route.path) {
                        this.$router.go(0);
                    } else {
                        this.$router.push({ path: '/index' });
                    }
                } else {
                    this.$message.error('网络或系统异常，退出登录失败！');
                }
            });

        }
    }
};
</script>
<style scoped>
.header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 58px;
    background: #24292f;
    display: flex;
    justify-content: center;
    border-bottom: #eeeeee solid 2px;
    z-index: 1000;
    box-shadow: 0 -10px 20px 20px #ccc;
}

.header-container {
    width: 1000px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

#logo {
    width: 55px;
    display: inline-block;
    position: absolute;
    left: -33%;
    top: -25%;
}

.app-name {
    position: relative;
}

.app-name a {
    color: #eeeeee;
    font-size: 28px;
    text-decoration: none;
}

.search-container {
    width: 300px;
}

.user-name-text {
    font-size: 16px;
    font-weight: 600;
    color: #eeeeee;
    cursor: pointer;
    text-decoration: none;
}
</style>
