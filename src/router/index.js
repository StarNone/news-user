import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      redirect: '/index',
      component: () => import('@/views/index'),
      children: [
        {
          path: '/index',
          name: 'homepage',
          meta: {
            title: '首页'
          },
          component: () => import('@/views/homepage')
        },
        {
          path: '/detail/:id',
          name: 'detail',
          meta: {
            title: '新闻详情'
          },
          component: () => import('@/views/detail')
        },
        {
          path: '/login',
          name: 'login',
          meta: {
            title: '登录'
          },
          component: () => import('@/views/login')
        },
        {
          path: '/register',
          name: 'register',
          meta: {
            title: '注册'
          },
          component: () => import('@/views/register')
        },
        {
          path: '/person',
          name: 'person',
          meta: {
            title: '个人中心'
          },
          component: () => import('@/views/person')
        },
        {
          path: '/swiper/:id',
          name: 'swiperdetails',
          meta: {
            title: '轮播图详情'
          },
          component: () => import('@/views/detail/detail')
        },
        {
          path: '/changepassword',
          name: 'changepassword',
          meta: {
            title: '修改密码'
          },
          component: () => import('@/views/changepassword')
        },
        {
          path: '/usernews/:id',
          name: 'usernews',
          meta: {
            title: '新闻详情'
          },
          component: () => import('@/views/detail/usernewsdetail')
        },
        {
          path: '/morenews/:id',
          name: 'morenews',
          meta: {
            title: '更多新闻'
          },
          component: () => import('@/views/morenews')
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  let title = to.meta.title
  document.title = title
  next()
})

export default router
