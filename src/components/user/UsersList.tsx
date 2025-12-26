import { Avatar, Box, Card, CardActionArea, CardContent, Fab, IconButton, Paper, Typography } from "@mui/material";
import useCRUDUser from "../../core/hooks/useCRUDUser"
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import { SwipeDrawer, type SwipeDrawerCustomInputHandle } from "../common/SwipeDrawer";
import { useRef } from "react";
import { UserForm } from "./UserForm";
import type { UserI } from "../../core/interface";
import { useUser } from "../../core/contexts/UserContext";
import DeleteIcon from '@mui/icons-material/Delete';
import { AlertDialog, type AlertDialogCustomInputHandle } from "../common/AlertDialog";
import { useProject } from "../../core/contexts/ProjectContext";
import useCRUDProject from "../../core/hooks/useCRUDProject";


export const UsersList = () => {
    const { setUser, setShowAllUsers } = useUser();
    const { setProjects } = useProject();
    const crudUser = useCRUDUser();
    const crudProject = useCRUDProject();
    const allUsers = crudUser.allUsers();
    const swipeableDrawerRef = useRef<SwipeDrawerCustomInputHandle>(null);
    const commonDialogRef = useRef<AlertDialogCustomInputHandle>(null);

    console.log("allUsers", allUsers)

    const addNewUser = () => {
        swipeableDrawerRef.current?.toggleDrawer(true);
    }

    const onFormSubmit = (user: UserI) => {
        crudUser.create(user);
        swipeableDrawerRef.current?.toggleDrawer(false);
    }

    const onUserSelect = (user: UserI) => {
        swipeableDrawerRef.current?.toggleDrawer(false);
        crudUser.selectUser(user);
        setUser(user);
        crudProject.setProjectsForUser(user.id);
        setShowAllUsers(false);
    }

    const onUserDelete = (user: UserI) => {
        commonDialogRef.current?.setTitle("Delete user");
        commonDialogRef.current?.setDescription(`Are you sure you want to delete ${user.name}, all projects and tasks will be lost forever?`);
        commonDialogRef.current?.confirm().then(() => {
            setUser(undefined);
            crudUser.remove(user.id);
        });
        commonDialogRef.current?.open();
        console.log("onDeleteClick");
    }

    return (
        <div>
            <h1 className="text-center text-4xl p-2">Users</h1>
            <div className="grid grid-cols-2 p-4 gap-4">
                {
                    allUsers.map(u => (
                        <Card key={u.id} className="w-full rounded-b-xl">
                            <CardActionArea
                                component="div"
                                data-active={u.isActive ? '' : undefined}
                                onClick={() => onUserSelect(u)}
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
                                <CardContent>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            gap: 2,
                                            py: 1
                                        }}
                                    >
                                        <Avatar
                                            sx={{
                                                bgcolor: 'primary.main',
                                                width: 64,
                                                height: 64
                                            }}
                                        >
                                            <PersonIcon sx={{ fontSize: 40 }} />
                                        </Avatar>

                                        <Typography
                                            variant="h6"
                                            component="div"
                                            sx={{ fontWeight: 'bold', textAlign: 'center' }}
                                        >
                                            {u.name}
                                        </Typography>
                                        <IconButton className='p-1! absolute! top-0 right-0' aria-label="edit" onClick={(e) => {
                                            e.stopPropagation();
                                            onUserDelete(u);
                                        }}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Box>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    ))
                }
            </div>
            <Fab color='primary' className='absolute! right-4 bottom-4' >
                <AddIcon onClick={addNewUser} />
            </Fab>
            <SwipeDrawer ref={swipeableDrawerRef} >
                <div className="p-2">
                    <h1 className="text-2xl p-4 text-center">Create User</h1>
                    <UserForm onFormSubmit={onFormSubmit} ></UserForm>
                </div>
            </SwipeDrawer>
            <AlertDialog
                ref={commonDialogRef}
            ></AlertDialog>
        </div>
    )
}
