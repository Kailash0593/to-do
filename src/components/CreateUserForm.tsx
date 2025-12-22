import React from 'react';
import { useForm, type SubmitHandler } from "react-hook-form"
import type { UserFormFieldsI, UserI } from '../core/interface';
import { useRandomId } from '../core/hooks/useRandomId';

export const CreateUserForm = ({ onFormSubmit }: {
    onFormSubmit: (data: UserI) => void
} ) => {
    const { register, handleSubmit, formState: { errors } } = useForm<UserFormFieldsI>();

    const onSubmit: SubmitHandler<UserFormFieldsI> = (formData) => {
        const user: UserI = {
            id: useRandomId(),
            isActive: true,
            name: formData.user.toLocaleLowerCase(),
            projects: [],
            categorys: []
        }
        onFormSubmit(user);
    }

    console.log("CreateUserForm - re-rendered!")

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" placeholder='Enter name' {...register("user", {
                pattern: {
                    value: /^(?=.{3,15}$)[A-Za-z]+(?: [A-Za-z]+)?$/i,
                    message: "Only letters allowed (3–15 chars) with at most one space."
                }
            })} />
            {errors.user && <span>{errors.user.message}</span>}
            <button type="submit">lets Go!</button>
        </form>
    )
}