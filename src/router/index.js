import Vue from "vue";
import VueRouter from "vue-router";
import Home from '../views/Home.vue'
import User from '../views/User.vue'
import Main from '../views/Main.vue'
import Mall from '../views/Mall.vue'
import PageOne from '../views/PageOne.vue'
import PageTwo from '../views/PageTwo.vue'
import Login from '../views/Login.vue'
import Cookie from "js-cookie";
Vue.use(VueRouter)
const routes = [
    {
        path: "/",
        component: Main,
        name:'Main',
        redirect: '/home',//重定向
        children: [
            // { path: 'home', name: "home", component: Home },
            // { path: 'user', name: "user", component: User },
            // { path: "mall", name: "mall", component: Mall },
            // { path: "page1", name: "page1", component: PageOne },
            // { path: "page2", name: "page2", component: PageTwo }
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
    }
]
const router = new VueRouter({
    routes
})


// 全局前置导航首位
router.beforeEach((to, from, next) => {
    // 判断token存不存在
    const token = Cookie.get('token')
    // token不存在，说明当前用户已登录，应该跳转至登录页
    if (!token && to.name !== 'login') {
      next({ name: 'login' })
    } else if (token && to.name === 'login') {
      // token存在说明用户已登录
      next({ name: 'home' })
    } else {
      next()
    }
  })

export default router