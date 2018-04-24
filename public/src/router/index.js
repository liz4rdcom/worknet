import Vue from 'vue'
import Router from 'vue-router'
import Cookies from 'js-cookie'
import profile from '../components/profile/profile'
import vacancies from '../components/vacancy/vacancies'
import vacancyView from '../components/vacancy/vacancy-view'
import vacancyAdd from '../components/vacancy/vacancy-add'
import login from '../components/um/login'
import register from '../components/um/register'
// import utils from '../utils'
import { bus } from '../components/common/bus'

Vue.use(Router)

let router = new Router({
  routes: [
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
  // console.log('start', to.path)

  if (!Cookies.get('token')) {
    bus.$emit('logout')

    // console.log('no token')

    if (to.path === '/login' || to.path === '/register' || to.path === '/vacancies') {
      next()

      // console.log('no token: login, register, vacancies')

      return
    }

    router.push('/vacancies')
    return
  }

  // console.log('yes token')

  if (to.path === '/login' || to.path === '/register') {
    router.push('/vacancies')

    // console.log('yes token: login, register')

    return
  }

  next()
})

export default router
