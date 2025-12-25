import { Menu, MenuItem } from "@mui/material"
import React, { forwardRef, useImperativeHandle } from "react";
import AddIcon from '@mui/icons-material/Add';

interface Props {
    onAddTask: () => void;
    onAddCategory: () => void
}

export type TaskAddActionMenuCustomInputHandle = {
    open: (el: any) => void
}

export const TaskAddActionMenu = forwardRef<TaskAddActionMenuCustomInputHandle, Props>((props, ref) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);


    const handleClose = () => {
        setAnchorEl(null);
    };

    const onAddTask = () => {
        props.onAddTask();
        handleClose();
    }

    const onAddCategory = () => {
        props.onAddCategory();
        handleClose();
    }

    useImperativeHandle(ref, () => ({
        open: (el: any) => {
            console.log("open")
            setAnchorEl(el)
        }
    }));

    return (
        <>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={() => setAnchorEl(null)}
                slotProps={{
                    paper: {
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            ml: -0.8,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&::before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                bottom: -10,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    },
                }}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
            >
                <MenuItem onClick={onAddTask}>
                    <AddIcon /> Add task
                </MenuItem>
                <MenuItem onClick={onAddCategory}>
                    <AddIcon /> Add Category
                </MenuItem>
            </Menu>
        </>
    )
})
