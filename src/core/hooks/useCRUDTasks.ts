import type { TaskI } from "../interface";
import { storage } from "../storage";
import type { Action } from "../type";

const useCRUDTasks = (type: Action, task?: TaskI) => {
    switch (type) {
        case "create":
            if(task){
                const allTasks = !storage.tasks ? [] : storage.tasks;
                storage.tasks = [...allTasks, task];
            }
            break;
        case "update":
            if(task && storage.tasks){ 
                const { id } = task; 
                const currentTaskIndex = storage.tasks.findIndex(t => t.id===id);
                if(currentTaskIndex){
                    storage.tasks[currentTaskIndex] = {
                        ...storage.tasks[currentTaskIndex],
                        ...task
                    }
                }
            }
            break;
        case "delete":
            if(task && storage.tasks){
                const { id } = task; 
                const currentTaskIndex = storage.tasks.findIndex(t => t.id===id);
                if(currentTaskIndex){
                    const newTasks = storage.tasks.slice(currentTaskIndex, currentTaskIndex+1);
                    storage.tasks = newTasks;
                }
            }
            break;
        default:
            break;
    }
}

export default useCRUDTasks;