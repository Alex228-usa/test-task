import { ref } from 'vue';
import { useFetch } from 'nuxt/app';

interface Product {
  id: string;   
  image: string;
  title: string;
  price: number;
}

export const useProducts = () => {
  const products = ref<Product[]>([]);  // Используем Product[]
  const isLoading = ref(false);
  const page = ref(1);
  const limit = ref(10);
  const totalProducts = ref(0);
  const filters = ref({
    title: '',
    order: 'asc',
    orderBy: 'id',
  });

  const fetchProducts = async () => {
    isLoading.value = true;
    const { data, error } = await useFetch(`https://665801795c36170526468b7c.mockapi.io/api/v1/products`, {
      params: {
        page: page.value,
        limit: limit.value,
        order: filters.value.order,
        orderBy: filters.value.orderBy,
        title: filters.value.title,
      },
    });

    if (error.value) {
      console.error('Error fetching products', error.value);
    } else {
      products.value = data.value as Product[]; // Приведение к типу Product[]
      totalProducts.value = data.value.length;
    }
    isLoading.value = false;
  };

  return { products, isLoading, fetchProducts, filters, page, totalProducts };
};
