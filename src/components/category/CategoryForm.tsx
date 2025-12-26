import { Button, Chip, Paper, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import type { CategoryI } from "../../core/interface";
import { useRandomId } from "../../core/hooks/useRandomId";
import { useProject } from "../../core/contexts/ProjectContext";
import { useUser } from "../../core/contexts/UserContext";
import useCRUDCategory from "../../core/hooks/useCRUDCategory";

interface CategoryFormFieldsI {
    title: string;
}

export const CategoryForm = () => {
    const { project } = useProject();
    const { user } = useUser();
    const crudCategory = useCRUDCategory();
    const [focusedField, setFocusedField] = useState<string | null>(null);
    const { register, handleSubmit, formState: { errors }, reset, control } = useForm<CategoryFormFieldsI>();
    const categories = crudCategory.getAllCategorys() || [];

    const onSubmit: SubmitHandler<CategoryFormFieldsI> = (formData) => {
        const category: CategoryI = {
            id: useRandomId(),
            title: formData.title,
            createdDate: new Date().getTime(),
            projectId: project?.id!,
            userId: user?.id!
        }
        crudCategory.create(category);
        reset();
    }

    const onDeleteCategory = (category: CategoryI) => {
        crudCategory.remove(category.id);
    }

    return (
        <div className="h-full">
            <h1 className="text-2xl p-4 text-center">Categories</h1>

            <form onSubmit={handleSubmit(onSubmit)} >
                <div className="px-2 mb-2">
                    <Paper className="w-full min-h-25 p-2" elevation={0} >
                        <Stack direction="row" sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: 1, // Adds space between chips

                        }}>
                            {
                                categories.map(c => (
                                    <Chip key={c.id} label={c.title} variant="outlined" size="small" onDelete={() => onDeleteCategory(c)} />
                                ))
                            }
                        </Stack>
                    </Paper>
                </div>
                <div className="w-full px-2 mb-2 grid grid-cols-5">
                    <Controller
                        name="title"
                        control={control}
                        render={({ field: { value } }) => (
                            <>
                                <TextField size="small" className="w-full col-span-4" type="text" label='Category name'
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
                    <Button className="w-full col-span-1" variant="contained" type="submit">Add</Button>
                </div>
            </form>
        </div>
    )
}
