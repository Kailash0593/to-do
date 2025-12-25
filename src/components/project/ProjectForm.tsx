import { Controller, useForm, type SubmitHandler } from "react-hook-form"
import type { ProjectI } from '../../core/interface';
import { useRandomId } from '../../core/hooks/useRandomId';
import { useUser } from '../../core/contexts/UserContext';
import { Button, TextField } from "@mui/material";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";

interface Props {
    onFormSubmit: (data: ProjectI) => void;
    isEditable: boolean;
}

interface ProjectFormFieldsI {
    title: string;
    description?: string;
}

export type ProjectFormInputHandle = {
    resetFrom: () => void;
    setProject: (project: ProjectI | undefined) => void;
}

export const ProjectForm = forwardRef<ProjectFormInputHandle, Props>(({ onFormSubmit, isEditable }, ref) => {
    const [focusedField, setFocusedField] = useState<string | null>(null);
    const [project, setProject] = useState<ProjectI | undefined>(undefined);
    const { user } = useUser();

    const { register, handleSubmit, formState: { errors }, setFocus, reset, setValue, control } = useForm<ProjectFormFieldsI>();

    const onSubmit: SubmitHandler<ProjectFormFieldsI> = (formData) => {
        let _project: ProjectI = {
            id: useRandomId(),
            title: formData.title,
            createdDate: new Date().getTime(),
            isActive: false,
            userId: user?.id!,
            description: formData?.description
        };
        if (isEditable) {
            _project = {
                ...project ?? _project,
                title: formData.title,
                description: formData.description
            }
        }
        onFormSubmit(_project);
    }

    useEffect(() => {
        console.log("title")
        setFocus("title")
    }, [setFocus])

    const resetFrom = () => {
        reset();
    }

    useImperativeHandle(ref, () => ({
        resetFrom,
        setProject: (_project: ProjectI | undefined) => {
            setProject(_project);
            setValue("title", _project?.title || "");
            setValue("description", _project?.description);
        }
    }));

    console.log("ProjectForm - re-rendered!")

    return (
        <div className="h-full">
            <h1 className="text-2xl p-4 text-center">{!isEditable ? 'Create' : 'Update'} a new project</h1>
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