<template>
  <router-link
    :to="`/product/${item.id}`"
    class="flex flex-col overflow-hidden rounded-xl bg-white text-black shadow-md transition-shadow duration-300 hover:shadow-xl hover:-translate-y-1"
  >
    <div class="relative">
      <img class="h-80 w-full object-cover" :src="item.image" alt="Картинка товара" />
      <vue-feather
        @click.prevent="handleFavoriteClick"
        :fill="isFavoriteLocal ? 'white' : 'none'"
        stroke="white"
        class="absolute top-3 right-3 cursor-pointer rounded-full bg-black/30 p-1.5 transition-transform hover:scale-110"
        type="heart"
      />
    </div>
    <div class="flex flex-grow flex-col justify-between gap-3 p-3">
      <span class="h-10 text-sm font-medium">{{ item.title }}</span>
      <div class="flex items-center justify-between">
        <span class="text-xl font-bold">{{ item.price }} ₽</span>
        <button
          @click.prevent="addProduct(item)"
          class="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-purple-700 text-white transition hover:bg-purple-800"
          aria-label="Добавить в корзину"
        >
          <vue-feather type="shopping-cart" class="h-5 w-5" />
        </button>
      </div>
      <div
        class="mt-1 flex w-full cursor-pointer items-center justify-center rounded-lg bg-gray-200 py-2 font-semibold text-gray-800 transition hover:bg-gray-300"
      >
        <span>Подробнее</span>
      </div>
    </div>
  </router-link>
</template>

<script>
import { mapActions } from 'pinia'
import { useFavorites } from '@/stores/favoritesProducts.js'
import { useCart } from '@/stores/cartProducts.js'

export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      isFavoriteLocal: this.item.isFavorite
    };
  },

  watch: {
    'item.isFavorite'(newValue) {
      this.isFavoriteLocal = newValue;
    }
  },

  methods: {
    ...mapActions(useFavorites, ['toggleFavorite']),
    ...mapActions(useCart, ['addProduct']),

    handleFavoriteClick() {
      this.isFavoriteLocal = !this.isFavoriteLocal;
      this.toggleFavorite(this.item);
    }
  }
}
</script>

<style scoped>

</style>
