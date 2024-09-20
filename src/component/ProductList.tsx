import React, { useState } from 'react';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { fetchProducts, Product } from '../utils/api';
import { Card } from './Card';

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const fetchMoreProducts = async () => {
    const newProducts = await fetchProducts(10, page * 10);
    setProducts(prev => [...prev, ...newProducts]);

    if (newProducts.length === 0) {
      setHasMore(false);
    } else {
      setPage(prevPage => prevPage + 1);
    }
  };

  const { loadMoreRef, isLoading } = useInfiniteScroll({
    fetchMore: fetchMoreProducts,
    hasMore,
    threshold: 300, 
  });

  return (
    <div className="container mx-auto p-4">
      <div className="pt-8 flex gap-4 flex-wrap">
        {products.map(product => (
          <Card key={product.id} alt={product.title} src={product.thumbnail} name={product.title} price={product.price} />
        ))}
      </div>
    
      <div ref={loadMoreRef} className="w-full py-10 text-center">
        {isLoading && <p>Loading...</p>}
        {!hasMore && <p>No more products</p>}
      </div>
    </div>
  );
};

export default ProductList;
