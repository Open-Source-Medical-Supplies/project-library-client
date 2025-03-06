import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { HEADERS, parseResponse } from './core';
import { Category, Project } from '../types';
import { PROJECTS_URL } from '../constants/url';

export function useProjects(): UseQueryResult<Project[]> {
  const query = useQuery({
    queryKey: ['projects'],
    queryFn: () => fetch(PROJECTS_URL, {
      method: 'POST',
      mode: 'cors',
      headers: HEADERS,
      body: JSON.stringify({}),
    }).then(parseResponse),
  });

  return {
    ...query,
    data: query.data || [],
  }
};

export function useFilteredProjects(
  searchQuery: string,
  selectedCategoryFilters?: Category[],
): UseQueryResult<Project[]> {
  const query = useQuery({
    queryKey: [
      'filteredProjects',
      searchQuery,
      selectedCategoryFilters,
    ],
    queryFn: () => fetch(PROJECTS_URL, {
      method: 'POST',
      mode: 'cors',
      headers: HEADERS,
      body: JSON.stringify({
        search: searchQuery,
        categoryTokens: selectedCategoryFilters
          ?.map((category) => category.token).join(','),
      }),
    }).then(parseResponse),
  });

  return {
    ...query,
    data: query?.data || [],
  }
}