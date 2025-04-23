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

    console.log('vvv')
    console.log(URL)
    console.log(query)
    console.log(query?.data)
    console.log('^^^')

      

  return {
    ...query,
    data: query?.data || [],
  }
};

