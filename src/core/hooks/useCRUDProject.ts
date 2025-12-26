import { useProject } from "../contexts/ProjectContext";
import { useTasks } from "../contexts/TasksContex";
import { useUser } from "../contexts/UserContext";
import type { ProjectI } from "../interface";
import { storage } from "../storage";

const useCRUDProject = () => {
    const { user } = useUser();
    const { setProjects, setProject } = useProject();
    const { setTasks } = useTasks();

    const create = (project: ProjectI) => {
        setProjects(prev => [...prev, project]);
        storage.projects = [...storage.projects ?? [], project];
    };

    const update = (project: ProjectI) => {
        console.log("project", project)
        setProjects(prev =>
            prev.map(p => (p.id === project.id ? { ...p, ...project } : p))
        );

        if (storage.projects) {
            storage.projects = storage.projects.map(p =>
                p.id === project.id ? { ...p, ...project } : p
            );
        }
    };

    const remove = (projectId: string) => {
        setProjects(prev => prev.filter(p => p.id !== projectId));

        if (storage.projects) {
            storage.tasks = storage.tasks?.filter(t => t.projectId !== projectId);
            storage.projects = storage.projects.filter(p => p.id !== projectId);
        }
    };

    const selectProject = (project: ProjectI) => {
        const copyProjects = [...(storage.projects ?? [])];
        const updatedProjects = copyProjects.map(p => {
            if (p.id === project.id) {
                const newProject = { ...p, isActive: true }
                return newProject;
            } else {
                return { ...p, isActive: false };
            }
        });
        storage.projects = updatedProjects;

        setTasks(storage.tasks?.filter(t => t.projectId === project.id) || []);

        setProject({
            ...project,
            isActive: true
        });

        setProjects(storage.projects.filter(p => p.userId===user?.id) || []);
    }

    const setProjectsForUser = (userId: string) => {
        setProject(undefined);
        setProjects((storage.projects?.filter(p => p.userId===userId) || []))
    }

    return { create, update, remove, selectProject, setProjectsForUser };
}

export default useCRUDProject;