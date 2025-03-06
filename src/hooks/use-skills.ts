import { Skill } from '../types';
import skillsData from '../../data/skills.json';

export function useSkills(): Skill[] {
  return skillsData;
};