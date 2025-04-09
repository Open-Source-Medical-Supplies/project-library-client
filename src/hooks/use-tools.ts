import { Tool } from '../types';
import { TOOLS_URL } from '../constants/url';
import { HEADERS, parseResponse } from './core';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

export function useTools(): UseQueryResult<Tool[]> {
  const query = useQuery({
    queryKey: ['tools'],
    queryFn: () => fetch(TOOLS_URL, {
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

