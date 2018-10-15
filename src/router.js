import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

import Signin from '@/components/Signin'
import Main from '@/components/Main'
import PageNotFound from '@/components/PageNotFound'
import Product from '@/components/product/Product'
import ProductItem from '@/components/product/ProductItem'

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
          name: 'products',
          component: Product
        },
        {
          path: 'products/:id',
          name: 'products-item',
          component: ProductItem
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
