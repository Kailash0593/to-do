import { Controller, useForm, type SubmitHandler } from "react-hook-form"
import { useRandomId } from '../../core/hooks/useRandomId';
import { useUser } from '../../core/contexts/UserContext';
import { Button, TextField } from "@mui/material";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import type { TaskI } from "../../core/interface";
import { useProject } from "../../core/contexts/ProjectContext";

interface Props {
    onFormSubmit: (data: TaskI) => void;
    isEditable: boolean;
}

interface TaskFormFieldsI {
    title: string;
    description?: string;
}

export type TaskFormInputHandle = {
    resetFrom: () => void;
    setTask: (task: TaskI | undefined) => void;
}

export const TaskForm = forwardRef<TaskFormInputHandle, Props>(({ onFormSubmit, isEditable }, ref) => {
    const [focusedField, setFocusedField] = useState<string | null>(null);
    const [task, setTask] = useState<TaskI | undefined>(undefined);
    const { project } = useProject();
    const { user } = useUser();

    const { register, handleSubmit, formState: { errors }, setFocus, reset, setValue, control } = useForm<TaskFormFieldsI>();

    const onSubmit: SubmitHandler<TaskFormFieldsI> = (formData) => {
        console.log("project", project)
        let _task: TaskI = {
            id: useRandomId(),
            title: formData.title,
            isCompleted: false,
            createdDate: new Date().getTime(),
            projectId: project?.id!,
            description: formData?.description
        };
        if (isEditable) {
            _task = {
                ...task ?? _task,
                title: formData.title,
                description: formData.description
            }
        }
        onFormSubmit(_task);
    }

    useEffect(() => {
        setFocus("title")
    }, [setFocus])

    const resetFrom = () => {
        reset();
    }

    useImperativeHandle(ref, () => ({
        resetFrom,
        setTask: (_task: TaskI | undefined) => {
            setTask(_task);
            setValue("title", _task?.title || "");
            setValue("description", _task?.description);
        }
    }));

    console.log("TaskForm - re-rendered!")

    return (
        <div className="h-full">
            <h1 className="text-2xl p-4 text-center">{!isEditable ? 'Create' : 'Update'} a new task</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="flex items-center justify-center flex-col">
                <div className="w-full px-2 mb-2">
                    <Controller
                        name="title"
                        control={control}
                        render={({ field: { value } }) => (
                            <>
                                <TextField className="w-full" type="text" label='Enter title'
                                    slotProps={{
                                        inputLabel: {
                                            shrink: (value?.length > 0 || focusedField === 'title') ? true : false
                                        }
                                    }}
                                    onFocus={() => setFocusedField('title')}
                                    {...register("title", {
                                        required: {
                                            value: true,
                                            message: "Must be 3–15 characters long and contain only letters, numbers, spaces, -, _"
                                        },
                                        pattern: {
                                            value: /^(?=.{3,15}$)[A-Za-z0-9_-]+(?: [A-Za-z0-9_-]+)*$/i,
                                            message: "Must be 3–15 characters long and contain only letters, numbers, spaces, -, _"
                                        },
                                        onBlur: () => {
                                            setFocusedField(null)
                                        }
                                    })} />
                                {errors.title && <span>{errors.title.message}</span>}
                            </>
                        )}
                    />
                </div>
                <div className="w-full px-2 mb-2">
                    <Controller
                        name="description"
                        control={control}
                        render={({ field: { value } }) => (
                            <>
                                <TextField className="w-full" label="Enter description" multiline rows={4}
                                    onFocus={() => setFocusedField('description')}
                                    slotProps={{
                                        inputLabel: {
                                            shrink: ((value && value?.length > 0) || focusedField === 'description') ? true : false
                                        }
                                    }}
                                    {...register("description", {
                                        pattern: {
                                            value: /^(?=.{0,100}$)[A-Za-z0-9_-]+(?: [A-Za-z0-9_-]+)*$/i,
                                            message: "max 100 characters long and contain only letters, numbers, spaces, -, _"
                                        },
                                        onBlur: () => {
                                            setFocusedField(null)
                                        }
                                    })} />
                                {errors.description && <span>{errors.description?.message}</span>}
                            </>
                        )}
                    />
                </div>
                <Button className="w-[40%]" variant="contained" type="submit">{
                    !isEditable ? 'Create' : 'Update'
                }</Button>
            </form>
        </div>
    )
})