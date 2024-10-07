<template>
  <div v-if="isLoading" class="loading">Загрузка...</div>
  <div v-else class="product-grid">
    <div v-for="product in products" :key="product.id" class="product-card" @click="goToProduct(product.id)">
      <img :src="product.image" alt="product.title" class="product-image">
      <p class="product-title">{{ product.title }}</p>
      <p class="product-price">{{ product.price }} ₸</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { useProducts } from '../composables/useProducts';

const { products, isLoading, loadMoreProducts } = useProducts();
const router = useRouter();

const goToProduct = (productId: string) => {
  router.push(`/product/${productId}`);
};

// Подгрузка при скролле
const onScroll = (e: Event) => {
  const el = e.target as HTMLElement;
  if (el.scrollTop + el.clientHeight >= el.scrollHeight - 10) {
    loadMoreProducts();
  }
};

window.addEventListener('scroll', onScroll);
</script>

<style scoped lang="scss">
.product-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.product-card {
  cursor: pointer;
  text-align: center;
  width: 200px;
}

.product-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
}

.product-title {
  font-size: 1.2rem;
  margin: 10px 0;
}

.product-price {
  color: #666;
}

.loading {
  text-align: center;
  font-size: 1.5rem;
  padding: 20px;
}
</style>
