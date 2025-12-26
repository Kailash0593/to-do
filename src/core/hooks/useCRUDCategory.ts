import { useProject } from "../contexts/ProjectContext";
import { useTasks } from "../contexts/TasksContex";
import { useUser } from "../contexts/UserContext";
import type { CategoryI } from "../interface";
import { storage } from "../storage";

const useCRUDCategory = () => {
    // const { setProjects, setProject } = useProject();
    const { tasks, setTasks } = useTasks();
    const { user } = useUser();

    const create = (category: CategoryI) => {
        storage.categorys = [...storage.categorys ?? [], category];
    };

    const update = (category: CategoryI) => {
        console.log("category", category)
        if (storage.categorys) {
            storage.categorys = storage.categorys.map(c =>
                c.id === category.id ? { ...c, ...category } : c
            );
        }
    };

    const remove = (categoryId: string) => {
        if(storage.tasks){
            storage.tasks = [...storage.tasks.map(t => {
                if(t?.categoryId){
                    t.categoryId = t.categoryId===categoryId ?  undefined : t.categoryId;
                }
                return t;
            })];
            setTasks(tasks.map(t => {
                if(t?.categoryId){
                    t.categoryId = t.categoryId===categoryId ?  undefined : t.categoryId;
                }
                return t;
            }));
        }
        if (storage.categorys) {
            storage.categorys = storage.categorys.filter(c => c.id !== categoryId);
        }
    };

    const getAllCategorys = () => {
        return storage.categorys?.filter(c => c.userId===user?.id);
    }

    return { create, update, remove, getAllCategorys };
}

export default useCRUDCategory;