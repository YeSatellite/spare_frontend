import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

import Signin from '@/components/Signin'
import Main from '@/components/Main'
import PageNotFound from '@/components/PageNotFound'
import Product from '@/components/product/Product'
import ProductSelected from '@/components/product/ProductSelected'
import Order from '@/components/order/Order'
import OrderSelected from "@/components/order/OrderSelected";
import Trade from "@/components/order/TradeList";
import Client from "@/components/client/Client";
import ClientSelected from "@/components/client/ClientSelected";

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/signin',
      name: 'signin',
      component: Signin
    },
    {
      path: '/',
      name: 'main',
      component: Main,
      children: [
        {
          path: 'products',
          name: 'product',
          component: Product,
        },
        {
          path: '/products/:id',
          name: 'product-selected',
          component: ProductSelected
        },
        {
          path: '/orders',
          name: 'order',
          component: Order
        },
        {
          path: '/orders/:id',
          name: 'order-selected',
          component: OrderSelected
        },
        {
          path: '/clients',
          name: 'client',
          component: Client
        },
        {
          path: '/clients/:id',
          name: 'client-selected',
          component: ClientSelected
        },
      ]

    },
    {
      path: '*',
      name: '404',
      component: PageNotFound
    }
  ]
})
