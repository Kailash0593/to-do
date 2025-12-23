import { useForm, type SubmitHandler } from "react-hook-form";
import type { TaskI } from "../core/interface";
import { useRandomId } from "../core/hooks/useRandomId";
import { useProject } from "../core/contexts/ProjectContext";
import { Button, TextField } from "@mui/material";

interface TaskFormFieldsI {
    title: string;
    description: string;
}

export const CreateTaskForm = ({ onFormSubmit }: {
    onFormSubmit: (data: TaskI) => void
}) => {
    const { project } = useProject();
    const { register, handleSubmit, formState: { errors } } = useForm<TaskFormFieldsI>();

    const onSubmit: SubmitHandler<TaskFormFieldsI> = (formData) => {
        const task: TaskI = {
            id: useRandomId(),
            title: formData.title,
            createdDate: new Date().getTime(),
            projectId: project?.id!,
            description: formData.description,
            categoryId: ""
        }
        onFormSubmit(task);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <TextField label='Enter name' {...register("title", {
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
            <div>
                <TextField label="Enter description" multiline rows={4} {...register("description", {
                    pattern: {
                        value: /^(?=.{0,100}$)[A-Za-z0-9_-]+(?: [A-Za-z0-9_-]+)*$/i,
                        message: "max 100 characters long and contain only letters, numbers, spaces, -, _"
                    }
                })} />
                {errors.description && <span>{errors.description?.message}</span>}
            </div>
            <Button type="submit">Create Task!</Button>
        </form>
    )
}