import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import InstrumentInsight from '../views/InstrumentInsight.vue'
// Use the correct type for the routes array
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'InstrumentInsight',
    component: InstrumentInsight
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router