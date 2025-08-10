import { acceptHMRUpdate, defineStore } from 'pinia'

export const useCart = defineStore('cart', {
  state: () => ({
    pending: true,
    products: []
  }),
  getters: {
    counter: (state) => {
      return state.products.reduce((total, item) => total + item.quantity, 0)
    }
  },
  actions: {
    getDataCart() {
      this.pending = true
      setTimeout(() => {
        this.products = JSON.parse(localStorage.getItem('cart') || '[]')
        this.pending = false
      }, 1000)
    },
    clearCart() {
      this.products = []
      localStorage.removeItem('cart')
    },
    addProduct(item) {
      const productInCart = this.products.find((p) => p.id === item.id)
      if (productInCart) {
        productInCart.quantity++
      } else {
        this.products.push({ ...item, quantity: 1 })
      }
      localStorage.setItem('cart', JSON.stringify(this.products))
    },
    addQty(index) {
      if (this.products[index].quantity < 100) {
        this.products[index].quantity++
        localStorage.setItem('cart', JSON.stringify(this.products))
      }
    },
    removeQty(index) {
      if (this.products[index].quantity > 1) {
        this.products[index].quantity--
        localStorage.setItem('cart', JSON.stringify(this.products))
      }
    },
    removeProduct(item) {
      this.products = this.products.filter((p) => p.id !== item.id)
      localStorage.setItem('cart', JSON.stringify(this.products))
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCart, import.meta.hot))
}
