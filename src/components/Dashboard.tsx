import { useProject } from '../core/contexts/ProjectContext'
import { Project } from './project/Project'
import { Task } from './task/Task';

export const Dashboard = () => {
    const { project } = useProject();
    return (
        <>  
            {!project ? <Project /> : <Task />}
        </>
    )
}
