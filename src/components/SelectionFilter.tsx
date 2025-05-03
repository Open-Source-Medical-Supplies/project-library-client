// SelectionFilter.tsx
import React from 'react';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';
import { FilterType } from '../types';
import styles from './SelectionFilter.module.css';
import { useState, useMemo } from 'react';

interface SelectionFilterProps {
    title: string;
    items: FilterType[];
    selectedItems: FilterType[];
    onChange: (item: FilterType, checked: boolean) => void;
    searchable?: boolean;
}

const SelectionFilter: React.FC<SelectionFilterProps> = ({
  title,
  items,
  searchable = false,
  selectedItems,
  onChange,
}) => {
    
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [showAll, setShowAll] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Sort and filter items based on search term
  const filteredItems = useMemo(() => {
    const sorted = [...items].sort((a, b) => {
      // Primary sort: first by selectedItems
      if (selectedItems.includes(a) && !selectedItems.includes(b)) {
        return -1;
      }
      if (selectedItems.includes(b) && !selectedItems.includes(a)) {
        return 1;
      }
      // Secondary sort: if neither is selected, sort alphabetically
      return a.name.localeCompare(b.name);
    });

    if (searchTerm.trim()) {
      return sorted.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return sorted;
  }, [items, selectedItems, searchTerm]);

  const containerClass = isOpen ?
    styles.selectionFilter :
    styles.selectionFilterClosed;

  return (
    <div className={containerClass}>
      {/* Open+Close Filter Switchboard */}
      <button onClick={() => setIsOpen(!isOpen)} className={styles.toggleButton}>
        <span className={styles.title}>{title}</span>
        <span>{isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}</span>
      </button>

      {isOpen && (
        <div className={styles.itemsContainer}>
          {/* Search Input */}
          {(searchable || items.length > 10) && (
            <div className={styles.searchContainer}>
              <Search size={16} className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
              />
            </div>
          )}

          {/* Render Filter Checkable Items */}
          {filteredItems.slice(0, showAll ? filteredItems.length : 5).map((item) => (
            <label key={item.token} className={styles.itemLabel}>
              <input
                type="checkbox"
                className={styles.checkbox}
                checked={selectedItems.includes(item as FilterType)}
                onChange={(e) => onChange(item, e.target.checked)}
              />
              <span className={styles.itemName}>{item.name}</span>
            </label>
          ))} 

          {/* Show All? Yes or no. */}
          {filteredItems.length > 5 && !searchTerm && (
            <div className={styles.footerContainer}>
              <button
                className={styles.footerButton}
                onClick={(e) => {
                  e.stopPropagation();
                  setShowAll(!showAll);
                }}
              >
                {showAll ? 'View Less' : 'View More'}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SelectionFilter;