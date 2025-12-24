import { useForm, type SubmitHandler } from "react-hook-form"
import type { ProjectI } from '../core/interface';
import { useRandomId } from '../core/hooks/useRandomId';
import { useUser } from '../core/contexts/UserContext';
import { Button, TextField } from "@mui/material";
import { forwardRef, useEffect, useImperativeHandle } from "react";

interface Props {
    onFormSubmit: (data: ProjectI) => void
}

interface ProjectFormFieldsI {
    title: string;
    description?: string;
}

export type CreateProjectFormInputHandle = {
    resetFrom: () => void;
}

export const CreateProjectForm = forwardRef<CreateProjectFormInputHandle, Props>(({ onFormSubmit }, ref) => {
    const { user } = useUser();
    const { register, handleSubmit, formState: { errors }, setFocus, reset } = useForm<ProjectFormFieldsI>();

    const onSubmit: SubmitHandler<ProjectFormFieldsI> = (formData) => {
        const project: ProjectI = {
            id: useRandomId(),
            title: formData.title,
            createdDate: new Date().getTime(),
            isActive: true,
            userId: user?.id!,
            description: formData?.description
        }
        onFormSubmit(project);
    }

    useEffect(() => {
        console.log("title")
        setFocus("title")
    }, [setFocus])

    const resetFrom = () => {
        reset();
    }

    useImperativeHandle(ref, () => ({
        resetFrom
    }));

    console.log("CreateProjectForm - re-rendered!")

    return (
        <div className="h-full">
            <h1 className="text-2xl p-4 text-center">Create a new project</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="flex items-center justify-center flex-col">
                <div className="w-full px-2 mb-2">
                    <TextField className="w-full" type="text" label='Enter title' {...register("title", {
                        required: {
                            value: true,
                            message: "Must be 3–15 characters long and contain only letters, numbers, spaces, -, _"
                        },
                        pattern: {
                            value: /^(?=.{3,15}$)[A-Za-z0-9_-]+(?: [A-Za-z0-9_-]+)*$/i,
                            message: "Must be 3–15 characters long and contain only letters, numbers, spaces, -, _"
                        }
                    })} />
                    {errors.title && <span>{errors.title.message}</span>}
                </div>
                <div className="w-full px-2 mb-2">
                    <TextField className="w-full" label="Enter description" multiline rows={4} {...register("description", {
                        pattern: {
                            value: /^(?=.{0,100}$)[A-Za-z0-9_-]+(?: [A-Za-z0-9_-]+)*$/i,
                            message: "max 100 characters long and contain only letters, numbers, spaces, -, _"
                        }
                    })} />
                    {errors.description && <span>{errors.description?.message}</span>}
                </div>
                <Button className="w-[40%]" variant="contained" type="submit">Create</Button>
            </form>
        </div>
    )
})