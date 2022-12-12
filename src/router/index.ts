import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import CatFactsTable from '../views/CatFactsTable.vue'
import FactDetails from '../views/FactDetailsPage.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'facts',
    component: CatFactsTable
  },
  {
    path: `/facts/fact-:id`,
    name: `fun fact`,
    props:     true,
    component: FactDetails
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
