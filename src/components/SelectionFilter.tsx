// SelectionFilter.tsx
import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { FilterType } from '../types';
import styles from './SelectionFilter.module.css';
import { SelectionFilterProps } from './SelectionFilterUtils';


/* TODOs
- Think about whether having source of state in here would 
although it would make things cleaner
would it make them simpler and easier to maintain
from the perspective of the rest of the project?
o - Make 
*/




const SelectionFilter: React.FC<ExtendedSelectionFilterProps> = ({
  title,
  items,
  selectedItems,//
  isOpen,
  onToggle,
  onChange,
  renderFooter,
}) => {
  return (
    <div className={styles.selectionFilter}>

      <button onClick={onToggle} className={styles.toggleButton}>
        <span className={styles.title}>{title}</span>
        <span>{isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}</span>
      </button>

      {isOpen && (
        <div className={styles.itemsContainer}>

          {items.map((item) => (
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

          {renderFooter && <div className={styles.footerContainer}>{renderFooter()}</div>}
        </div>
      )}
    </div>

  );
};

export default SelectionFilter;
