import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { HEADERS, parseResponse } from './core';
import { Category, Project, Tool } from '../types';
import { PROJECTS_URL } from '../constants/url';


export function useProjects(): UseQueryResult<Project[]> {
  console.log('useProjects')
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
  selectedToolFilters?: Tool[]
): UseQueryResult<Project[]> {
  console.log('useProjects. ', selectedToolFilters)
  const query = useQuery({
    queryKey: [
      'filteredProjects',
      searchQuery,
      selectedCategoryFilters,
      selectedToolFilters
    ],
    queryFn: () => fetch(PROJECTS_URL, {
      method: 'POST',
      mode: 'cors',
      headers: HEADERS,
      body: JSON.stringify({
        search: searchQuery,

        // This is where the items are rendered into a string of comma separated values
        categoryTokens: selectedCategoryFilters
          ?.map((category) => category.token).join(','),

        // This must match the edge function "Projects"
        toolTokens: selectedToolFilters?.map((u) => u.token).join(',')
      }),
    }).then(parseResponse),
  });

  return {
    ...query,
    data: query?.data || [],
  }
}