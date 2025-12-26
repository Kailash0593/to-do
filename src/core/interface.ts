interface UserI {
    id: string;
    name: string;
    isActive: boolean;
    image?: string;
}

interface ProjectI {
    id: string;
    userId: string;
    title: string;
    isActive: boolean;
    createdDate: number;
    description?: string;
}

interface CategoryI {
    id: string;
    userId: string;
    projectId: string;
    title: string;
    createdDate: number;
}

interface TaskI {
    id: string;
    title: string;
    createdDate: number;
    projectId: string;
    isCompleted: boolean;
    description?: string;
    categoryId?: string;
}

interface UserFormFieldsI {
    user: string;
}

export type { UserI, ProjectI, CategoryI, TaskI, UserFormFieldsI };