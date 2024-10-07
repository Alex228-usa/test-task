<template>
    <div class="filter-bar">
      <input v-model="filters.title" placeholder="Поиск по имени" class="filter-input"/>
      <select v-model="filters.order" class="filter-select">
        <option value="asc">По возрастанию</option>
        <option value="desc">По убыванию</option>
      </select>
      <button @click="applyFilters" class="filter-button">Применить</button>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { useProducts } from '@/composables/useProducts';
  const { filters, fetchProducts } = useProducts();
  
  const applyFilters = () => {
    fetchProducts();
  };
  </script>
  
  <style scoped lang="scss">
  .filter-bar {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
  }
  
  .filter-input,
  .filter-select {
    padding: 8px;
    font-size: 1rem;
  }
  
  .filter-button {
    padding: 8px 12px;
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
  }
  
  .filter-button:hover {
    background-color: #0056b3;
  }
  </style>
  