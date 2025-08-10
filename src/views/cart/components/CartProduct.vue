<template>
  <div
    class="flex flex-col gap-4 rounded-lg border bg-white p-4 shadow-sm sm:flex-row sm:items-center">
    <img class="h-32 w-32 shrink-0 rounded-md object-cover" :src="item.image" alt="Картинка" />

    <div class="flex flex-grow flex-col justify-center gap-2">
      <router-link :to="`/product/${item.id}`" class="font-semibold text-slate-900 hover:underline">
        {{ item.title }}
      </router-link>
      <span class="font-bold text-slate-900">{{ (item.price * item.quantity).toFixed(2) }} ₽</span>
    </div>

    <div class="flex items-center justify-between gap-4 sm:justify-end">
      <div class="flex h-10 select-none items-center rounded-lg border">
        <span @click.prevent="removeQty(index)"
              class="cursor-pointer px-3 py-1 text-lg text-slate-500 transition hover:bg-slate-100">-</span>
        <span class="px-4 font-bold">{{ item.quantity }}</span>
        <span @click.prevent="addQty(index)"
              class="cursor-pointer px-3 py-1 text-lg text-slate-500 transition hover:bg-slate-100">+</span>
      </div>

      <button @click.prevent="removeProduct(item)"
              class="text-slate-400 transition hover:text-red-500">
        <vue-feather type="x" class="h-6 w-6" />
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'pinia'
import { useCart } from '@/stores/cartProducts.js'

export default {
  props: {
    item: { type: Object, required: true },
    index: { type: Number, required: true }
  },
  methods: {
    ...mapActions(useCart, ['addQty', 'removeQty', 'removeProduct'])
  }
}
</script>
