import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Layout from "@/views/layout/Layout.vue";

const routes = [
  {
    path: "/",
    component: Layout,
    redirect:"/goods",
    children:[
      {
        path:"/goods",
        component:()=>import("@/views/goods/Goods.vue")
      },
      {
        path:"/shop",
        component:()=>import("@/views/shop/Shop.vue")
      },
      {
        path:"/ratting",
        component:()=>import("@/views/ratting/Ratting.vue")
      },
    ]
  },
  {
    path: "/details",
    component: () => import("@/views/goods/details.vue")
  },
  {
    path: "*",
    component: () => import("@/views/Erro.vue")
  }
]

const router = new VueRouter({
  routes
})

export default router
