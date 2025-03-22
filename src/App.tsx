import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import FilterSection from './components/FilterSection';
import CategoryCard from './components/CategoryCard';
import ProjectCard from './components/ProjectCard';
import { Category, FilterType, Project } from './types';
import { sortItems } from './utilities';
import { useFilteredProjects } from './hooks/use-projects';
import { useCategories, useFilteredCategories } from './hooks/use-categories';
import SelectionFilter from './components/SelectionFilter';
import styles from './App.module.css';

const App = () => {
  const { data: categories } = useCategories();
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

  // --- Filters' State --- //

  // 2/7: visibleCategoryFilters
  // Part I
  const [showAllCategoryFilters, setShowAllCategoryFilters] = useState(false);
  // Part II
  let uniqueCategoryFilters = categories || [];
  // Part III
  const visibleCategoryFilters = showAllCategoryFilters
  ? uniqueCategoryFilters
  : uniqueCategoryFilters.slice(0, 10);

  // 3/7 Selected Category Filters + co
  const [selectedCategoryFilters, setSelectedCategoryFilters] = useState<Category[]>([]);
  //  Sort selected items to top of the list
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
  

  const filterProjectsByCategory = (categoryToken: string) => {
    const category = categories?.find((cat) => cat.token === categoryToken);
    if (!category) return;
    setSelectedCategoryFilters([category]);
    setSearchQuery('');
  };

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

  // 4/7: filterstates.category
  const [filterStates, setFilterStates] = useState({
    category: true,
    skills: true,
    tools: true,
  });

  // 5/7: toggleFilter
  const toggleFilter = (key: keyof typeof filterStates) => {
    setFilterStates((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // 6/7: handleCategoryFilterChange
  // part I/II
  const createFilterHandler = <T extends { token: string }>(
    setter: React.Dispatch<React.SetStateAction<T[]>>
  ) => (item: T, checked: boolean) => {
    setter((prev) =>
      checked ? [...prev, item] : prev.filter((i) => i.token !== item.token)
    );
  };
  // part II//II
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
          {/* <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className={styles.sortSelect}
          >
            <option value="Most Recent">Most Recent</option>
            <option value="Oldest">Oldest</option>
            <option value="A-Z">A-Z</option>
            <option value="Z-A">Z-A</option>
          </select> */}
          {/* <button className={styles.searchButton}>
            Search
          </button> */}
        </div>
      </div>
      <div className={styles.mainContent}>
        <div className={styles.filterSidebar}>
          <FilterSection
            title="Filter By Category"
            items={visibleCategoryFilters}
            selectedItems={selectedCategoryFilters}
            isOpen={filterStates.category}
            onToggle={() => toggleFilter('category')}
            onChange={handleCategoryFilterChange as (item: FilterType, checked: boolean) => void}
            renderFooter={() =>
              uniqueCategoryFilters.length > 10 && (
                <button
                  className={styles.footerButton}
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowAllCategoryFilters((prev) => !prev);
                  }}
                >
                  {showAllCategoryFilters ? 'Show Less' : 'View All'}
                </button>
              )
            }
          />
          {/* TODO: Add skill and tool filters */}
          <SelectionFilter
            title="Filter By Category"
            items={visibleCategoryFilters}
            selectedItems={selectedCategoryFilters}
            isOpen={filterStates.category}
            onToggle={() => toggleFilter('category')}
            onChange={handleCategoryFilterChange as (item: FilterType, checked: boolean) => void}
            renderFooter={() =>
              uniqueCategoryFilters.length > 10 && (
                <button
                  className={styles.footerButton}
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowAllCategoryFilters((prev) => !prev);
                  }}
                >
                  {showAllCategoryFilters ? 'Show Less' : 'View All'}
                </button>
              )
            }
          />
          <SelectionFilter
            title="Filter By Category"
            items={visibleCategoryFilters}
            selectedItems={selectedCategoryFilters}
            isOpen={filterStates.category}
            onToggle={() => toggleFilter('category')}
            onChange={handleCategoryFilterChange as (item: FilterType, checked: boolean) => void}
            renderFooter={() =>
              uniqueCategoryFilters.length > 10 && (
                <button
                  className={styles.footerButton}
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowAllCategoryFilters((prev) => !prev);
                  }}
                >
                  {showAllCategoryFilters ? 'Show Less' : 'View All'}
                </button>
              )
            }
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
