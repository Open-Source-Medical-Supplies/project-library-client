import { http, HttpResponse } from 'msw';
import {
  CATEGORIES_URL,
  PROJECTS_URL,
  FILTERS_URL,
} from '../constants/url';
import mockCategories from './categories.json';
import mockProjects from './projects.json';
import mockFilters from './filters.json';

export const handlers = [
  http.post(CATEGORIES_URL, () => {
    return HttpResponse.json(mockCategories);
  }),
  http.post(PROJECTS_URL, () => {
    return HttpResponse.json(mockProjects);
  }),
  http.post(FILTERS_URL, () => {
    return HttpResponse.json(mockFilters);
  }),
];