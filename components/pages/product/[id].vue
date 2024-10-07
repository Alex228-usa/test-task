<template>
    <div v-if="isLoading" class="loading">Загрузка товара...</div>
    <div v-else class="product-detail">
      <img :src="product.image" alt="product.title" class="product-detail-image">
      <h1 class="product-detail-title">{{ product.title }}</h1>
      <p class="product-detail-price">{{ product.price }} ₸</p>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { useFetch } from '#app';
  import { useRoute } from 'vue-router';
  
  const route = useRoute();
  const productId = route.params.id;
  const { data: product, pending: isLoading } = useFetch(`https://665801795c36170526468b7c.mockapi.io/api/v1/products/${productId}`);
  </script>
  
  <style scoped lang="scss">
  .product-detail {
    text-align: center;
  }
  
  .product-detail-image {
    width: 100%;
    max-width: 400px;
    margin-bottom: 20px;
  }
  
  .product-detail-title {
    font-size: 2rem;
    margin-bottom: 10px;
  }
  
  .product-detail-price {
    color: #666;
    font-size: 1.5rem;
  }
  </style>
  