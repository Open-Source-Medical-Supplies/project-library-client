import React from "react";
import { Project } from "../types";
import styles from "./ProjectContent.module.css";

interface ProjectContentProps {
  project: Project;
}

const ProjectContent: React.FC<ProjectContentProps> = ({ project }) => {
  return (
    <div className={styles.projectContainer}>
      {/* Hero / Category Intro Section */}
      <section className={styles.heroSection}>
        <div className={styles.gridContainer}>
          {/* Hero Image */}
          <div>
            <div>
              <img
                src={project.primaryImage}
                alt={project.name}
                className={styles.heroImage}
              />
            </div>
            <div className={styles.linkContainer}>
              <a
                href={project.link}
                className={styles.projectLink}
                target="_blank"
                rel="noreferrer"
              >
                Project Link
              </a>
            </div>
          </div>
          <div>
            <h2 className={styles.projectTitle}>{project.name}</h2>
            <p className={styles.projectDescription}>{project.description}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectContent;
