import type { UserI } from "../interface";
import { storage } from "../storage";
import type { Action } from "../type";

const useCRUDUser = (type: Action, user?: UserI) => {
    switch (type) {
        case "create":
            if(user){
                storage.users = [user];
            }
            break;
        case "update":
            if(user && storage.users){
                const { id } = user; 
                const currentUserIndex = storage.users.findIndex(u => u.id===id);
                if(currentUserIndex){
                    storage.users[currentUserIndex] = {
                        ...storage.users[currentUserIndex],
                        ...user
                    }
                }
            }
            break;
        case "delete":
            if(user && storage.users){
                const { id } = user; 
                const currentUserIndex = storage.users.findIndex(u => u.id===id);
                if(currentUserIndex){
                    const newUsers = storage.users.slice(currentUserIndex, currentUserIndex+1);
                    storage.users = newUsers;
                }
            }
            break;
        default:
            break;
    }
}

export default useCRUDUser;