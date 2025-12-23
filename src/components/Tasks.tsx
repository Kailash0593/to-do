import React from 'react'
import { useTasks } from '../core/contexts/TasksContex'
import type { TaskI } from '../core/interface';
import { CreateTaskForm } from './CreateTaskForm';
import { storage } from '../core/storage';
import useCRUDTasks from '../core/hooks/useCRUDTasks';

export const Tasks = () => {
    const { tasks, setTasks } = useTasks();

    let taskNode: React.ReactNode;

    const onFormSubmit = (task: TaskI) => {
        console.log("task", task);
        const allTasks = !storage.tasks ? [] : storage.tasks; 
        setTasks([...allTasks, task]);
        useCRUDTasks("create", task);
    }

    if (tasks && tasks.length > 0) {
        taskNode = (
            <>
                <ul>
                    {
                        tasks.map(task => (
                            <li key={task.id}>
                                {task.title}
                                {task?.description}
                            </li>
                        ))
                    }
                    <CreateTaskForm onFormSubmit={onFormSubmit}></CreateTaskForm>
                </ul>
            </>
        )
    } else {
        taskNode = (
            <>
                <h1>No task found lets start by creating a task</h1>
                <CreateTaskForm onFormSubmit={onFormSubmit}></CreateTaskForm>
            </>
        )
    }

    return (
        <>
            {taskNode}
        </>
    )
}
