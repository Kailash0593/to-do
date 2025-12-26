import { useProject } from "../contexts/ProjectContext";
import { useUser } from "../contexts/UserContext";
import type { UserI } from "../interface";
import { storage } from "../storage";

const useCRUDUser = () => {
    const { setUsers } = useUser();
    const { setProjects } = useProject();

    const create = (user: UserI) => {
        setUsers(prev => [...prev, user]);
        storage.users = [...storage.users ?? [], user];
    };

    const update = (user: UserI) => {
        console.log("user", user)

        setUsers(prev =>
            prev.map(u => (u.id === user.id ? { ...u, ...user } : u))
        );

        if (storage.users) {
            storage.users = storage.users.map(u =>
                u.id === user.id ? { ...u, ...user } : u
            );
        }
    };

    const remove = (userId: string) => {
        setUsers(prev => prev.filter(u => u.id !== userId));
        if (storage.users) {
            storage.projects?.forEach(p => {
                if(p.userId===userId){
                    storage.tasks = storage.tasks?.filter(t => t.projectId !== p.id);
                }
            });
            storage.projects = storage.projects?.filter(p => p.userId !== userId);
            storage.categorys = storage.categorys?.filter(c => c.userId !== userId);
            storage.users = storage.users.filter(u => u.id !== userId);
        }
    };

    const selectUser = (user: UserI) => {
        const copyUsers = [...(storage.users ?? [])];
        const updatedUsers = copyUsers.map(u => {
            if (u.id === user.id) {
                const newUser = { ...u, isActive: true }
                return newUser;
            } else {
                return { ...u, isActive: false };
            }
        });
        storage.users = updatedUsers;
        setProjects(storage.projects || []);
    }

    const allUsers = () => {
        return storage.users || [];
    }

    return { create, update, remove, allUsers, selectUser };

}

export default useCRUDUser;