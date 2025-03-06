// FilterSection.tsx
import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { FilterSectionProps, FilterType } from '../types';
import styles from './FilterSection.module.css';

interface ExtendedFilterSectionProps extends FilterSectionProps {
  renderFooter?: () => React.ReactNode;
}

const FilterSection: React.FC<ExtendedFilterSectionProps> = ({
  title,
  items,
  selectedItems,
  isOpen,
  onToggle,
  onChange,
  renderFooter,
}) => {
  return (
    <div className={styles.filterSection}>
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

export default FilterSection;
