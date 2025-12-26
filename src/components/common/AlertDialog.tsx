import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface Props {
    onDecline?: () => void;
}

export type AlertDialogCustomInputHandle = {
    open: () => void;
    setTitle: (title: string) => void;
    setDescription: (description: string) => void;
    confirm: () => Promise<void>
}

export const AlertDialog = React.forwardRef<AlertDialogCustomInputHandle, Props>((props: Props, ref) => {
    const [open, setOpen] = React.useState(false);
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [confirm, setConfirm] = React.useState<(value: void | PromiseLike<void>) => void>();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onDeclineClick = () => {
        handleClose();
        if(props.onDecline){
            props?.onDecline();
        }
    }

    const onConfirmClick = () => {
        console.log("onConfirmClick")
        handleClose();
        if(confirm){
            confirm();
        }
    }

    React.useImperativeHandle(ref, () => ({
        open: handleClickOpen,
        setTitle: setTitle,
        setDescription: setDescription,
        confirm: () => {
            return new Promise<void>((resolve) => {
                setConfirm(() => resolve);
            });
        }
    }));

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {description}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onDeclineClick}>No</Button>
                <Button onClick={onConfirmClick} autoFocus>Yes</Button>
            </DialogActions>
        </Dialog>
    );
})
