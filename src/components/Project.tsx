import React, { useRef } from 'react'
import { useProject } from '../core/contexts/ProjectContext'
import { CreateProjectForm, type CreateProjectFormInputHandle } from './CreateProjectForm';
import type { ProjectI } from '../core/interface';
import useCRUDProject from '../core/hooks/useCRUDProject';
// import { Tasks } from './Tasks';
import { AppBar, Button, Fab, IconButton, Toolbar } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Typography from '@mui/material/Typography';
import { useUser } from '../core/contexts/UserContext';
import NoProjectBgImage from './../assets/no-project-bg.svg';
import { SwipeDrawer, type SwipeDrawerCustomInputHandle } from './SwipeDrawer';
import { ProjectCard } from './ProjectCard';
import AddIcon from '@mui/icons-material/Add';


export const Project = () => {
    const { user } = useUser();
    const { project, projects } = useProject();
    const crudProject = useCRUDProject();
    const swipeableDrawerRef = useRef<SwipeDrawerCustomInputHandle>(null);
    const createProjectRef = useRef<CreateProjectFormInputHandle>(null);

    let projectNode: React.ReactNode;

    const onFormSubmit = (project: ProjectI) => {
        console.log("project", project)
        crudProject.create(project);
        swipeableDrawerRef.current?.toggleDrawer(false);
        createProjectRef.current?.resetFrom();
    }

    const handleNewProject = () => {
        console.log("toggleDrawer", swipeableDrawerRef.current)
        swipeableDrawerRef.current?.toggleDrawer(true);
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
                                <ProjectCard key={p.id} project={p} ></ProjectCard>
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
                    <CreateProjectForm ref={createProjectRef} onFormSubmit={onFormSubmit} ></CreateProjectForm>
                </SwipeDrawer>
            </div>
        </>
    )
}
