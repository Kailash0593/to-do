import { createContext, useContext, useState } from "react";
import type { ProjectI } from "../interface";
import { storage } from '../storage';
import { useUser } from "./UserContext";

const ProjectContext = createContext<{
    project: ProjectI | undefined;
    setProject: React.Dispatch<React.SetStateAction<ProjectI | undefined>>
} | undefined>(undefined);


const ProjectProvider = ({ children }: { children?: React.ReactNode }) => {
    const { user } = useUser();
    let userProject!: ProjectI | undefined;

    if (user?.id) {
        userProject = storage.projects?.find(project => project.userId === user.id);
    }

    const [project, setProject] = useState<ProjectI | undefined>(userProject);

    const value = {
        project,
        setProject
    }

    return (
        <ProjectContext.Provider value={value}>
            {children}
        </ProjectContext.Provider>
    )
}

const useProject = () => {
    const context = useContext(ProjectContext);
    if (!context) {
        throw new Error("useProject must be used within ProjectProvider");
    }

    return context;
}

export { ProjectProvider, useProject }