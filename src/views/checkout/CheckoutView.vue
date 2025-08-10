<template>
  <div class="w-full max-w-2xl">
    <h1 class="mb-6 text-3xl font-bold">Оформление заказа</h1>

    <div v-if="orderPlaced" class="rounded-lg bg-green-100 p-4 text-green-800">
      <h2 class="text-xl font-semibold">Спасибо за ваш заказ!</h2>
      <p>Ваш заказ успешно оформлен. Мы скоро свяжемся с вами.</p>
      <router-link to="/" class="mt-4 inline-block font-bold text-green-900 hover:underline">
        Вернуться на главную
      </router-link>
    </div>

    <VeeForm v-else @submit="placeOrder" :validation-schema="schema" v-slot="{ isSubmitting }">
      <fieldset class="mb-6">
        <legend class="mb-2 text-xl font-semibold">Контактные данные</legend>
        <div class="flex flex-col gap-4">
          <div>
            <label for="firstName" class="block">Имя</label>
            <VeeField name="firstName" id="firstName" type="text" class="w-full rounded border p-2 text-black" />
            <VeeErrorMessage name="firstName" class="text-sm text-red-500" />
          </div>

          <div>
            <label for="lastName" class="block">Фамилия</label>
            <VeeField name="lastName" id="lastName" type="text" class="w-full rounded border p-2 text-black" />
            <VeeErrorMessage name="lastName" class="text-sm text-red-500" />
          </div>

          <div>
            <label for="patronymic" class="block">Отчество (необязательно)</label>
            <VeeField name="patronymic" id="patronymic" type="text" class="w-full rounded border p-2 text-black" />
            <VeeErrorMessage name="patronymic" class="text-sm text-red-500" />
          </div>
          <div>
            <label for="email" class="block">Email</label>
            <VeeField name="email" id="email" type="email" class="w-full rounded border p-2 text-black" />
            <VeeErrorMessage name="email" class="text-sm text-red-500" />
          </div>
        </div>
      </fieldset>

      <fieldset class="mb-6">
        <legend class="mb-2 text-xl font-semibold">Способ доставки</legend>
        <div role="radiogroup" class="flex flex-col gap-2">
          <label class="flex items-center gap-2 rounded border p-3 has-[:checked]:bg-purple-100">
            <VeeField name="deliveryMethod" type="radio" value="pickup" class="h-4 w-4" />
            Самовывоз
          </label>
          <label class="flex items-center gap-2 rounded border p-3 has-[:checked]:bg-purple-100">
            <VeeField name="deliveryMethod" type="radio" value="courier" class="h-4 w-4" />
            Курьер
          </label>
        </div>
        <VeeErrorMessage name="deliveryMethod" class="mt-1 text-sm text-red-500" />
      </fieldset>

      <fieldset class="mb-6">
        <legend class="mb-2 text-xl font-semibold">Комментарий к заказу</legend>
        <VeeField name="comment" as="textarea" rows="4" class="w-full rounded border p-2 text-black" />
      </fieldset>

      <div v-if="submissionError" class="mt-4 rounded-lg bg-red-100 p-3 text-center text-sm text-red-700">
        {{ submissionError }}
      </div>

      <button
        type="submit"
        :disabled="isSubmitting"
        class="w-full cursor-pointer rounded-lg bg-purple-700 py-3 font-semibold text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:bg-gray-400"
      >
        <span v-if="isSubmitting">Оформляем...</span>
        <span v-else>Подтвердить заказ</span>
      </button>
    </VeeForm>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import { Form as VeeForm, Field as VeeField, ErrorMessage as VeeErrorMessage } from 'vee-validate';
import { useCart } from '@/stores/cartProducts.js';
import { createOrder } from '@/api/orders.js';
import * as yup from 'yup';

export default {
  components: {
    VeeForm,
    VeeField,
    VeeErrorMessage,
  },
  data() {
    const schema = yup.object({
      firstName: yup.string().required('Поле обязательно'),
      lastName: yup.string().required('Поле обязательно'),
      email: yup.string().required('Email обязателен').email('Введите корректный email'),
      deliveryMethod: yup.string().required('Выберите способ доставки'),
      comment: yup.string().optional(),
    });

    return {
      schema,
      orderPlaced: false,
      submissionError: null,
    };
  },
  computed: {
    ...mapState(useCart, ['products']),
  },
  methods: {
    ...mapActions(useCart, ['removeProduct']),
    ...mapActions(useCart, ['clearCart']),

    async placeOrder(values) {
      this.submissionError = null;

      const orderPayload = {
        customer: values,
        items: this.products,
        total: this.products.reduce((sum, item) => sum + item.price * item.quantity, 0),
      };
      try {
        await createOrder(orderPayload);
        this.orderPlaced = true;
        this.clearCart();
      } catch (error) {
        console.error('Failed to place order:', error);
        this.submissionError = 'Не удалось оформить заказ. Пожалуйста, попробуйте снова.';
      }
    },
  },
};
</script>
