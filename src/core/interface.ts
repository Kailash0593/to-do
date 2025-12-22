interface UserI {
    id: string;
    name: string;
    projects: string [];
    categorys: string [];
    isActive: boolean;
    image?: string;
}

interface ProjectI {
    id: string;
    userId: string;
    title: string;
    isActive: boolean;
    createdDate: number;
}

interface CategoryI {
    id: string;
    userId: string;
    title: string;
    createdDate: number;
}

interface TaskI {
    id: string;
    title: string;
    description: string;
    createdDate: number;
    projectId: number;
    categoryId?: number;
}

interface UserFormFieldsI {
    user: string;
}

export type { UserI, ProjectI, CategoryI, TaskI, UserFormFieldsI };