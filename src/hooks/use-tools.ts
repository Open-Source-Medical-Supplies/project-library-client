import { Tool } from '../types';
import toolsData from '../../data/tools.json';

export function useTools(): Tool[] {
  return toolsData;
};

import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { TOOLS_URL } from '../constants/url';
import { HEADERS, parseResponse } from './core';

export function useTools2(): UseQueryResult<Tool[]> {
  const query = useQuery({
    queryKey: ['tools'],
    queryFn: () => fetch(TOOLS_URL, {
      method: 'POST',
      mode: 'cors',
      headers: HEADERS,
      body: JSON.stringify({}),
    }).then(parseResponse),
  });

  //console.log(query)

  return {
    ...query,
    data: query?.data || [],
  }
};

