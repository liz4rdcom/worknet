import Vue from 'vue'
import Router from 'vue-router'
import Cookies from 'js-cookie'
import HelloWorld from '@/components/HelloWorld'
import profile from '../components/profile/profile'
import vacancies from '../components/vacancy/vacancies'
import vacancyView from '../components/vacancy/vacancy-view'
import vacancyAdd from '../components/vacancy/vacancy-add'
import login from '../components/um/login'
import register from '../components/um/register'
import utils from '../utils'
import { bus } from '../components/common/bus'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/profile',
      name: 'profile',
      component: profile
    },
    {
      path: '/vacancies',
      name: 'vacancies',
      component: vacancies
    },
    {
      path: '/vacancies/:id/view',
      name: 'vacancy-view',
      component: vacancyView,
      props: true
    },
    {
      path: '/vacancies/new',
      name: 'vacancy-add',
      component: vacancyAdd
    },
    {
      path: '/login',
      component: login,
      name: 'login'
    },
    {
      path: '/register',
      component: register,
      name: 'register'
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  if (!Cookies.get('token')) {
    bus.$emit('logout')

    if (to.path === '/login' || to.path === '/register') {
      next()
      return
    }
    if (to.path === '/vacancies') {
      next()
      return
    }

    router.push('/vacancies')
    return
  }

  if (to.path === '/login' || to.path === '/register') {
    router.push('/vacancies')
    return
  }

  next()
})

export default router
