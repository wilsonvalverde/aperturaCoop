import Vue from 'vue'
import VueRouter from 'vue-router'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import Map from '../views/Map.vue'
import Registrado from '../components/Thanks'
import Re from '../components/Recaptcha';
import Cam from '../components/Cam';
import Face from '../components/Face';
import Graphi from '../components/Graphics';
import error from '../components/Error';
//import logo from '../assets/icons/logo_1.png'

Vue.use(VueRouter)

const routes = [
  {
    path: '/map',
    component: Map
  },
  {
    path: '/gra',
    component: Graphi
  },
  {
    path: '/re',
    name: 're',
    component: Re
  },
  {
    path: '/cam',
    name: 'cam',
    component: Cam
  },
  {
    path: '/face',
    name: 'face',
    component: Face
  },
  {
    path: '/registro',
    name: 'register',
    component: Register
  },
  {
    path: '/',
    name: 'login',
    component: Login
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    //component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/error',
    name: '/error',
    component: error
  },
  {
    path: '/registrado',
    name: 'registered',
    component: Registrado
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
