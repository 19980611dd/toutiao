import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/layout/home'
  },
  {
    path: '/login',
    component: () => import('@/views/Login/index.vue'),
    name: 'Login'
  },
  {
    path: '/layout',
    component: () => import('@/views/layout/index.vue'),
    children: [
      {
        path: '/layout/home',
        component: () => import('@/views/home/index.vue')
      },
      {
        path: '/layout/qa',
        component: () => import('@/views/qa/index.vue')
      },
      {
        path: '/layout/video',
        component: () => import('@/views/video/index.vue')
      },
      {
        path: '/layout/my',
        component: () => import('@/views/my/index.vue')
      }
    ]
  },
  {
    path: '/search',
    component: () => import('@/views/search/index.vue')
  },
  {
    path: '/article/:articleId',
    name: 'article',
    component: () => import('@/views/article/index.vue'),
    props: true
  }
]

const router = new VueRouter({
  routes
})

export default router
