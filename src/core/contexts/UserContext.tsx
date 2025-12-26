import React, { createContext, useContext, useState } from 'react';
import { storage } from '../storage';
import type { UserI } from '../interface';

const UserContext = createContext<{
    user: UserI | undefined;
    setUser: React.Dispatch<React.SetStateAction<UserI | undefined>>,
    users: UserI [],
    setUsers: React.Dispatch<React.SetStateAction<UserI []>>,
    showAllUsers: boolean;
    setShowAllUsers: React.Dispatch<React.SetStateAction<boolean>>
} | undefined>(undefined);


const UserProvider = ({ children }: { children?: React.ReactNode }) => {
    const currentUser = storage.users?.find(user => user.isActive);
    const [user, setUser] = useState(currentUser);
    const [users, setUsers] = useState<UserI []>(storage.users || []);
    const [showAllUsers, setShowAllUsers] = useState(false);

    const value = {
        user,
        setUser,
        users,
        setUsers,
        showAllUsers,
        setShowAllUsers
    }

    return (
        <UserContext.Provider value={value} >
            {children}
        </UserContext.Provider>
    )
}

const useUser = () => {
    const context = useContext(UserContext);
    if(!context){
        throw new Error("useUser must be used within UserProvider");
    }
    return context;
}

export {UserProvider, useUser}