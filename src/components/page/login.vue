<template>
    <div class="login-container">
        <el-card class="box-card">
            <div class="login-body" style="position:relative">
                <div style="position:absolute;top:-10px;left:1px;cursor: pointer;" @click="$router.replace('/index')">&lt;-返回</div>
                <el-tooltip class="item" effect="dark" content="点击我返回主页" placement="top">
                    <div class="login-title" @click="toIndex">{{ $globalData.appInfo.appname }}-用户登录</div>
                </el-tooltip>
                <el-form ref="form" :model="userForm">
                    <el-input placeholder="请输入手机号..." v-model="userForm.accountNumber" class="login-input">
                        <template slot="prepend">
                            <div class="el-icon-user-solid"></div>
                        </template>
                    </el-input>
                    <el-input placeholder="请输入密码..." v-model="userForm.userPassword" class="login-input"
                        @keyup.enter.native="login" show-password>
                        <template slot="prepend">
                            <div class="el-icon-lock"></div>
                        </template>
                    </el-input>
                    <div class="login-submit">
                        <el-button type="primary" @click="login">登录</el-button>
                    </div>
                    <div class="other-submit">
                        <router-link to="/sign-in" class="sign-in-text">注册</router-link>
                        <router-link to="/login-merchant" class="sign-in-text">商家登录</router-link>
                        <router-link to="/login-admin" class="sign-in-text">管理员登录</router-link>
                    </div>
                </el-form>
            </div>
        </el-card>
    </div>
</template>

<script>
export default {
    name: "login",
    data() {
        return {
            userForm: {
                accountNumber: '12312312311',
                userPassword: '123456'
            }
        };
    },

    methods: {
        login() {
            this.$api.userLogin({
                accountNumber: this.userForm.accountNumber,
                userPassword: this.userForm.userPassword
            }).then(res => {
                console.log(res);
                if (res.status_code === 1) {
                    res.data.signInTime = res.data.signInTime.substring(0, 10);
                    this.$globalData.userInfo = res.data;
                    this.$router.replace({ path: '/index' });
                } else {
                    this.$message.error(res.msg);
                }
            });
        },
        toIndex() {
            this.$router.replace({ path: '/index' });
        }
    }
}
</script>

<style scoped>
.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100%;
    /* background-color: #f1f1f1; */
    background-image: linear-gradient(#f6f6f6, #cef1f7);

}

.login-body {
    padding: 30px;
    width: 400px;
    height: 100%;
}

.login-title {
    padding-bottom: 30px;
    text-align: center;
    font-weight: 600;
    font-size: 32px;
    color: #0e49a1;
    cursor: pointer;
}

.login-input {
    margin-bottom: 20px;
}

.login-submit {
    display: flex;
    justify-content: center;
}

.sign-in-container {
    padding: 0 10px;
}

.sign-in-text {
    color: #409EFF;
    font-size: 16px;
    text-decoration: none;
    line-height: 28px;
}

.other-submit {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
}
</style>