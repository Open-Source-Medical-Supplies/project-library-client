import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { CategoryData } from '../types';
import { CATEGORIES_URL } from '../constants/url';
import { HEADERS, parseResponse } from './core';

export function useCategories(): UseQueryResult<CategoryData[]> {
  const query = useQuery({
    queryKey: ['categories'],
    queryFn: () => fetch(CATEGORIES_URL, {
      method: 'POST',
      mode: 'cors',
      headers: HEADERS,
      body: JSON.stringify({}),
    }).then(parseResponse),
  });

  return {
    ...query,
    data: query?.data || [],
  }
};

export function useFilteredCategories(
  searchQuery: string,
  selectedCategoryFilters: CategoryData[],
) : UseQueryResult<CategoryData[]> {
  const query = useQuery({
    queryKey: [
      'filteredCategories',
      searchQuery,
      selectedCategoryFilters,
    ],
    queryFn: () => fetch(CATEGORIES_URL, {
      method: 'POST',
      mode: 'cors',
      headers: HEADERS,
      body: JSON.stringify({
        search: searchQuery,
        categoryTokens: selectedCategoryFilters
          .map((category) => category.token).join(','),
      }),
    }).then(parseResponse),
  });

  return {
    ...query,
    data: query?.data || [],
  }
}
