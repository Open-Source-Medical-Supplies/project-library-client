import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import CategoryCard from './components/CategoryCard';
import ProjectCard from './components/ProjectCard';
import { Category, FilterType, Project, Skill, Tool, Filter } from './types';
import { sortItems } from './utilities';

import { useTools } from './hooks/use-tools';
import { useSkills } from './hooks/use-skills';
import { useFilters } from './hooks/use-filters'
import { useProjects, useFilteredProjects } from './hooks/use-projects';
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
  //const handleCategoryFilterChange = createFilterHandler<Category>(setSelectedCategoryFilters);  

  /* This Stays. Categories are special. */
  const { data: categories } = useCategories();
  const [selectedCategoryFilters, setSelectedCategoryFilters] = useState<Category[]>([]);
  const handleCategoryFilterChange = createFilterHandler<Category>(setSelectedCategoryFilters);

  /*
   * These are going to collapse into one.
     And it should ideally be a list of name-[items] pairs.
     That'll need to come from a hook.
   */
  const { data: skills } = useSkills();
  const [selectedSkillFilters, setselectedSkillFilters] = useState<Skill[]>([]);
  const handleSkillsFilterChange = createFilterHandler<Skill>(setselectedSkillFilters);

  const { data: tools } = useTools();
  const [selectedToolFilters, setSelectedToolFilters] = useState<Tool[]>([]);
  const handleToolFilterChange = createFilterHandler<Category>(setSelectedToolFilters);


  const { data: filters } = useFilters();
  const [selectedFilters, setSelectedFilters] = useState<Filter[]>([]);
  const handleFilterChange = createFilterHandler<Filter>(setSelectedFilters);


  // -- Needs some stuff from filters -- //



  // --- Filters' State --- //

  // 3/7 Selected Category Filters + co

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
    selectedSkillFilters.length > 0 ||
    selectedToolFilters.length > 0) {
    sortedProjects = sortItems(filteredProjects, sortOption);
  }


  // Used in category card rendering only, to snap filterint to exactly one.
  const filterProjectsByCategory = (categoryToken: string) => {
    const category = categories?.find((cat) => cat.token === categoryToken);
    if (!category) return;
    setSelectedCategoryFilters([category]);
    setSearchQuery('');
  };


  // -- End Section on Filters' State -- //

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

          {/* These collapse into one FilterPane
              It'll take:
                * filters, selectedFilters, handleFilterSelectionChange
          */}
          <SelectionFilter
            title="Filter By Skills"
            items={skills}
            selectedItems={selectedSkillFilters}
            onChange={handleSkillsFilterChange}
          />

          <SelectionFilter
            title="Filter By Tools"
            items={tools}
            selectedItems={selectedToolFilters}
            onChange={handleToolFilterChange}  // works even though category style
          />

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
