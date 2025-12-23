import React from 'react';
import { useUser } from './../core/contexts/UserContext';
import { CreateUserForm } from './CreateUserForm';
import type { UserI } from '../core/interface';
import useCRUDUser from '../core/hooks/useCRUDUser';
import { Dashboard } from './Dashboard';
import { Button } from '@mui/material';
import ToDoBgImage from './../assets/to-do-bg.svg';

export const Welcome = () => {
    const { user, setUser } = useUser();

    let welcome: React.ReactNode;

    const onFormSubmit = (user: UserI) => {
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
                <img src={ToDoBgImage} alt="to-do-bg" className='w-full' />
                <div>
                    <h1 className='text-2xl text-center pb-5'>Task Management & To-Do List</h1>
                    <p className='text-sm text-wrap w-8/10 mx-auto text-center pb-5'>This productive tool is designed to help
                        you better manage your task
                        project-wise conveniently!</p>
                    <div className='flex align-middle justify-center'>
                        <CreateUserForm onFormSubmit={onFormSubmit} ></CreateUserForm>
                    </div>
                </div>
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
