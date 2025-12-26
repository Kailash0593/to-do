import { useProject } from '../core/contexts/ProjectContext'
import { useUser } from '../core/contexts/UserContext';
import { Project } from './project/Project'
import { Task } from './task/Task';
import { UsersList } from './user/UsersList';

export const Dashboard = () => {
    const { project } = useProject();
    const { showAllUsers, user } = useUser();

    console.log("user", user)

    return (
        <>
            {(showAllUsers || !user) ? <UsersList /> : !project ? <Project /> : <Task />}
        </>
    )
}
