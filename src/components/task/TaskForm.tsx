import { Controller, useForm, type SubmitHandler } from "react-hook-form"
import { useRandomId } from '../../core/hooks/useRandomId';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import type { TaskI } from "../../core/interface";
import { useProject } from "../../core/contexts/ProjectContext";
import useCRUDCategory from "../../core/hooks/useCRUDCategory";

interface Props {
    task?: TaskI;
    onFormSubmit: (data: TaskI, isEditable: boolean) => void;
}

interface TaskFormFieldsI {
    title: string;
    category?: string;
    description?: string;
}

export type TaskFormInputHandle = {
    resetFrom: () => void;
}

export const TaskForm = (props: Props) => {
    const [selectedCategory, setSelectedCategory] = useState("");
    const [focusedField, setFocusedField] = useState<string | null>(null);
    const [task, setTask] = useState<TaskI | undefined>(undefined);
    const { project } = useProject();
    const crudCategory = useCRUDCategory();
    const categories = crudCategory.getAllCategorys() || [];
    // const { user } = useUser();

    const { register, handleSubmit, formState: { errors }, setFocus, reset, setValue, control } = useForm<TaskFormFieldsI>();

    const onSubmit: SubmitHandler<TaskFormFieldsI> = (formData) => {
        console.log("formData", formData)
        let _task: TaskI = {
            id: useRandomId(),
            title: formData.title,
            isCompleted: false,
            createdDate: new Date().getTime(),
            projectId: project?.id!,
            description: formData?.description,
        };
        if (task) {
            _task = {
                ...task ?? _task,
                title: formData.title,
                description: formData.description
            }
        }
        if (formData?.category) {
            _task = { ..._task, categoryId: formData?.category }
        }
        props.onFormSubmit(_task, task ? true : false);
        reset();
    }

    useEffect(() => {
        setFocus("title")
    }, [setFocus])

    useEffect(() => {
        setTask(props.task);
        setValue("title", props.task?.title || "");
        setValue("description", props.task?.description);
        setSelectedCategory(props.task?.categoryId || "")
    }, [props.task])

    console.log("TaskForm - re-rendered!")

    return (
        <div className="h-full">
            <h1 className="text-2xl p-4 text-center">{!task ? 'Create' : 'Update'} a new task</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="flex items-center justify-center flex-col">
                <div className="w-full px-2 mb-2 grid grid-cols-6 gap-2">
                    <div className="col-span-4">
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
                    <div className="col-span-2">
                        <Controller
                            name="category"
                            control={control}
                            render={({ }) => (
                                <>
                                    <FormControl sx={{ width: "100%" }}>
                                        <InputLabel>Category</InputLabel>
                                        <Select
                                            value={selectedCategory}
                                            autoWidth
                                            defaultValue=""
                                            label="category"
                                            onFocus={() => setFocusedField('category')}
                                            {...register("category", {
                                                onBlur: () => {
                                                    setFocusedField(null)
                                                },
                                                onChange: (e: PointerEvent) => {
                                                    setSelectedCategory((e.target as any).value);
                                                }
                                            })}
                                        >
                                            <MenuItem value={undefined}>
                                                <em>None</em>
                                            </MenuItem>
                                            {
                                                categories.map(c => (
                                                    <MenuItem key={c.id} value={c.id}>{c.title}</MenuItem>
                                                ))
                                            }
                                        </Select>
                                    </FormControl>
                                </>
                            )}
                        />
                    </div>
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
                    !task ? 'Create' : 'Update'
                }</Button>
            </form>
        </div>
    )
}