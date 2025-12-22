import React from 'react';
import { useUser } from './../core/contexts/UserContext';
import { CreateUserForm } from './CreateUserForm';
import type { UserI } from '../core/interface';
import useCRUDUser from '../core/hooks/useCRUDUser';
import { Dashboard } from './Dashboard';

export const Welcome = () => {
    const { user, setUser } = useUser();

    let welcome: React.ReactNode;

    const onFormSubmit = ( user: UserI) => {
        setUser(user);
        useCRUDUser("create", user);
    }

    if (user) {
        welcome = (
            <Dashboard />
        )
    } else {
        welcome = (
            <div>
                <h1>Hi, lets start by entering your name.</h1>
                <CreateUserForm onFormSubmit={onFormSubmit} ></CreateUserForm>
            </div>
        )
    }

    console.log("welcome - re-rendered!")

    return (
        <>
            {welcome}
        </>
    )
}
