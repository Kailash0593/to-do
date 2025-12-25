import { Card, CardActionArea, CardContent, Chip, IconButton } from '@mui/material'
import type { TaskI } from '../../core/interface'
import { TaskCardActionMenu, type TaskCardActionMenuCustomInputHandle } from './TaskCardActionMenu';
import { useRef } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface Props {
    task: TaskI;
    onCardClick: (id: TaskI) => void
    onDeleteClick: (task: TaskI) => void
    onEditClick: (task: TaskI) => void
}

export const TaskCard = (props: Props) => {
    const { task } = props;
    const descriptionLength = 40;
    const description = task.description ? task.description.length > descriptionLength ? `${task.description.substring(0, descriptionLength)}...` : task.description : '';
    const taskCardActionMenuRef = useRef<TaskCardActionMenuCustomInputHandle>(null);

    const onCardMenuOverflowClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        taskCardActionMenuRef.current?.open(e.currentTarget);
        e.stopPropagation();
    }

    return (
        <>
            <Card key={task.id} className='mb-2'>
                <CardActionArea
                    component="div"
                    onClick={() => props.onCardClick(task)}
                >
                    <CardContent sx={{ height: '100%' }} className='px-3! py-2!'>
                        <div className='grid grid-flow-col grid-cols-8'>
                            <div className='col-span-6'>
                                <h1 className={`text-2xl ${task.isCompleted && 'line-through'}`}>
                                    {task.title}
                                </h1>
                                {
                                    description && <p className='text-sm' >{description}</p>
                                }
                            </div>
                            <div className='col-span-2 flex items-center justify-end'>
                                <div className='flex flex-col items-end'>
                                    <div>
                                        <IconButton className='p-1!' aria-label="delete" onClick={(e) => {
                                            e.stopPropagation();
                                            onCardMenuOverflowClick(e);
                                        }} >
                                            <MoreVertIcon />
                                        </IconButton>
                                    </div>
                                    <div>
                                        <Chip
                                            label={ task.isCompleted ? 'Completed' : 'To do' }
                                            color={task.isCompleted ? 'success' : 'warning'}
                                            size='small'
                                            sx={{
                                                fontSize: "10px",
                                                height: "20px"
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </CardActionArea>
            </Card>
            <TaskCardActionMenu
                ref={taskCardActionMenuRef}
            ></TaskCardActionMenu>
        </>
    )
}
