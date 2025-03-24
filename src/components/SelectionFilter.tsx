// SelectionFilter.tsx
import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { FilterType } from '../types';
import styles from './SelectionFilter.module.css';
import { SelectionFilterProps } from './SelectionFilterUtils';
import { useState, useEffect } from 'react';


/* TODOs
- Think about whether having source of state in here would 
although it would make things cleaner
would it make them simpler and easier to maintain
from the perspective of the rest of the project?
o - What I'm doing: put all the spec in a utils file, make this thing handle its
    own business in at least two phases:
    1. Make a generic thing, and then make specific versions of it, for:
        - skills
        - tools
    2. Assess how state interacts with the rest of the page. If this can handle its
    own state, that could be a cleanliness win. 
o - Interesting - the data is small enough that we have it all at once. 
*/
/*
interface SkillsFilterProps


const SkillsFilter: React.FC<> = ({
    title,
    items,
    selectedItems,//
    isOpen,
    onToggle,
    onChange,
    renderFooter,
})
*/

export interface SelectionFilterProps {
    isOpen: boolean;
    items: FilterType[];
    onChange: (item: FilterType, checked: boolean) => void;
    onToggle: () => void;
    selectedItems: FilterType[];
    title: string;
}

var renderCount = 0; 

const SelectionFilter: React.FC<ExtendedSelectionFilterProps> = ({
  title, 
  items,  // TODO actually just a note: items to come in a table: filter, type (eg skills), checked, 
  selectedItems,
  onChange,
  //renderFooter,
}) => {

    
    const [isOpen, setIsOpen] = useState<boolean>(true);
    const [showAll, setShowAll] = useState<boolean>(false);
    useEffect(() => {}, [showAll])

    // dev, observe state changes

    console.log('Re-renders: ', ++renderCount, '; State of showAll: ', showAll);

    //var title = "foobar";
  return (
    <div className={styles.selectionFilter}>

      <button onClick={() => setIsOpen(!isOpen)} className={styles.toggleButton}>
        <span className={styles.title}>{title}</span>
        <span>{isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}</span>
      </button>

      {isOpen && (
        <div className={styles.itemsContainer}>
           {console.log('items length:', items.length, 'slice end:', showAll ? items.length : 10)}
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

          {isOpen && <div className={styles.footerContainer}>{
            <button
              className={styles.footerButton}
              onClick={(e) => {
                e.stopPropagation();
                setShowAll(!showAll);
              }}
            >
              {showAll ? 'View Fewer' : 'View More'}
            </button>
          }</div>}
        </div>
      )}
    </div>

  );
};

export default SelectionFilter;
