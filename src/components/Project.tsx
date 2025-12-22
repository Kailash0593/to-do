import React from 'react'
import { useProject } from '../core/contexts/ProjectContext'
import { CreateProjectForm } from './CreateProjectForm';
import type { ProjectI } from '../core/interface';
import useCRUDProject from '../core/hooks/useCRUDProject';

export const Project = () => {
    const { project, setProject } = useProject();

    let projectNode: React.ReactNode;

    const onFormSubmit = (project: ProjectI) => {
        console.log("project", project)
        setProject(project);
        useCRUDProject("create", project);
    }

    if(!project){
        projectNode = (
            <>
                <h1>Please enter the name of the Project</h1>
                <CreateProjectForm onFormSubmit={onFormSubmit} ></CreateProjectForm>
            </>
        )
    }else{
        projectNode = (
            <>
                Welcome, to your <b>{project.title}</b> project!
            </>
        )
    }

    return (
        <div>{projectNode}</div>
    )
}
