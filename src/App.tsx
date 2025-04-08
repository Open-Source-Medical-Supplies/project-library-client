import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import CategoryCard from './components/CategoryCard';
import ProjectCard from './components/ProjectCard';
import { Category, FilterType, Project, Skill, Tool } from './types';
import { sortItems } from './utilities';

import { useTools, useTools2 } from './hooks/use-tools';
import { useSkills } from './hooks/use-skills';
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


  const { data: categories } = useCategories();
  const [selectedCategoryFilters, setSelectedCategoryFilters] = useState<Category[]>([]);
  const handleCategoryFilterChange = createFilterHandler<Category>(setSelectedCategoryFilters);
/*
  const { data: projects } = useProjects();
  const [selectedProjectsFilters, setSelectedProjectsFilters] = useState<Category[]>([]);
  const handleProjectsFilterChange = createFilterHandler<Category>(setSelectedProjectsFilters);
*/
  const skills = useSkills();
  const [selectedSkillsFilters, setSelectedSkillsFilters] = useState<Skill[]>([]);
  const handleSkillsFilterChange = createFilterHandler<Skill>(setSelectedSkillsFilters);

  const tools = useTools();
  const tools2 = useTools2();
  console.log(tools2)
  const [selectedToolsFilters, setSelectedToolsFilters] = useState<Tool[]>([]);
  const handleToolsFilterChange = createFilterHandler<Category>(setSelectedToolsFilters);


  // -- Needs some stuff from filters -- //

  // TODO: Need one of these for skills, tools.
  // or unify them all in some way. That's better.
  // Done fast first then perfect as time allows. 
  const filterProjectsByCategory = (categoryToken: string) => {
    const category = categories?.find((cat) => cat.token === categoryToken);
    if (!category) return;
    setSelectedCategoryFilters([category]);
    setSearchQuery('');
  };


  // --- Filters' State --- //

  // 3/7 Selected Category Filters + co

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

          {/* This ideally moves to being a map of three types to one filter
              all passed the same data, given its small size (can be api call when larger, np) */}
          <SelectionFilter
            title="Filter By Category"
            items={categories}
            selectedItems={selectedCategoryFilters}
            onChange={handleCategoryFilterChange}
          />

{/*

          <SelectionFilter
            title="Filter By Projects"
            items={projects}
            selectedItems={selectedProjectsFilters}
            onChange={handleProjectsFilterChange}
          />
*/}
          {/* TODO: Add skill and tool filters */}
          {/* The problem is that skills just gets returned as such, no need to unpack; TODO unify data */}
          <SelectionFilter
            title="Filter By Skills"
            items={skills}
            selectedItems={selectedSkillsFilters}
            onChange={handleSkillsFilterChange}
          />


          <SelectionFilter
            title="Filter By Tools"
            items={tools}
            selectedItems={selectedToolsFilters}
            onChange={handleToolsFilterChange}  // works even though category style
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
