<template>
  <div class="w-full">
    <div v-if="displayProduct" class="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
      <div class="w-full">
        <img :src="displayProduct.image" alt="Product image" class="h-auto w-full rounded-lg object-cover shadow-md" />
      </div>

      <div class="flex flex-col justify-center gap-4">
        <h1 class="text-3xl font-bold text-slate-900 md:text-4xl">
          {{ displayProduct.title }}
        </h1>

        <div v-if="displayProduct.rating" class="flex items-center gap-2">
          <vue-feather type="star" class="h-5 w-5 fill-orange-400 stroke-orange-400" />
          <span class="font-semibold text-slate-600">{{ displayProduct.rating }}</span>
        </div>

        <div class="my-2 text-4xl font-extrabold text-slate-900">{{ displayProduct.price }} ₽</div>

        <div class="flex flex-col items-stretch gap-3 sm:flex-row">
          <button
            @click.prevent="addProduct(displayProduct)"
            class="flex flex-grow items-center justify-center gap-3 rounded-lg bg-purple-600 px-6 py-3 font-bold text-white transition hover:bg-purple-700"
          >
            <vue-feather type="shopping-cart" class="h-5 w-5" />
            Добавить в корзину
          </button>
          <button
            @click.prevent="handleFavoriteClick"
            :class="[
              'flex items-center justify-center rounded-lg border p-3 transition',
              isFavoriteLocal
                ? 'border-red-500 bg-red-50 text-red-600'
                : 'border-slate-300 text-slate-500 hover:bg-slate-100',
            ]"
            aria-label="Добавить в избранное"
          >
            <vue-feather type="heart" :fill="isFavoriteLocal ? 'currentColor' : 'none'" class="h-5 w-5" />
          </button>
        </div>

        <div class="mt-6">
          <h2 class="text-lg font-semibold text-slate-900">Описание</h2>
          <p class="mt-2 leading-relaxed text-slate-600">
            {{ displayProduct.description }}
          </p>
        </div>
      </div>
    </div>

    <div v-else-if="pending" class="flex h-96 items-center justify-center">
      <ProgressSpinner />
    </div>

    <div v-else class="py-16 text-center text-slate-500">
      <h2 class="text-xl font-semibold">Товар не найден</h2>
      <router-link to="/" class="mt-4 inline-block text-purple-600 hover:underline"> Вернуться в каталог </router-link>
    </div>

    <div v-if="similarProducts.length > 0" class="mt-16 w-full lg:mt-24">
      <h2 class="mb-6 text-2xl font-bold text-slate-900">Похожие товары</h2>
      <div class="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <Product v-for="similarItem in similarProducts" :key="similarItem.id" :item="similarItem" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import { useProduct } from '@/stores/product.js';
import { useFavorites } from '@/stores/favoritesProducts.js';
import { useCart } from '@/stores/cartProducts.js';
import { useProducts } from '@/stores/products.js';
import ProgressSpinner from 'primevue/progressspinner';
import ProductCard from '@/components/product/ProductCard.vue';

export default {
  components: {
    ProgressSpinner,
    Product: ProductCard,
  },
  data() {
    return {
      displayProduct: null,
      isFavoriteLocal: false,
    };
  },
  computed: {
    ...mapState(useProduct, ['product', 'pending']),
    ...mapState(useFavorites, {
      favoriteItems: 'products',
    }),
    ...mapState(useProducts, {
      allProducts: 'products',
    }),
    similarProducts() {
      if (!this.product || !this.allProducts || this.allProducts.length === 0) {
        return [];
      }
      return this.allProducts.filter((p) => p.animal === this.product.animal && p.id !== this.product.id).slice(0, 4);
    },
  },
  watch: {
    product() {
      this.updateDisplayProduct();
    },
    favoriteItems() {
      this.updateDisplayProduct();
    },
    'displayProduct.isFavorite'(newValue) {
      this.isFavoriteLocal = newValue;
    },
  },
  methods: {
    ...mapActions(useProduct, ['getData']),
    ...mapActions(useCart, ['addProduct']),
    ...mapActions(useFavorites, ['toggleFavorite']),
    ...mapActions(useProducts, {
      fetchAllProducts: 'getData',
    }),
    updateDisplayProduct() {
      if (!this.product) {
        this.displayProduct = null;
        return;
      }
      const isFavorite = !!this.favoriteItems.find((fav) => fav.id === this.product.id);
      this.displayProduct = {
        ...this.product,
        isFavorite: isFavorite,
      };
      this.isFavoriteLocal = isFavorite;
    },
    handleFavoriteClick() {
      this.isFavoriteLocal = !this.isFavoriteLocal;
      this.toggleFavorite(this.displayProduct);
    },
  },
  created() {
    this.getData(this.$route.params.id);
    this.fetchAllProducts();
  },
};
</script>
