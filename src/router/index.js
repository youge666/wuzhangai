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

export default router
