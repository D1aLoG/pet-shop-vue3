import { acceptHMRUpdate, defineStore } from 'pinia';
import { getProducts } from '@/api/products.js';

export const useProducts = defineStore('products', {
  state: () => ({
    pending: true,
    products: []
  }),
  actions: {
    async getData() {
      this.pending = true;
      try {
        const response = await getProducts();
        this.products = response || [];
      } catch (e) {
        console.error('Failed to fetch products:', e);
        this.products = [];
      } finally {
        this.pending = false;
      }
    }
  }
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useProducts, import.meta.hot));
}
