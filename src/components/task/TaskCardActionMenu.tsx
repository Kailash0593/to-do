import { Menu, MenuItem } from "@mui/material"
import React, { forwardRef, useImperativeHandle } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

interface Props {

}

export type TaskCardActionMenuCustomInputHandle = {
    open: (el: any) => void
}

export const TaskCardActionMenu = forwardRef<TaskCardActionMenuCustomInputHandle, Props>((props, ref) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);


    const handleClose = () => {
        setAnchorEl(null);
    };

    useImperativeHandle(ref, () => ({
        open: (el: any) => {
            setAnchorEl(el)
        }
    }));

    return (
        <>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                slotProps={{    
                    paper: {
                        elevation: 0,
                        sx: {
                            pointerEvents: 'auto',
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
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
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    }
                }}
                
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={handleClose}>
                    <EditIcon /> Edit
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <DeleteIcon /> Delete
                </MenuItem>
            </Menu>
        </>
    )
})
