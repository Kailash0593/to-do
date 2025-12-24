import { Box, Card, CardContent, CircularProgress, IconButton, Typography } from '@mui/material'
import type { ProjectI } from '../core/interface'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


interface Props {
    project: ProjectI
}

export const ProjectCard = (props: Props) => {
    const { project } = props;
    const descriptionLength = 40;
    const description = project.description ? project.description.length>descriptionLength ? `${project.description.substring(0, descriptionLength)}...` : project.description : '';
    return (
        <Card key={project.id} className='mb-2'>
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
                                    <CircularProgress variant='determinate' size={50} value={100} />
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
                                        >{`20%`}

                                        </Typography>
                                    </Box>
                                </Box>
                            </div>
                            <div className='col-span-1'>
                                <div className='grid grid-rows-2 items-center justify-center'>
                                    <div>
                                        <IconButton className='p-1!' aria-label="delete">
                                            <DeleteIcon />
                                        </IconButton>
                                    </div>
                                    <div>
                                        <IconButton className='p-1!' aria-label="delete">
                                            <EditIcon />
                                        </IconButton>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
