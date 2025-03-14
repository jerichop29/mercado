import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, ThemeProvider, createTheme } from "@mui/material";
import React, { useEffect, useRef } from 'react';
import ReactDOM from "react-dom";

const theme = createTheme({
    palette: {
        mode: "dark"
    }
});

const AlertType = {
    ALERT: "ALERT",
    CONFIRM: "CONFIRM"
};

const rootID = "alert-dialog";
let returnResponse;

const AlertRoot = ({ message, title, type }) => {
    const root = useRef(null);

    useEffect(() => {
        root.current = document.getElementById(rootID);
    }, []);

    const Close = () => {
        root.current?.remove();
    };

    const Confirm = () => {
        if (type === AlertType.CONFIRM) {
            returnResponse(true);
        }
        Close();
    };

    const Cancel = () => {
        if (type === AlertType.CONFIRM) {
            returnResponse(false);
        }
        Close();
    };

    return (
        <ThemeProvider theme={theme}>
            <Dialog onClose={Cancel} open={true} disablePortal>
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{message}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color="secondary" onClick={Confirm}>OK</Button>
                    {type === AlertType.CONFIRM && <Button onClick={Cancel}>Cancel</Button>}
                </DialogActions>
            </Dialog>
        </ThemeProvider>
    );
};

const Create = (message, title, type = AlertType.ALERT) => {
    let div = document.getElementById(rootID);
    if (!div) {
        div = document.createElement("div");
        div.id = rootID;
        document.body.appendChild(div);
    }

    ReactDOM.render(
        <AlertRoot message={message} title={title} type={type} />, 
        div
    );
};

export const Confirm = (message, title = "Confirm") => {
    Create(message, title, AlertType.CONFIRM);
    return new Promise(resolve => {
        returnResponse = resolve;
    });
};

export const Alert = (message, title = "Alert") => {
    Create(message, title, AlertType.ALERT);
};
