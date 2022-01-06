import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home'
import Login from '@/components/Login'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   redirect: '/home',
  //   component: Home,
  //   children: [
  //     {}
  //   ]
  // }
  { path: '/login', component: Login },
  { path: '/', redirect: '/login' },
  { path: '/home', component: Home }
]

const router = new VueRouter({
  routes
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 代表从哪个路径跳转而来
  // next 是一个函数，表示放行
  // next() 直接放行   next('/login') 强制跳转到'/login'

  if (to.path === '/login') return next()
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token')
  console.log(tokenStr)
  if (!tokenStr) return next('/login')
  next()
})

export default router
