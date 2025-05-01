import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import CategoryCard from './components/CategoryCard';
import ProjectCard from './components/ProjectCard';
import { Category, Project, Filter, FilterType, GroupedFilters } from './types';
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
  const { data: categories = [] } = useCategories();
  const [selectedCategoryFilters, setSelectedCategoryFilters] = useState<Category[]>([]);
  const handleCategoryFilterChange = createFilterHandler<Category>(setSelectedCategoryFilters);

  const { data: filters = [] } = useFilters();
  const [selectedFilters, setSelectedFilters] = useState<Filter[]>([]);
  const handleFilterChange = createFilterHandler<Filter>(setSelectedFilters);
  const [showCategories, setShowCategories] = useState(true);
  const groupedFilters = filters.reduce<GroupedFilters>((acc, item) => {
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

  const {
    data: filteredProjects = [],
    isLoading: isLoadingProjects,
  } = useFilteredProjects(
    searchQuery,
    selectedCategoryFilters,
    selectedFilters
  );

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

  useEffect(() => {
    if (selectedCategoryFilters.length > 0 || selectedFilters.length == 0) {
      setShowCategories(true);
    } else {
      setShowCategories(false);
    }
  }, [selectedCategoryFilters, selectedFilters]);

  const isLoading = isLoadingProjects || isLoadingCategories;

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

      {/* Sidebar and Main Region */}
      <div className={styles.mainContent}>
        {/* Sidebar Region */}
        <div className={styles.filterSidebar}>
          <SelectionFilter
            title="Filter By Category"
            items={categories as unknown as FilterType[]}
            selectedItems={selectedCategoryFilters as unknown as FilterType[]}
            onChange={(item, checked) => handleCategoryFilterChange(item as Category, checked)}
          />

          {/* All Other Filter Panels */
            Object.entries(groupedFilters).map(([key, items]) => (
              <SelectionFilter
                key={key}
                title={`Filter by ${key.charAt(0) + key.slice(1).toLowerCase()}`}
                items={items as FilterType[]}
                selectedItems={selectedFilters as FilterType[]}
                onChange={(item, checked) => {
                  handleFilterChange(item as Filter, checked)
                }}
              />
            ))
          }
        </div>
        {/* End of Sidebar */}

        {/* Main Region contains Categories and Projects*/}
        <div className={styles.contentArea}>
          {isLoading ? <div>Loading...</div> : null }

          {/* Categories Region */}
          <div className={styles.categoriesSection}>
            {(!isLoading && showCategories && sortedCategories.length > 0) ? (
              <>
                {/* <h2 className={styles.sectionTitle}>Categories</h2> */}
                <div className={styles.categoryGrid}>
                  {sortedCategories.map((category) => (
                    <CategoryCard
                      key={category.token}
                      {...category}
                      filterProjectsByCategory={filterProjectsByCategory}
                    />
                  ))}
                </div>
              </>
            ) : (
              // <p className={styles.noResultsText}>No categories selected.</p>
              null
            )}
          </div>

          {/* Projects Region */}
          {!isLoading ? (
            <div>
              {(sortedProjects.length > 0 ? (
                <div className={styles.projectsSection}>
                  <h2 className={styles.sectionTitle}>Projects</h2>
                  <div className={styles.projectsGrid}>
                    {sortedProjects.map((project) => (
                      <ProjectCard key={project.slug} {...project} />
                    ))}
                  </div>
                </div>
              ) : (
                <p className={styles.noResultsText}>No projects found.</p>
              ))}
            </div>
          ) : null }
        </div>
        {/* End of Main Region */}
      </div>
    </div>
  );
};

export default App;