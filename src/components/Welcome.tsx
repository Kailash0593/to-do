import React from 'react';
import { useUser } from './../core/contexts/UserContext';
import { UserForm } from './user/UserForm';
import type { UserI } from '../core/interface';
import { Dashboard } from './Dashboard';
import ToDoBgImage from './../assets/to-do-bg.svg';
import useCRUDUser from '../core/hooks/useCRUDUser';

export const Welcome = () => {
    const { users, setUser } = useUser();
    const crudUser = useCRUDUser();

    let welcome: React.ReactNode;

    const onFormSubmit = (user: UserI) => {
        setUser({...user, isActive: true});
        crudUser.create({...user, isActive: true});
    }

    if (users.length>0) {
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
                        <UserForm onFormSubmit={onFormSubmit} ></UserForm>
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
