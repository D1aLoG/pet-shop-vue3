import { createRouter, createWebHistory } from 'vue-router';
import home from './routes/home.js';
import favorites from './routes/favorites.js';
import cart from './routes/cart.js';
import product from './routes/product.js';
import checkout from './routes/checkout.js';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...home,
    ...favorites,
    ...cart,
    ...product,
    ...checkout,
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: () => import('../views/notFound/NotFoundView.vue')
    }
  ]
});

export default router;
