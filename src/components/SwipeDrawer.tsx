import { Global } from "@emotion/react";
import { Box, CssBaseline, Skeleton, styled, SwipeableDrawer, Typography } from "@mui/material"
import { grey } from "@mui/material/colors";
import { forwardRef, useImperativeHandle, useState, type ReactNode } from "react";

interface Props {
    height?: number;
    children: ReactNode;
}

export type SwipeDrawerCustomInputHandle = {
    toggleDrawer: (newOpen: boolean) => void;
}

const drawerBleeding = 0;

const Root = styled('div')(({ theme }) => ({
    height: '100%',
    backgroundColor: grey[100],
    ...theme.applyStyles('dark', {
        backgroundColor: (theme.vars || theme).palette.background.default,
    }),
}));

const StyledBox = styled('div')(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.applyStyles('dark', {
        backgroundColor: grey[800],
    }),
}));

export const SwipeDrawer = forwardRef<SwipeDrawerCustomInputHandle, Props>((props, ref) => {
    const [open, setOpen] = useState(false);
    const height = props?.height ? props?.height : 50;

    const toggleDrawer = (newOpen: boolean) => {
        setOpen(newOpen);
    };

    useImperativeHandle(ref, () => ({
        toggleDrawer
    }));

    return (
        <Root>
            <CssBaseline />
            <Global
                styles={{
                    '.MuiDrawer-root > .MuiPaper-root': {
                        height: `calc(${height}% - ${drawerBleeding}px)`,
                        overflow: 'visible',
                        borderRadius: '10px 10px 0 0',
                    },
                }}
            />
            <SwipeableDrawer
                anchor="bottom"
                open={open}
                onClose={() => toggleDrawer(false)}
                onOpen={() => toggleDrawer(true)}
                swipeAreaWidth={drawerBleeding}
                disableSwipeToOpen={false}
                keepMounted
                ModalProps={{
                    className: 'app-drawer',
                }}
                slotProps={{
                    backdrop: { style: { position: 'absolute' } },
                    paper: { style: { position: 'absolute' } }
                }}

            >
                <div className="app-drawer-content">
                    {props.children}
                </div>
                <StyledBox
                    sx={{
                        position: 'absolute',
                        top: -drawerBleeding,
                        borderTopLeftRadius: 8,
                        borderTopRightRadius: 8,
                        visibility: 'visible',
                        right: 0,
                        left: 0,
                    }}
                >
                </StyledBox>
            </SwipeableDrawer>
        </Root>
    )
})