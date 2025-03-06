import { Tool } from '../types';
import toolsData from '../../data/tools.json';

export function useTools(): Tool[] {
  return toolsData;
};