import { useTasks } from "../contexts/TasksContex";
import type { TaskI } from "../interface";
import { storage } from "../storage";

const useCRUDTasks = (task?: TaskI) => {
    const { setTasks } = useTasks();

    const create = (task: TaskI) => {
        setTasks(prev => [...prev, task]);
        storage.tasks = [...storage.tasks ?? [], task];
    };

    const update = (task: TaskI) => {
        console.log("task", task)
        setTasks(prev =>
            prev.map(t => (t.id === task.id ? { ...t, ...task } : t))
        );

        if (storage.tasks) {
            storage.tasks = storage.tasks.map(t =>
                t.id === task.id ? { ...t, ...task } : t
            );
        }
    };

    const remove = (taskId: string) => {
        setTasks(prev => prev.filter(t => t.id !== taskId));

        if (storage.tasks) {
            storage.tasks = storage.tasks.filter(t => t.id !== taskId);
        }
    };

    const allTasks = () => {
        return (storage.tasks || []);
    }

    return { create, update, remove, allTasks };
}

export default useCRUDTasks;