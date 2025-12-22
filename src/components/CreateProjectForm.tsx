import React from 'react';
import { useForm, type SubmitHandler } from "react-hook-form"
import type { ProjectI, UserFormFieldsI, UserI } from '../core/interface';
import { useRandomId } from '../core/hooks/useRandomId';
import { useUser } from '../core/contexts/UserContext';

interface ProjectFormFieldsI {
    title: string;
}

export const CreateProjectForm = ({ onFormSubmit }: {
    onFormSubmit: (data: ProjectI) => void
}) => {
    const { user } = useUser();
    const { register, handleSubmit, formState: { errors } } = useForm<ProjectFormFieldsI>();

    const onSubmit: SubmitHandler<ProjectFormFieldsI> = (formData) => {
        const project: ProjectI = {
            id: useRandomId(),
            title: formData.title,
            createdDate: new Date().getTime(),
            isActive: true,
            userId: user?.id!
        }
        onFormSubmit(project);
    }

    console.log("CreateProjectForm - re-rendered!")

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" placeholder='Enter name' {...register("title", {
                pattern: {
                    value: /^[A-Za-z0-9_-]+(?: [A-Za-z0-9_-]+)*$/i,
                    message: "Must be 3–15 characters long and contain only letters, numbers, spaces, -, _"
                }
            })} />
            {errors.title && <span>{errors.title.message}</span>}
            <button type="submit">Create Project!</button>
        </form>
    )
}