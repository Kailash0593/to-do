import React from 'react'
import { useProject } from '../core/contexts/ProjectContext'
import { CreateProjectForm } from './CreateProjectForm';
import type { ProjectI } from '../core/interface';
import useCRUDProject from '../core/hooks/useCRUDProject';
import { Tasks } from './Tasks';

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
                <h1>Welcome, to your <b>{project.title}</b> project!</h1>
                <Tasks />
            </>
        )
    }

    return (
        <div>{projectNode}</div>
    )
}
