import React from 'react';
import { Project } from '../types';
import { useParams } from 'react-router';
import ProjectContent from '../components/ProjectContent';
import { useProjects } from '../hooks/use-projects';

const ProjectPage: React.FC = () => {
  const { projectId } = useParams();
  const { data: projects } = useProjects();
  const project = projects?.find((project: Project) => project.slug === projectId) as Project | undefined;
  return (
    <div>
      {project ? <ProjectContent project={project} /> : null }
    </div>
  );
};

export default ProjectPage;
