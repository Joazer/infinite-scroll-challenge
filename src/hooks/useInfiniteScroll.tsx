import { useState, useLayoutEffect, useRef, useCallback } from 'react';

export interface UseInfiniteScrollOptions {
  fetchMore: () => Promise<void>; 
  hasMore: boolean;              
  threshold?: number;           
}

export function useInfiniteScroll({ fetchMore, hasMore, threshold = 100 }: UseInfiniteScrollOptions) {
  const [isLoading, setIsLoading] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null); // 观察的元素

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && hasMore && !isLoading) {
        setIsLoading(true);
        fetchMore().finally(() => setIsLoading(false));
      }
    },
    [fetchMore, hasMore, isLoading]
  );

  useLayoutEffect(() => {
    observer.current?.disconnect(); // 使用可选链简化

    observer.current = new IntersectionObserver(handleObserver, {
      rootMargin: `${threshold}px`,
    });

    const currentLoadMoreRef = loadMoreRef.current;
    if (currentLoadMoreRef) observer.current.observe(currentLoadMoreRef); 

    return () => {
      if (observer.current && currentLoadMoreRef) {
        observer.current.unobserve(currentLoadMoreRef); 
      }
    };
  }, [handleObserver, threshold]);

  return { loadMoreRef, isLoading };
}
