import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../views/LoginPage.vue'
import HomePage from '../views/HomePage.vue'
import RegisterPage from '../views/Register.vue'
import DetailCampus from '../views/DetailCampus.vue'
import FavouritePage from '../views/FavouritePage.vue'
import DetailExam from '../views/DetailExam.vue'
import SNMPTNPage from '../views/SNMPTNPage.vue'
import DetailInvitee from '../views/DetailInvitee.vue'
import Score from '../components/Score.vue'
import News from '../components/Corrorsel.vue'




const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterPage
    },
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/campuses/:id',
      name: 'detail',
      component: DetailCampus
    },
    {
      path: '/favourites',
      name: 'favourites',
      component: FavouritePage
    },
    {
      path: '/exams/:id',
      name: 'exam',
      component: DetailExam
    },
    {
      path: '/invitees',
      name: 'invitee',
      component: SNMPTNPage
    },
    {
      path: '/invitees/:id',
      name: 'info',
      component: DetailInvitee
    },
    {
      path: '/tests/:id',
      name: 'test',
      component: Score
    },
    {
      path: '/news',
      name: 'news',
      component: News
    },
 
  ]
})

// router.beforeEach((to, from, next) => {
//   const isAuthen = localStorage.token

//   if (isAuthen && (to.name ==='login' || to.name ==='register')) next ('/')
//   else if (!isAuthen && (to.name === 'bookmark' ) )  next ('/login')
//   else next()

// })

export default router
