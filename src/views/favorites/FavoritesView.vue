<template>
  <div class="flex min-h-60 w-full flex-col">
    <h1 class="mb-3 mr-auto text-[36px] font-bold">Избранное</h1>
    <ProgressSpinner v-if="pending" />
    <div v-else class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <Product v-for="product in productsWithFavoriteFlag" :key="product.id" :item="product" />
      <div v-if="products.length === 0">У вас нет товаров в избранном</div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'pinia';
import { useFavorites } from '@/stores/favoritesProducts.js';
import Product from '@/components/product/Product.vue';
import ProgressSpinner from 'primevue/progressspinner';

export default {
  components: { Product, ProgressSpinner },
  computed: {
    ...mapState(useFavorites, ['products', 'pending']),
    productsWithFavoriteFlag() {
      return this.products.map(p => ({ ...p, isFavorite: true }));
    }
  }
};
</script>
