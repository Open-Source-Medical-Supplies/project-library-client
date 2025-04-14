import { Skill } from '../types';
import { SKILLS_URL } from '../constants/url';
import { HEADERS, parseResponse } from './core';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

export function useSkills(): UseQueryResult<Skill[]> {
  const query = useQuery({
    queryKey: ['skills'],
    queryFn: () => fetch(SKILLS_URL, {
      method: 'POST',
      mode: 'cors',
      headers: HEADERS,
      body: JSON.stringify({}),
    }).then(parseResponse),
  });

    console.log('vvv')
    console.log(SKILLS_URL)
    console.log(query)
    console.log(query?.data)
    console.log('^^^')

  return {
    ...query,
    data: query?.data || [],
  }
};

