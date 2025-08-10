import { acceptHMRUpdate, defineStore } from 'pinia';
import { getProduct } from '@/api/products.js';

export const useProduct = defineStore('product', {
  state: () => ({
    pending: true,
    product: null,
  }),
  actions: {
    async getData(id) {
      this.pending = true;
      try {
        const response = await getProduct(id);
        this.product = response.data || response;
      } catch (e) {
        console.error(`Failed to fetch product ${id}:`, e);
        this.product = null;
      } finally {
        this.pending = false;
      }
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useProduct, import.meta.hot));
}
