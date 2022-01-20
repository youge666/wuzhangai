import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home'
import Login from '@/components/Login'
import Welcome from '@/components/Welcome'
import RouteQuery from '@/components/bus_route/RouteQuery'
import StationQuery from '@/components/bus_route/StationQuery'
import RouteDetection from '@/components/bus_route/RouteDetection'
import BuildQuery from '@/components/infrastructure/BuildQuery'
import RoutePlan from '@/components/route_plan/RoutePlan'
import DisableVisual from '@/components/disable/DisableVisual'

Vue.use(VueRouter)

const routes = [
  { path: '/login', component: Login },
  { path: '/', redirect: '/login' },
  {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children: [
      { path: '/welcome', component: Welcome },
      { path: '/route_query', component: RouteQuery },
      { path: '/station_query', component: StationQuery },
      { path: '/route_detection', component: RouteDetection },
      { path: '/build_query', component: BuildQuery },
      { path: '/route_plan', component: RoutePlan },
      { path: '/disable_visual', component: DisableVisual }
    ]
  }
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
