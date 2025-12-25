import React, { createContext, useContext, useState } from "react";
import { useProject } from "./ProjectContext";
import { storage } from "../storage";
import type { TaskI } from "../interface";

const TasksContext = createContext<{
    tasks: TaskI[],
    setTasks: React.Dispatch<React.SetStateAction<TaskI[]>>
} | undefined>(undefined);

const TasksProvider = ({ children }: { children: React.ReactNode }) => {
    const { project } = useProject();
    console.log("project", project)

    let projectTasks: TaskI[] = [];

    if (project) {
        projectTasks = storage.tasks?.filter(task => task.projectId === project.id) || [];
    }

    console.log("projectTasks", projectTasks);

    const [tasks, setTasks] = useState<TaskI[]>(projectTasks);

    const value = {
        tasks,
        setTasks
    }

    return (
        <TasksContext.Provider value={value}>
            {children}
        </TasksContext.Provider>
    )
}

const useTasks = () => {
    const context = useContext(TasksContext);

    if (!context) {
        throw new Error("useTasks must be used within TasksProvider");
    }

    return context;
}

export { TasksProvider, useTasks }