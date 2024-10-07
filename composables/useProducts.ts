import { ref, onMounted } from 'vue';
import { useFetch } from '#app';

export const useProducts = () => {
  const products = ref([]);
  const isLoading = ref(false);
  const page = ref(1);
  const limit = ref(12); // Количество товаров на странице
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
      console.error('Ошибка при загрузке товаров:', error.value);
    } else {
      products.value = data.value;
      totalProducts.value = data.value.length;
    }
    isLoading.value = false;
  };

  const loadMoreProducts = async () => {
    page.value++;
    await fetchProducts();
  };

  onMounted(() => {
    fetchProducts();
  });

  return { products, isLoading, fetchProducts, loadMoreProducts, filters, page, totalProducts };
};
