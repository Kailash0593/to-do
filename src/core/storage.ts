import type { UserI, ProjectI, CategoryI, TaskI } from "./interface";

class Storage {
    // get user() {
    //     const data = localStorage.getItem("user");
    //     if (data) {
    //         return JSON.parse(data) as UserI;
    //     }
    //     return undefined;
    // }

    // set user(user: UserI | undefined) {
    //     if (user) {
    //         localStorage.setItem("user", JSON.stringify(user));
    //     }
    // }

    get users() {
        const data = localStorage.getItem("users");
        if (data) {
            return JSON.parse(data) as UserI [];
        }
        return undefined;
    }

    set users(users: UserI [] | undefined) {
        if (users) {
            const newUsers = JSON.stringify(users && users.length>0 ? users : []) ;
            localStorage.setItem("users", newUsers);
        }
    }

    get projects() {
        const data = localStorage.getItem("projects");
        if (data) {
            return JSON.parse(data) as ProjectI [];
        }
        return undefined;
    }

    set projects(projects: ProjectI [] | undefined) {
        if (projects) {
            const newProjects = JSON.stringify(projects && projects.length>0 ? projects : []) ;
            localStorage.setItem("projects", newProjects);
        }
    }

    get categorys() {
        const data = localStorage.getItem("categorys");
        if (data) {
            return JSON.parse(data) as CategoryI [];
        }
        return undefined;
    }

    set categorys(categories: CategoryI [] | undefined) {
        if (categories) {
            const newCategories = JSON.stringify(categories && categories.length>0 ? categories : []) ;
            localStorage.setItem("categorys", newCategories);
        }
    }

    get tasks() {
        const data = localStorage.getItem("tasks");
        if (data) {
            return JSON.parse(data) as TaskI [];
        }
        return undefined;
    }

    set tasks(tasks: TaskI [] | undefined) {
        if (tasks) {
            const newTaks = JSON.stringify(tasks && tasks.length>0 ? tasks : []) ;
            localStorage.setItem("tasks", newTaks);
        }
    }
}

const storage = new Storage();

export { storage };