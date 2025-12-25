import React, { useEffect, useRef, useState } from 'react'
import { useProject } from '../../core/contexts/ProjectContext'
import { ProjectForm, type ProjectFormInputHandle } from './ProjectForm';
import type { ProjectI } from '../../core/interface';
import useCRUDProject from '../../core/hooks/useCRUDProject';
import { AppBar, Button, Fab, IconButton, Toolbar } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Typography from '@mui/material/Typography';
import { useUser } from '../../core/contexts/UserContext';
import NoProjectBgImage from './../../assets/no-project-bg.svg';
import { SwipeDrawer, type SwipeDrawerCustomInputHandle } from '../SwipeDrawer';
import { ProjectCard } from './ProjectCard';
import AddIcon from '@mui/icons-material/Add';
import { CommonAlertDialog, type AlertDialogCustomInputHandle } from '../CommonDialog';

export const Project = () => {
    const [ isSelected, setIsSelected ] = useState('');
    const [ isEditable, setIsEditable ] = useState(false);
    const { user } = useUser();
    const { projects, setProject } = useProject();
    const crudProject = useCRUDProject();
    const swipeableDrawerRef = useRef<SwipeDrawerCustomInputHandle>(null);
    const createProjectRef = useRef<ProjectFormInputHandle>(null);
    const commonDialogRef = useRef<AlertDialogCustomInputHandle>(null);

    let projectNode: React.ReactNode;

    useEffect(() => {
        console.log("projects", projects)
        const projectId = projects.find(p => p.isActive)?.id;
        console.log("projectId", projectId)
        setIsSelected(projectId || '');
    }, [])

    const onFormSubmit = (project: ProjectI) => {
        isEditable ? crudProject.update(project) : crudProject.create(project);
        swipeableDrawerRef.current?.toggleDrawer(false);
        createProjectRef.current?.resetFrom();
        console.log("project", project)
    }

    const handleNewProject = () => {
        setIsEditable(false);
        createProjectRef.current?.setProject(undefined);
        swipeableDrawerRef.current?.toggleDrawer(true);
        console.log("toggleDrawer", swipeableDrawerRef.current)
    }

    const onCardClick = (_project: ProjectI) => {
        setIsSelected(_project.id);
        crudProject.selectProject(_project);
        console.log("_project", _project);
        console.log("onCardClick");
    }

    const onDeleteClick = (project: ProjectI) => {
        commonDialogRef.current?.setTitle("Delete project");
        commonDialogRef.current?.setDescription(`Are you sure you want to delete ${project.title} project ?`);
        commonDialogRef.current?.confirm().then(() => {
            crudProject.remove(project.id);
        });
        commonDialogRef.current?.open();
        console.log("onDeleteClick");
    }

    const onEditClick = (project: ProjectI) => {
        setIsEditable(true);
        swipeableDrawerRef.current?.toggleDrawer(true);
        console.log("project", project)
        createProjectRef.current?.setProject(project);
        console.log("onEditClick");
    }

    if (projects.length === 0) {
        projectNode = (
            <div className='flex flex-col justify-center align-middle h-full'>
                <img src={NoProjectBgImage} alt="No Projects" className='w-[80%] mx-auto' />
                <h1 className='text-3xl text-center mb-4'>No Projects!</h1>
                <p className='text-md text-center mb-6'>Start your journey by creating your first project</p>
                <Button variant='contained' className='w-1/2 m-auto!' onClick={handleNewProject} > New Project </Button>
            </div>
        )
    } else {
        projectNode = (
            <>
                <div className='all-projects p-2'>
                    <h1 className='text-2xl p-2 mb-2'>Your Projects</h1>
                    <div className='all-project-container max-h-[calc(100vh-130px)] overflow-y-auto'>
                        {
                            projects.map(p => (
                                <ProjectCard 
                                    key={p.id} 
                                    project={p} 
                                    onCardClick={() => onCardClick(p)} 
                                    onDeleteClick={onDeleteClick}
                                    onEditClick={onEditClick}
                                    isSelected={isSelected}
                                ></ProjectCard>
                            ))
                        }
                    </div>
                </div>
                <Fab color='primary' className='absolute! right-4 bottom-4' >
                    <AddIcon onClick={handleNewProject} />
                </Fab>
            </>
        )
    }

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        To Do
                    </Typography>
                    <div className='text-end'>
                        <IconButton
                            size="small"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                        <p className='text-sm capitalize '>{user?.name}</p>
                    </div>
                </Toolbar>
            </AppBar>
            <div>
                {projectNode}
                <SwipeDrawer ref={swipeableDrawerRef} >
                    <ProjectForm 
                        ref={createProjectRef} 
                        onFormSubmit={onFormSubmit}
                        isEditable={isEditable}
                    >
                    </ProjectForm>
                </SwipeDrawer>
            </div>
            <CommonAlertDialog
                ref={commonDialogRef}
            ></CommonAlertDialog>
        </>
    )
}
