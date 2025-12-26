import { Box, Card, CardActionArea, CardContent, CircularProgress, IconButton, Typography } from '@mui/material'
import type { ProjectI } from '../../core/interface'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import useCRUDTasks from '../../core/hooks/useCRUDTasks';


interface Props {
    isSelected: string;
    project: ProjectI;
    onCardClick: (id: string) => void
    onDeleteClick: (id: ProjectI) => void
    onEditClick: (id: ProjectI) => void
}

export const ProjectCard = (props: Props) => {
    const { allTasks } = useCRUDTasks();
    const { project, isSelected } = props;
    const descriptionLength = 40;
    const description = project.description ? project.description.length > descriptionLength ? `${project.description.substring(0, descriptionLength)}...` : project.description : '';

    const onDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        props.onDeleteClick(project);
        e.stopPropagation();
    }

    const onEditClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        props.onEditClick(project);
        e.stopPropagation();
    }

    const taskStatus = () => {
        const tasks = allTasks();
        const projectTasks = tasks.filter(t => t.projectId === props.project.id);
        const isCompleted = projectTasks.filter(t => t.isCompleted);

        if (projectTasks.length > 0) {
            return {
                completed: isCompleted.length,
                total: projectTasks.length,
                percent: (isCompleted.length/projectTasks.length)*100
            }
        }

        return {
            completed: 0,
            total: 0,
            percent: 0
        }
    }

    const { completed, total, percent } = taskStatus();

    return (
        <Card key={project.id} className='mb-2'>
            <CardActionArea
                component="div"
                data-active={isSelected === project.id ? '' : undefined}
                onClick={() => props.onCardClick(project.id)}
                sx={{
                    height: '100%',
                    '&[data-active]': {
                        backgroundColor: 'action.selected',
                        '&:hover': {
                            backgroundColor: 'action.selectedHover',
                        },
                    },
                }}
            >
                <CardContent sx={{ height: '100%' }} className='px-3! py-2!'>
                    <div className='grid grid-flow-col grid-cols-8'>
                        <div className='col-span-6'>
                            <h1 className='text-2xl'>{project.title}</h1>
                            {
                                description && <p className='text-sm' >{description}</p>
                            }
                        </div>
                        <div className='col-span-2 flex items-center justify-end'>
                            <div className='grid grid-cols-3'>
                                <div className='col-span-2 flex items-center justify-end'>
                                    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                                        <CircularProgress enableTrackSlot variant='determinate' size={50} value={percent} />
                                        <Box
                                            sx={{
                                                top: 0,
                                                left: 0,
                                                bottom: 0,
                                                right: 0,
                                                position: 'absolute',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <Typography
                                                variant="caption"
                                                component="div"
                                                sx={{ color: 'text.secondary' }}
                                                className='text-[10px]!'
                                            >{total > 0 ? `${completed}/${total}` : '0'}

                                            </Typography>
                                        </Box>
                                    </Box>
                                </div>
                                <div className='col-span-1'>
                                    <div className='grid grid-rows-2 items-center justify-center'>
                                        <div>
                                            <IconButton className='p-1!' aria-label="delete" onClick={(e) => {
                                                e.stopPropagation();
                                                onDeleteClick(e);
                                            }} >
                                                <DeleteIcon />
                                            </IconButton>
                                        </div>
                                        <div>
                                            <IconButton className='p-1!' aria-label="edit" onClick={(e) => {
                                                e.stopPropagation();
                                                onEditClick(e);
                                            }}>
                                                <EditIcon />
                                            </IconButton>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}
