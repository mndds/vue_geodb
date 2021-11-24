import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import CountryList from '../views/CountryList.vue'
import ShowCountry from '../views/ShowCountry.vue'
import ShowRegion from '../views/ShowRegion.vue'
import ShowCity from '../views/ShowCity.vue'
import CityList from '../views/CityList.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/countries',
    name: 'CountryList',
    component: CountryList
  },
  {
    path: '/countries/:countryId',
    name: 'ShowCountry',
    component: ShowCountry
  },
  {
    path: '/countries/:countryId/:regionCode',
    name: 'ShowRegion',
    component: ShowRegion
  },
  {
    path: '/cities/:cityId',
    name: 'ShowCity',
    component: ShowCity
  },
  {
    path: '/cities',
    name: 'CityList',
    component: CityList
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
