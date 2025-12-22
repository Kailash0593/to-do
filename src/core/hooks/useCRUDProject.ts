import type { ProjectI } from "../interface";
import { storage } from "../storage";
import type { Action } from "../type";

const useCRUDProject = (type: Action, project?: ProjectI) => {
    switch (type) {
        case "create":
            if(project){
                storage.projects = [project];
            }
            break;
        case "update":
            if(project && storage.projects){ 
                const { id } = project; 
                const currentProjectIndex = storage.projects.findIndex(p => p.id===id);
                if(currentProjectIndex){
                    storage.projects[currentProjectIndex] = {
                        ...storage.projects[currentProjectIndex],
                        ...project
                    }
                }
            }
            break;
        case "delete":
            if(project && storage.projects){
                const { id } = project; 
                const currentProjectIndex = storage.projects.findIndex(p => p.id===id);
                if(currentProjectIndex){
                    const newProjects = storage.projects.slice(currentProjectIndex, currentProjectIndex+1);
                    storage.projects = newProjects;
                }
            }
            break;
        default:
            break;
    }
}

export default useCRUDProject;