import Vue from 'vue';
import Router from 'vue-router';
// import myVue from '@/main.js'
import globalData from '../common/index'

const originalReplace = Router.prototype.replace;
Router.prototype.replace = function replace(location) {
    return originalReplace.call(this, location).catch(err => err);
};
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
};

Vue.use(Router);
// console.log(globalData);
export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/index'
        },
        {
            path: '/index',
            component: () => import('../components/page/index.vue'),
            meta: { title: '美孚兰'  }
        },
        {
            path: '/search',
            component: () => import('../components/page/search.vue'),
            meta: { title: '物品搜索 | '+globalData.appInfo.appname }
        },
        {
            path: '/me',
            component: () => import('../components/page/me.vue'),
            meta: { title: '个人中心 | '+globalData.appInfo.appname }
        },
        {
            path: '/message',
            component: () => import('../components/page/message.vue'),
            meta: { title: '消息 | '+globalData.appInfo.appname }
        },
        {
            path: '/release',
            component: () => import('../components/page/release.vue'),
            meta: { title: '发布宝贝 | '+globalData.appInfo.appname }
        },
    
        {
            path: '/details',
            component: () => import('../components/page/idle-details.vue'),
            meta: { title: '物品详情 | '+globalData.appInfo.appname }
        },
        {
            path: '/order',
            component: () => import('../components/page/order.vue'),
            meta: { title: '订单详情 | '+globalData.appInfo.appname }
        },
        {
            path: '/login',
            component: () => import('../components/page/login.vue'),
            meta: { title: '登录 | '+globalData.appInfo.appname }
        },
        {
            path:'/upgrade',
            component:()=>import('../components/page/upgradePage.vue'),
            meta:{title:'用户升级成商家 |'+globalData.appInfo.appname}
        },
        {
            path:'/login-merchant',
            component:()=>import("../components/page/login-merchant.vue"),
            meta:{title:'商家登录 | '+globalData.appInfo.appname}
        },
        {
            path: '/sign-in',
            component: () => import('../components/page/sign-in.vue'),
            meta: { title: '注册 | '+globalData.appInfo.appname }
        },
        {
            path: '/login-admin',
            component: () => import('../components/page/login-admin.vue'),
            meta: { title: globalData.appInfo.appname+'后台登录' }
        },
        {
            path: '/platform-admin',
            component: () => import('../components/page/platform-admin.vue'),
            meta: { title: globalData.appInfo.appname+'后台管理' }
        },
        {
            path: '*',
            redirect: '/'
        }
    ]
});
