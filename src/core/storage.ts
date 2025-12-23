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

    set users(user: UserI [] | undefined) {
        const data = localStorage.getItem("users");
        if (data && user) {
            const newUsers = [...JSON.parse(data), user];
            localStorage.setItem("users", JSON.stringify(newUsers));
        } else {
            localStorage.setItem("users", JSON.stringify(user));
        }
    }

    get projects() {
        const data = localStorage.getItem("projects");
        if (data) {
            return JSON.parse(data) as ProjectI [];
        }
        return undefined;
    }

    set projects(project: ProjectI [] | undefined) {
        const data = localStorage.getItem("projects");
        if (data && project) {
            const newProjects = [...JSON.parse(data), project];
            localStorage.setItem("projects", JSON.stringify(newProjects));
        } else {
            localStorage.setItem("projects", JSON.stringify(project));
        }
    }

    get categorys() {
        const data = localStorage.getItem("categorys");
        if (data) {
            return JSON.parse(data) as CategoryI [];
        }
        return undefined;
    }

    set categorys(category: CategoryI [] | undefined) {
        const data = localStorage.getItem("categorys");
        if (data && category) {
            const newCategorys = [...JSON.parse(data), category];
            localStorage.setItem("categorys", JSON.stringify(newCategorys));
        } else {
            localStorage.setItem("categorys", JSON.stringify(category));
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