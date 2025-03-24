// SelectionFilter.tsx
import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { FilterType } from '../types';
import styles from './SelectionFilter.module.css';
import { useState,} from 'react';

interface SelectionFilterProps {
    title: string;
    items: FilterType[];
    selectedItems: FilterType[];
    onChange: (item: FilterType, checked: boolean) => void;
}

const SelectionFilter: React.FC<SelectionFilterProps> = ({
  title, 
  items,  // TODO actually just a note: items to come in a table: filter, type (eg skills), checked, 
  selectedItems,
  onChange,
}) => {
    
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [showAll, setShowAll] = useState<boolean>(false);

  return (
    <div className={styles.selectionFilter}>

      {/* Open+Close Filter Switchboard */}
      <button onClick={() => setIsOpen(!isOpen)} className={styles.toggleButton}>
        <span className={styles.title}>{title}</span>
        <span>{isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}</span>
      </button>

      {isOpen && (
        <div className={styles.itemsContainer}>

          {/* Render Filter Checkable Items */}
          {items.slice(0, showAll ? items.length : 10).map((item) => (
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
          {isOpen && <div className={styles.footerContainer}>
            {
              <button
                className={styles.footerButton}
                onClick={(e) => {
                  e.stopPropagation();
                  setShowAll(!showAll);
                }}
              >
                {showAll ? 'View Fewer' : 'View More'}
              </button>
            }
            </div>
          }
        </div>
      )}
    </div>

  );
};

export default SelectionFilter;
