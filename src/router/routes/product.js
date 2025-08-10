export default [
  {
    path: '/product/:id',
    name: 'product-item',
    component: () => import('@/views/product/ProductView.vue')
  }
];
