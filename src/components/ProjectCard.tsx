import { Project } from "../types";
import dayjs from "dayjs";
import styles from "./ProjectCard.module.css";

const ProjectCard: React.FC<Project> = ({
  name,
  description,
  primaryImage,
  slug,
  attributionOrganization,
  addedOn,
}) => {
  return (
    <a href={`/projects/${slug}`} className={styles.projectCard}>
      <div className={styles.cardContent}>
        <div className={styles.imageContainer}>
          {primaryImage && (
            <img
              src={primaryImage}
              alt={name}
              className={styles.image}
            />
          )}
        </div>
        <div className={styles.details}>
          <h3 className={styles.title}>{name}</h3>
          <h4 className={styles.attribution}>{attributionOrganization}</h4>
          <h5 className={styles.addedDate}>
            Added {dayjs(addedOn).format("MM/DD/YYYY")}
          </h5>
          <p className={styles.description}>
            {description && description.length > 100
              ? `${description.slice(0, 100)}...`
              : description}
          </p>
        </div>
      </div>
    </a>
  );
};

export default ProjectCard;
