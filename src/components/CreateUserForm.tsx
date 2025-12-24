import { useForm, type SubmitHandler } from "react-hook-form"
import type { UserFormFieldsI, UserI } from '../core/interface';
import { useRandomId } from '../core/hooks/useRandomId';
import { Button, TextField } from '@mui/material';

export const CreateUserForm = ({ onFormSubmit }: {
    onFormSubmit: (data: UserI) => void
}) => {
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
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col justify-center items-center w-full'>
            <TextField label='Enter name' {...register("user", {
                required: {
                    value: true,
                    message: "Only letters allowed (3–15 chars) with at most one space."
                },
                pattern: {
                    value: /^(?=.{3,15}$)[A-Za-z]+(?: [A-Za-z]+)?$/i,
                    message: "Only letters allowed (3–15 chars) with at most one space."
                }
            })} className='w-full max-w-2xs bg-white' />
            {errors.user && <span>{errors.user.message}</span>}
            <div className='mt-4'>
                <Button type="submit" variant="contained">lets Go!</Button>
            </div>
        </form>
    )
}