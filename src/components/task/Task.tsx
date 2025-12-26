import React, { useRef, useState } from 'react'
import { useTasks } from '../../core/contexts/TasksContex'
import type { TaskI } from '../../core/interface';
import { TaskForm } from './TaskForm';
import useCRUDTasks from '../../core/hooks/useCRUDTasks';
import { AppBar, Button, Fab, IconButton, Toolbar, Typography } from '@mui/material';
import { useProject } from '../../core/contexts/ProjectContext';
import ArrowBack from '@mui/icons-material/ArrowBackIosNew';
import NoTaskBgImage from '../../assets/no-task-bg.svg';
import { SwipeDrawer, type SwipeDrawerCustomInputHandle } from '../common/SwipeDrawer';
import { TaskCard } from './TaskCard';
import AddIcon from '@mui/icons-material/Add';
import { TaskAddActionMenu, type TaskAddActionMenuCustomInputHandle } from './TaskAddActionMenu';
import { CategoryForm } from '../category/CategoryForm';
import { AlertDialog, type AlertDialogCustomInputHandle } from '../common/AlertDialog';

export const Task = () => {
    const { tasks } = useTasks();
    const { project, setProject } = useProject();
    const [task, setTask] = useState<TaskI | undefined>(undefined);
    const [addFrom, setAddFrom] = useState<"task" | "category">("task");
    const crudTask = useCRUDTasks();

    const swipeableDrawerRef = useRef<SwipeDrawerCustomInputHandle>(null);
    const taskAddActionMenuRef = useRef<TaskAddActionMenuCustomInputHandle>(null);
    const commonDialogRef = useRef<AlertDialogCustomInputHandle>(null);

    let taskNode: React.ReactNode;

    const onTaskFormSubmit = (task: TaskI, isEditable: boolean) => {
        isEditable ? crudTask.update(task) : crudTask.create(task);
        swipeableDrawerRef.current?.toggleDrawer(false);
        console.log("task", task);
    }

    const handleBack = () => {
        setProject(undefined);
    }

    const onAddClick = (e: React.MouseEvent<any>) => {
        taskAddActionMenuRef.current?.open((e.currentTarget as SVGElement).parentElement);

    }

    const onCardClick = (_task: TaskI) => {
        crudTask.update({
            ..._task,
            isCompleted: !_task.isCompleted
        });
    }

    const onDeleteClick = (_task: TaskI) => {
        commonDialogRef.current?.setTitle("Delete Task");
        commonDialogRef.current?.setDescription(`Are you sure you want to delete ${_task.title} Task ?`);
        commonDialogRef.current?.confirm().then(() => {
            crudTask.remove(_task.id);
        });
        commonDialogRef.current?.open();
    }

    const onEditClick = (_task: TaskI) => {
        setAddFrom("task");
        setTask(_task)
        swipeableDrawerRef.current?.toggleDrawer(true);
    }

    const onAddTask = () => {
        setAddFrom("task");
        setTask(undefined)
        swipeableDrawerRef.current?.toggleDrawer(true);
    }

    const onAddCategory = () => {
        setAddFrom("category");
        swipeableDrawerRef.current?.toggleDrawer(true);
    }

    console.log("tasks", tasks)

    if (tasks.length === 0) {
        taskNode = (
            <div className='flex flex-col justify-center align-middle h-full'>
                <img src={NoTaskBgImage} alt="No Projects" className='w-[80%] mx-auto' />
                <h1 className='text-3xl text-center mb-4'>No Tasks!</h1>
                <p className='text-md text-center mb-6'>lets' add a new task for your brand new project.</p>
                <Button variant='contained' className='w-1/2 m-auto!' onClick={onAddTask} > New Task </Button>
            </div>
        )
    } else {
        taskNode = (
            <>
                <div className='all-projects p-2'>
                    <h1 className='text-2xl p-2 mb-2'>Your Projects</h1>
                    <div className='all-project-container max-h-[calc(100vh-130px)] overflow-y-auto'>
                        {
                            tasks.map(t => (
                                <TaskCard
                                    key={t.id}
                                    task={t}
                                    onCardClick={onCardClick}
                                    onDeleteClick={onDeleteClick}
                                    onEditClick={onEditClick}
                                ></TaskCard>
                            ))
                        }
                    </div>
                </div>
                <Fab color='primary' className='absolute! right-4 bottom-4' >
                    <AddIcon onClick={(e) => onAddClick(e)} />
                </Fab>
            </>
        )
    }

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="small"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                        onClick={handleBack}
                    >
                        <ArrowBack />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        {project?.title}
                    </Typography>
                </Toolbar>
            </AppBar>
            <div>
                {taskNode}
                <SwipeDrawer ref={swipeableDrawerRef} >
                    {
                        addFrom === "task" ?
                            <TaskForm
                                onFormSubmit={onTaskFormSubmit}
                                task={task} ></TaskForm>
                            :
                            <CategoryForm></CategoryForm>
                    }
                </SwipeDrawer>
                <TaskAddActionMenu
                    ref={taskAddActionMenuRef}
                    onAddTask={onAddTask}
                    onAddCategory={onAddCategory}
                ></TaskAddActionMenu>
            </div>
            <AlertDialog
                ref={commonDialogRef}
            ></AlertDialog>
        </>
    )
}

