<template>
  <div class="flex min-h-screen flex-col bg-slate-50 text-slate-800">
    <TheHeader />
    <main class="container mx-auto w-full flex-grow px-4 py-8 sm:px-6 lg:px-8">
      <RouterView />
    </main>
    <TheFooter />
  </div>
</template>

<script>
import { mapActions } from 'pinia';
import TheHeader from '@/components/TheHeader.vue';
import TheFooter from '@/components/TheFooter.vue';
import { useFavorites } from '@/stores/favoritesProducts.js';
import { useCart } from '@/stores/cartProducts.js';

export default {
  components: { TheFooter, TheHeader },
  methods: {
    ...mapActions(useFavorites, ['getData']),
    ...mapActions(useCart, ['getDataCart'])
  },
  mounted() {
    this.getData();
    this.getDataCart();
  }
};
</script>
