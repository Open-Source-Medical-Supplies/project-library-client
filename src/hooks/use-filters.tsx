import { Filter } from '../types';
import { FILTERS_URL } from '../constants/url';
import { HEADERS, parseResponse } from './core';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

const URL = FILTERS_URL;

export function useFilters(): UseQueryResult<Filter[]> {
  const query = useQuery({
    queryKey: ['filters'],
    queryFn: () => fetch(URL, {
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

