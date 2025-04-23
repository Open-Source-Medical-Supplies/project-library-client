import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import CategoryCard from './components/CategoryCard';
import ProjectCard from './components/ProjectCard';
import { Category, Project, Filter } from './types';
import { sortItems } from './utilities';

import { useFilters } from './hooks/use-filters'
import { useFilteredProjects } from './hooks/use-projects';
import { useCategories, useFilteredCategories } from './hooks/use-categories';
import SelectionFilter from './components/SelectionFilter';
import styles from './App.module.css';

const App = () => {
  const [localSearch, setLocalSearch] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption] = useState('Most Recent');

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchQuery(localSearch);
    }, 300);
    return () => {
      clearTimeout(handler);
    };
  }, [localSearch]);

  const createFilterHandler = <T extends { token: string }>(
    setter: React.Dispatch<React.SetStateAction<T[]>>
  ) => (item: T, checked: boolean) => {
    setter((prev) =>
      checked ? [...prev, item] : prev.filter((i) => i.token !== item.token)
    );
  };

  /* This Stays. Categories are special. */
  const { data: categories } = useCategories();
  const [selectedCategoryFilters, setSelectedCategoryFilters] = useState<Category[]>([]);
  const handleCategoryFilterChange = createFilterHandler<Category>(setSelectedCategoryFilters);


  const { data: filters } = useFilters();
  const [selectedFilters, setSelectedFilters] = useState<Filter[]>([]);
  const handleFilterChange = createFilterHandler<Filter>(setSelectedFilters);


  const groupedFilters = filters.reduce((acc, item) => {
    if (!acc[item.type]) {
      acc[item.type] = [];
    }
    acc[item.type].push(item);
    return acc;
  }, {});


  const {
    data: filteredCategories = [],
    isLoading: isLoadingCategories,
  } = useFilteredCategories(searchQuery, selectedCategoryFilters);


  const filteredProjects = useFilteredProjects(
    searchQuery,
    selectedCategoryFilters,
    selectedFilters
  ).data || [];

  const sortedCategories = sortItems(filteredCategories, sortOption);
  let sortedProjects = [] as Project[];
  if (searchQuery !== '' ||
    selectedCategoryFilters.length > 0 ||
    selectedFilters.length > 0) {
    sortedProjects = sortItems(filteredProjects, sortOption);
  }

  // Used in category card rendering only, to snap filterint to exactly one.
  const filterProjectsByCategory = (categoryToken: string) => {
    const category = categories?.find((cat) => cat.token === categoryToken);
    if (!category) return;
    setSelectedCategoryFilters([category]);
    setSearchQuery('');
  };

  return (
    <div className={styles.appContainer}>

      {/* Search Box */}
      <div className={styles.searchSection}>
        <div className={styles.searchBar}>
          <div className={styles.inputWrapper}>

            <input
              type="text"
              placeholder="What are you looking for?"
              className={styles.searchInput}
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
            />

            <button className={styles.searchIcon}>
              <Search size={20} />
            </button>

          </div>
        </div>
      </div>


      {/* Everything Else: Sidebar and Main Region */}
      <div className={styles.mainContent}>

        {/* Sidebar Region */}
        <div className={styles.filterSidebar}>

          {/* This Stays. Categories are special. */}
          <SelectionFilter
            title="Filter By Category"
            items={categories}
            selectedItems={selectedCategoryFilters}
            onChange={handleCategoryFilterChange}
          />

          {/* All Other Filter Panels */
            Object.entries(groupedFilters).map(([key, items]) => (
              <SelectionFilter
                title={`Filter by ${key.charAt(0) + key.slice(1).toLowerCase()}`}
                items={items}
                selectedItems={selectedFilters}
                onChange={handleFilterChange}  
              />
            ))
          }

        </div>
        {/* End of Sidebar */}


        {/* Non-Sidebar Main Region contains Categories and Projects*/}
        <div className={styles.contentArea}>

          <h2 className={styles.sectionTitle}>All Categories</h2>

          {/* Categories Region */}
          <div className={styles.categoriesSection}>
            {isLoadingCategories ? (
              <div>Loading...</div>
            ) : sortedCategories.length > 0 ? (
              <div className={styles.categoryGrid}>
                {sortedCategories.map((category) => (
                  <CategoryCard
                    key={category.token}
                    {...category}
                    filterProjectsByCategory={filterProjectsByCategory}
                  />
                ))}
              </div>
            ) : (
              <p className={styles.noResultsText}>No categories found.</p>
            )}
          </div>


          {/* Projects Region */}
          {sortedProjects.length > 0 && (
            <div className={styles.projectsSection}>
              <h2 className={styles.sectionTitle}>Projects</h2>
              <div className={styles.projectsGrid}>
                {sortedProjects.map((project) => (
                  <ProjectCard key={project.slug} {...project} />
                ))}
              </div>
            </div>
          )}

        </div>
        {/* End of Main Region */}

      </div>
    </div>
  );
};

export default App;
