import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';
import { Message } from 'element-ui';
import $ from 'jquery'
import 'element-ui/lib/theme-chalk/index.css';
import 'babel-polyfill';
import globalData from '@/common'

import api from './api/index.js';
Vue.prototype.$api = api;


let sta = {
    isLogin: false,
    adminName: ''
};
Vue.prototype.$sta = sta;

Vue.prototype.$globalData = globalData;

Vue.config.productionTip = false;

Vue.use(ElementUI, {
    size: 'medium'
});


router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title}`;
    // console.log(to.path,'userInfo:',Vue.prototype.$globalData.userInfo);
    const nickname = Vue.prototype.$globalData.userInfo.nickname;
    if (!nickname
        && (to.path === '/me'
            || to.path === '/message'
            || to.path === '/release'
            || to.path === '/order')) {
        api.getUserInfo().then(res => {
            console.log('getUserInfo:', res);
            if (res.status_code !== 1) {
                if (to.path === '/release') {
                    // 用户点击了发布商品的按钮
                    Message.error({ message: '只有商家能够发布商品哦~请先升级为商家然后登录再试', showClose: true });
                    next("/login-merchant");
                } else {
                    Message.error({ message: '您还未登录或登录过期，请登录后再试', showClose: true });
                    next('/login');
                }

            } else {
                res.data.signInTime = res.data.signInTime.substring(0, 10);
                Vue.prototype.$globalData.userInfo = res.data;
                next();
            }
        }).catch(e => {
            Message.error({ message: '您还未登录或登录过期，请登录后再试', showClose: true });
            next('/login');
        });

    } else {
        next();
    }
});

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
