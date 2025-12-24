import { useProject } from "../contexts/ProjectContext";
import { useUser } from "../contexts/UserContext";
import type { ProjectI } from "../interface";
import { storage } from "../storage";

const useCRUDProject = () => {
    const { projects, setProjects } = useProject();
    const { user } = useUser();

    const create = (project: ProjectI) => {
        setProjects(prev => [...prev, project]);
        storage.projects = [...storage.projects ?? [], project];
    };

    const update = (project: ProjectI) => {
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
            storage.projects = storage.projects.filter(p => p.id !== projectId);
        }
    };

    return { create, update, remove };
}

export default useCRUDProject;