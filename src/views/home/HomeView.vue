<template>
  <div class="flex w-full flex-col gap-8">
    <div class="flex flex-col items-center justify-between gap-4 md:flex-row">
      <h1 class="text-3xl font-bold text-slate-900 md:text-4xl">Каталог</h1>

      <div class="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center">
        <select v-model="selectedAnimal" class="rounded-lg border bg-white p-2 text-slate-700">
          <option value="all">Все животные</option>
          <option v-for="animal in uniqueAnimals.filter((a) => a !== 'all')" :key="animal" :value="animal">
            {{ animal }}
          </option>
        </select>
        <select v-model="selectedType" class="rounded-lg border bg-white p-2 text-slate-700">
          <option value="all">Все типы</option>
          <option v-for="type in uniqueTypes.filter((t) => t !== 'all')" :key="type" :value="type">
            {{ type }}
          </option>
        </select>

        <input
          v-model.lazy="searchQuery"
          class="rounded-lg border bg-white py-2 pr-4 pl-4 text-slate-700 outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Поиск по названию..."
          type="text"
        />
      </div>
    </div>

    <ProgressSpinner v-if="pending && displayProducts.length === 0" />
    <div v-else class="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      <Product v-for="product in displayProducts" :key="product.id" :item="product" />

      <div v-if="!pending && displayProducts.length === 0" class="col-span-full py-16 text-center text-slate-500">
        <h2 class="text-xl font-semibold">Товары не найдены</h2>
        <p class="mt-2">Попробуйте изменить фильтры или поисковый запрос.</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import { useProducts } from '@/stores/products.js';
import { useFavorites } from '@/stores/favoritesProducts.js';
import ProductCard from '@/components/product/ProductCard.vue';
import ProgressSpinner from 'primevue/progressspinner';

export default {
  components: { Product: ProductCard, ProgressSpinner },

  data() {
    return {
      searchQuery: '',
      selectedAnimal: 'all',
      selectedType: 'all',
    };
  },

  computed: {
    ...mapState(useProducts, ['products', 'pending']),
    ...mapState(useFavorites, {
      favoriteItems: 'products',
    }),

    uniqueAnimals() {
      if (!this.products) return [];
      const animals = this.products.map((p) => p.animal);
      return ['all', ...new Set(animals)];
    },

    uniqueTypes() {
      if (!this.products) return [];
      const types = this.products.map((p) => p.type);
      return ['all', ...new Set(types)];
    },

    displayProducts() {
      if (!Array.isArray(this.products)) return [];

      let filtered = this.products;

      if (this.selectedAnimal !== 'all') {
        filtered = filtered.filter((p) => p.animal === this.selectedAnimal);
      }

      if (this.selectedType !== 'all') {
        filtered = filtered.filter((p) => p.type === this.selectedType);
      }

      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        filtered = filtered.filter((p) => p.title.toLowerCase().includes(query));
      }

      return filtered.map((product) => ({
        ...product,
        isFavorite: !!this.favoriteItems.find((fav) => fav.id === product.id),
      }));
    },
  },

  methods: {
    ...mapActions(useProducts, ['getData']),
  },

  mounted() {
    this.getData();
  },
};
</script>
