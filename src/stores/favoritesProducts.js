import { acceptHMRUpdate, defineStore } from 'pinia';

export const useFavorites = defineStore('favorites', {
  state: () => ({
    pending: true,
    products: []
  }),
  getters: {
    counter: (state) => state.products.length
  },
  actions: {
    getData() {
      this.pending = true;
      setTimeout(() => {
        this.products = JSON.parse(localStorage.getItem('favorites') || '[]');
        this.pending = false;
      }, 1000);
    },
    toggleFavorite(item) {
      const index = this.products.findIndex((p) => p.id === item.id);

      if (index === -1) {
        this.products.push({ ...item, isFavorite: true });
      } else {
        this.products.splice(index, 1);
      }
      localStorage.setItem('favorites', JSON.stringify(this.products));
    }
  }
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useFavorites, import.meta.hot));
}
