import styles from './CategoryCard.module.css';
import { CategoryData } from "../types";

interface CategoryCardProps extends CategoryData {
  filterProjectsByCategory: (slug: string) => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  name,
  primaryImage,
  slug,
  token,
  filterProjectsByCategory,
}) => {
  const imagePath = primaryImage && primaryImage !== '' ? primaryImage : 'https://placehold.co/100x100';
  return (
    <div className={styles.categoryContainer}>
      <div className={styles.cardContent}>
        <img src={imagePath} alt={name} className={styles.image} />
        <h3 className={styles.title}>{name}</h3>
        <div className={styles.buttonGrid}>
          <button
            onClick={() => filterProjectsByCategory(token)}
            className={styles.buttonPrimary}
          >
            View Projects
          </button>
          <a
            href={`/research-category/${slug}`}
            className={styles.buttonSecondary}
          >
            Research
          </a>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
