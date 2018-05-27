import Vue from 'vue'
import Router from 'vue-router'
import Cookies from 'js-cookie'
import profile from '../components/profile/profile'
import vacancies from '../components/vacancy/vacancies'
import vacancyView from '../components/vacancy/vacancy-view'
import vacancyAdd from '../components/vacancy/vacancyAdd/vacancy-add'
import ownVacancies from '../components/vacancy/ownVacancies/own-vacancies'
import vacanciesList from '../components/vacancy/ownVacancies/vacancies-list'
import ownVacancyView from '../components/vacancy/ownVacancies/own-vacancy-view'
import vacancyMatchings from '../components/vacancy/vacancies-user-matching'
import vacancyViewDummyUser from '../components/common/vacancy-view-dummy-user'
import login from '../components/um/login'
import register from '../components/um/register'
import { bus } from '../components/common/bus'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/vacancies',
    },
    {
      path: '/profile',
      name: 'profile',
      component: profile,
    },
    {
      path: '/vacancies',
      name: 'vacancies',
      component: vacancies,
    },
    {
      path: '/vacancies/:id/view',
      name: 'vacancy-view',
      component: vacancyView,
      props: true,
    },
    {
      path: '/vacancies/add',
      name: 'vacancy-add',
      component: vacancyAdd,
    },
    {
      path: '/vacancies/add/:id',
      name: 'vacancy-add-id',
      component: vacancyAdd,
      props: true,
    },
    {
      path: '/vacancies/own',
      component: ownVacancies,
      children: [
        {
          path: '/',
          redirect: '/vacancies/own/all',
        },
        {
          path: 'all',
          component: vacanciesList,
          props: { vacanciesStatus: 3 },
          children: [
            {
              path: ':id',
              name: 'all-vacancies-own',
              component: ownVacancyView,
              props: true,
            },
          ],
        },
        {
          path: 'draft',
          component: vacanciesList,
          props: { vacanciesStatus: 0 },
          children: [
            {
              path: ':id',
              name: 'draft-vacancies-own',
              component: ownVacancyView,
              props: true,
            },
          ],
        },
        {
          path: 'published',
          component: vacanciesList,
          props: { vacanciesStatus: 1 },
          children: [
            {
              path: ':id',
              name: 'published-vacancies-own',
              component: ownVacancyView,
              props: true,
            },
          ],
        },
        {
          path: 'expired',
          component: vacanciesList,
          props: { vacanciesStatus: 2 },
          children: [
            {
              path: ':id',
              name: 'expired-vacancies-own',
              component: ownVacancyView,
              props: true,
            },
          ],
        },
      ],
    },
    {
      path: '/login',
      component: login,
      name: 'login',
    },
    {
      path: '/register',
      component: register,
      name: 'register',
    },
    {
      path: '/vacancies-matching',
      component: vacancyMatchings,
      name: 'vacancies-user-matching',
    },
    {
      path: '/vacancy-view-dummy-user',
      component: vacancyViewDummyUser,
      name: 'vacancy-view-dummy-user',
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  // console.log('start', to.path) //

  if (!Cookies.get('token')) {
    bus.$emit('logout')

    // console.log('no token') //

    if (to.path === '/login' || to.path === '/register' || to.path === '/vacancies') {
      next()

      // console.log('no token: login, register, vacancies') //

      return
    }

    next('/login')
    return
  }

  // console.log('yes token') //

  if (to.path === '/login' || to.path === '/register') {
    next('/profile')

    // console.log('yes token: login, register') //

    return
  }

  next()
})

export default router
