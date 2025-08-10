<template>
  <header class="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
    <div class="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
      <router-link to="/">
        <div class="flex items-center gap-2">
          <img alt="Лого" class="h-10 w-auto" src="/src/assets/header-logo.png" />
          <span class="text-xl font-bold text-slate-900">Pet Shop</span>
        </div>
      </router-link>

      <div class="flex items-center gap-4">
        <router-link to="/favorites" class="relative rounded-full p-2 text-slate-600 transition hover:bg-slate-100 hover:text-purple-600">
          <vue-feather type="heart" />
          <span v-if="favoritesCounter > 0" class="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-purple-600 text-xs font-bold text-white">
            {{ favoritesCounter }}
          </span>
        </router-link>

        <router-link to="/cart" class="relative rounded-full p-2 text-slate-600 transition hover:bg-slate-100 hover:text-purple-600">
          <vue-feather type="shopping-cart" />
          <span v-if="cartCounter > 0" class="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-purple-600 text-xs font-bold text-white">
            {{ cartCounter }}
          </span>
        </router-link>
      </div>
    </div>
  </header>
</template>

<script>
import { mapState } from 'pinia';
import { useFavorites } from '@/stores/favoritesProducts.js';
import { useCart } from '@/stores/cartProducts.js';

export default {
  computed: {
    ...mapState(useFavorites, {
      favoritesCounter: 'counter'
    }),
    ...mapState(useCart, {
      cartCounter: 'counter'
    })
  }
};
</script>
