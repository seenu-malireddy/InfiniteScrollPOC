/**
 * @author Sreenivasulu Malireddy 
 * Component to show list of products
 */

import { useEffect, useState, useCallback } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import { FixedSizeList as List } from 'react-window';
import AutoSizer from "react-virtualized-auto-sizer";
import "../App.css";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface Product {
  id: number;
  title: string;
  description: string;
  price: string;
  thumbnail: string;
}

interface ProductResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

// Function to fetch paginated data from API
const fetchItems = async ({ pageParam = 0 }): Promise<ProductResponse> => {
  const response = await axios.get<ProductResponse>('https://dummyjson.com/products', {
    params: { limit: 10, skip: pageParam },
  });
  return response.data;
};

const InfiniteScrollListView = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["items"],
    queryFn: fetchItems,
    getNextPageParam: (lastPage) => {
      return lastPage.products.length === lastPage.limit ? lastPage.skip + lastPage.limit : undefined;
    },
    initialPageParam: 0, 
  });

  const navigate = useNavigate();
  const { i18n } = useTranslation();


  const [itemCount, setItemCount] = useState(0);

  // Calculate total number of items when data updates
  useEffect(() => {
    setItemCount(data?.pages.reduce((total, page) => total + page.products.length, 0) || 0);
  }, [data]);

  // Callback function to fetch more items when scrolling
  const loadMoreItems = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Get row data 
  const getRowData = useCallback((index: number) => {
    const pageIndex = Math.floor(index / 10);
    const itemIndex = index % 10;
    return data?.pages[pageIndex]?.products?.[itemIndex] ?? null;
  }, [data]);

  return (
    <div className="list-container">
    
      <AutoSizer>
        {({ height, width }) => (
          <List
            height={height} 
            itemCount={itemCount}
            itemSize={150} 
            width={width}
            onItemsRendered={({ overscanStopIndex }) => {
              if (hasNextPage && !isFetchingNextPage && overscanStopIndex >= itemCount - 1) {
                loadMoreItems();
              }
            }}
          >
            {({ index, style }) => {
              const item = getRowData(index);

              return (
                <div className={`list-item ${i18n.language === "ar" ? "rtl" : "ltr"}`} key={item?.id} style={style}
                onClick={() => item && navigate('/product/'+item.id)} >
                  <div className="w-1/5">
                    <img
                      src={item?.thumbnail} 
                      alt={item?.title}
                    />
                  </div>
                  <div className="flex flex-col w-4/5 p-2">
                    <p className="text-heading">{item?.title}</p>
                    <p >{item?.description}</p>
                    <p className="text-heading">${item?.price}</p>
                  </div>
                </div>
              );
            }}
          </List>
        )}
      </AutoSizer>
      {isFetchingNextPage && <p className="loading-text text-center">Loading more products...</p>}
    </div>
  );
};

export default InfiniteScrollListView;
