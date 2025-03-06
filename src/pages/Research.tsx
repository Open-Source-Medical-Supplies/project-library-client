import React from 'react';
import { useParams } from 'react-router';

import CategoryResearch from '../components/ResearchContent';
import { useCategories } from '../hooks/use-categories';
import { CategoryData } from '../types';

const ResearchPage: React.FC = () => {
  const { researchId } = useParams();
  const categories = useCategories();
  const category = categories?.data?.find((category: CategoryData) => category.slug === researchId);
  return (
    <div>
      {category ? <CategoryResearch data={category} /> : <div>Category not found</div>}
    </div>
  );
};

export default ResearchPage;
