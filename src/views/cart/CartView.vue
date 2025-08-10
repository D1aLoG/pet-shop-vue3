<template>
  <div class="mx-auto w-full max-w-4xl">
    <h1 class="mb-6 text-3xl font-bold text-slate-900">Корзина</h1>

    <ProgressSpinner v-if="pending" />

    <div v-else-if="products.length === 0" class="py-16 text-center text-slate-500">
      <h2 class="text-xl font-semibold">Ваша корзина пуста</h2>
      <router-link to="/" class="mt-4 inline-block text-purple-600 hover:underline"> Перейти в каталог </router-link>
    </div>

    <div v-else class="flex flex-col gap-6">
      <CartProduct v-for="(product, index) in products" :key="product.id" :item="product" :index="index" />

      <div class="mt-4 flex flex-col items-end gap-4 self-end rounded-lg border bg-white p-6 shadow-sm">
        <div class="text-right">
          <span class="text-slate-500">Общая сумма:</span>
          <span class="ml-2 text-2xl font-bold text-slate-900">{{ total.toFixed(2) }} ₽</span>
        </div>
        <router-link
          to="/checkout"
          class="w-full rounded-lg bg-green-600 py-3 text-center font-bold text-white transition hover:bg-green-700"
        >
          Оформить заказ
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'pinia';
import { useCart } from '@/stores/cartProducts.js';
import CartProduct from './components/CartProduct.vue';
import ProgressSpinner from 'primevue/progressspinner';

export default {
  components: { CartProduct, ProgressSpinner },
  computed: {
    ...mapState(useCart, ['products', 'pending']),
    total() {
      return this.products.reduce((sum, item) => sum + item.price * item.quantity, 0);
    },
  },
};
</script>
