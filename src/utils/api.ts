
export interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
}

const API_URL = '//dummyjson.com/products';

/**
 * Fetch products from DummyJSON API with pagination.
 * @param limit - The number of products to fetch per request.
 * @param skip - The number of products to skip for pagination.
 * @returns A promise that resolves to a list of products.
 */
export const fetchProducts = async (limit: number, skip: number): Promise<Product[]> => {
  try {
    const response = await fetch(`${API_URL}?limit=${limit}&skip=${skip}`);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    const data = await response.json();
    return data.products; // 返回 products 数组
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};