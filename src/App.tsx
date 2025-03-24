import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import CategoryCard from './components/CategoryCard';
import ProjectCard from './components/ProjectCard';
import { Category, FilterType, Project } from './types';
import { sortItems } from './utilities';
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


  // -- Accessing source of truth -- //

  const { data: categories } = useCategories();


  // -- Needs some stuff from filters -- // 

  const filterProjectsByCategory = (categoryToken: string) => {
    const category = categories?.find((cat) => cat.token === categoryToken);
    if (!category) return;
    setSelectedCategoryFilters([category]);
    setSearchQuery('');
  };


  // --- Filters' State --- //

  // 3/7 Selected Category Filters + co
  const [selectedCategoryFilters, setSelectedCategoryFilters] = useState<Category[]>([]);
  //  Sort selected items to top of the list
  let uniqueCategoryFilters = categories || [];
  uniqueCategoryFilters = uniqueCategoryFilters.sort((a, b) => {
      // Primary sort: first by selectedCategoryFilters
      if (selectedCategoryFilters.includes(a) && !selectedCategoryFilters.includes(b)) {
        return -1;
      }
      if (selectedCategoryFilters.includes(b) && !selectedCategoryFilters.includes(a)) {
        return 1;
      }
      // Secondary sort: if neither is selected, sort alphabetically
      return a.name.localeCompare(b.name);
  });

  const {
    data: filteredCategories = [],
    isLoading: isLoadingCategories,
  } = useFilteredCategories(searchQuery, selectedCategoryFilters);

  const filteredProjects = useFilteredProjects(
    searchQuery,
    selectedCategoryFilters,
  ).data || [];

  const sortedCategories = sortItems(filteredCategories, sortOption);
  let sortedProjects = [] as Project[];
  if (searchQuery !== '' || selectedCategoryFilters.length > 0) {
    sortedProjects = sortItems(filteredProjects, sortOption);
  }

  // 6/7: handleCategoryFilterChange
  // part I/II: Make
  // All this does, is either add an item, or drop an item. 
  const createFilterHandler = <T extends { token: string }>(
    setter: React.Dispatch<React.SetStateAction<T[]>>
  ) => (item: T, checked: boolean) => {
    setter((prev) =>
      checked ? [...prev, item] : prev.filter((i) => i.token !== item.token)
    );
  };
  // II: Use
  const handleCategoryFilterChange = createFilterHandler<Category>(setSelectedCategoryFilters);  

  // -- End Section on Filters' State -- // 

  return (
    <div className={styles.appContainer}>
      
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

      <div className={styles.mainContent}>
        <div className={styles.filterSidebar}>

          {/* This ideally moves to being a map of three types to one filter
              all passed the same data, given its small size (can be api call when larger, np) */}
          <SelectionFilter
            title="Filter By Category"
            items={categories}
            selectedItems={selectedCategoryFilters}
            onChange={handleCategoryFilterChange}
          />

          {/* TODO: Add skill and tool filters */}
          <SelectionFilter
            title="Filter By Category"
            items={categories}
            selectedItems={selectedCategoryFilters}
            onChange={handleCategoryFilterChange}
          />

          <SelectionFilter
            title="Filter By Category"
            items={categories}
            selectedItems={selectedCategoryFilters}
            onChange={handleCategoryFilterChange}
          />

        </div>

        <div className={styles.contentArea}>
          <h2 className={styles.sectionTitle}>All Categories</h2>
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
      </div>
    </div>
  );
};

export default App;
