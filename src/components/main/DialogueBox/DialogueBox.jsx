  import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, ThemeProvider, createTheme, alpha, Slide } from "@mui/material";
  import React, { useEffect, useRef, forwardRef } from 'react';
  import ReactDOM from "react-dom";

  // Enhanced theme with more design options
  const theme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#3f51b5", // Modern indigo color
        light: "#757de8",
        dark: "#002984",
        contrastText: "#ffffff",
      },
      secondary: {
        main: "#f50057", // Accent pink color
        light: "#ff4081",
        dark: "#c51162",
        contrastText: "#ffffff",
      },
      background: {
        paper: "#ffffff",
      },
      text: {
        primary: "#212121",
        secondary: "#757575",
      },
    },
    typography: {
      fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
      h6: {
        fontWeight: 600,
      },
      body1: {
        fontSize: "1rem",
      },
    },
    shape: {
      borderRadius: 8,
    },
    shadows: [
      "none",
      // Custom shadow for dialogs (index 24)
      ...Array(23).fill("none"),
      "0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12)",
    ],
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none", // No uppercase for buttons
            padding: "8px 22px",
            fontSize: "0.9375rem",
          },
          containedPrimary: {
            boxShadow: "0 3px 5px 2px rgba(63, 81, 181, .15)",
            "&:hover": {
              boxShadow: "0 5px 8px 2px rgba(63, 81, 181, .2)",
            },
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            borderRadius: 12,
            padding: "8px",
            minWidth: "300px",
          },
        },
      },
    },
  });

  const AlertType = {
    ALERT: "ALERT",
    CONFIRM: "CONFIRM",
    SUCCESS: "SUCCESS",
    ERROR: "ERROR",
    WARNING: "WARNING",
    INFO: "INFO"
  };

  // Custom transition for dialog
  const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const rootID = "alert-dialog";
  let returnResponse;

  const getIconByType = (type) => {
    switch (type) {
      case AlertType.SUCCESS:
        return "✅";
      case AlertType.ERROR:
        return "❌";
      case AlertType.WARNING:
        return "⚠️";
      case AlertType.INFO:
        return "ℹ️";
      default:
        return null;
    }
  };

  const AlertRoot = ({ message, title, type, confirmText = "OK", cancelText = "Cancel" }) => {
    const root = useRef(null);

    useEffect(() => {
      root.current = document.getElementById(rootID);
      return () => {
        // Cleanup on unmount
      };
    }, []);

    const Close = () => {
      setTimeout(() => {
        if (root.current) {
          ReactDOM.unmountComponentAtNode(root.current);
          root.current.remove();
        }
      }, 300);
    };

    const Confirm = () => {
      if ([AlertType.CONFIRM, AlertType.WARNING].includes(type)) {
        returnResponse(true);
      }
      Close();
    };

    const Cancel = () => {
      if ([AlertType.CONFIRM, AlertType.WARNING].includes(type)) {
        returnResponse(false);
      }
      Close();
    };

    // Determine background color based on alert type
    let backgroundColor = theme.palette.background.paper;
    let titleColor = theme.palette.text.primary;
    let buttonColor = "primary";

    switch (type) {
      case AlertType.SUCCESS:
        backgroundColor = alpha(theme.palette.success.light, 0.1);
        titleColor = theme.palette.success.dark;
        buttonColor = "success";
        break;
      case AlertType.ERROR:
        backgroundColor = alpha(theme.palette.error.light, 0.1);
        titleColor = theme.palette.error.dark;
        buttonColor = "error";
        break;
      case AlertType.WARNING:
        backgroundColor = alpha(theme.palette.warning.light, 0.1);
        titleColor = theme.palette.warning.dark;
        buttonColor = "warning";
        break;
      case AlertType.INFO:
        backgroundColor = alpha(theme.palette.info.light, 0.1);
        titleColor = theme.palette.info.dark;
        buttonColor = "info";
        break;
      default:
        break;
    }

    const icon = getIconByType(type);

    return (
      <ThemeProvider theme={theme}>
        <Dialog 
          onClose={Cancel} 
          open={true} 
          disablePortal 
          TransitionComponent={Transition}
          PaperProps={{
            style: {
              backgroundColor,
              overflow: "visible"
            }
          }}
        >
          <DialogTitle 
            sx={{ 
              fontWeight: 'bold', 
              textAlign: 'center',
              color: titleColor,
              pt: 3,
              pb: icon ? 1 : 2
            }}
          >
            {icon && <div style={{ fontSize: '2rem', marginBottom: '8px' }}>{icon}</div>}
            {title}
          </DialogTitle>
          <DialogContent>
            <DialogContentText 
              sx={{ 
                textAlign: 'center', 
                fontSize: '1rem', 
                padding: '10px',
                color: theme.palette.text.secondary,
                maxWidth: '400px'
              }}
            >
              {message}
            </DialogContentText>
          </DialogContent>
          <DialogActions 
            sx={{ 
              justifyContent: 'center', 
              padding: '16px 24px 24px',
              gap: 2
            }}
          >
            {type === AlertType.CONFIRM && (
              <Button 
                variant="outlined"
                onClick={Cancel} 
                sx={{ 
                  borderRadius: theme.shape.borderRadius * 3,
                  fontWeight: 500,
                  minWidth: '100px'
                }}
              >
                {cancelText}
              </Button>
            )}
            <Button 
              variant="contained" 
              color={buttonColor}
              onClick={Confirm} 
              sx={{ 
                borderRadius: theme.shape.borderRadius * 3,
                fontWeight: 500,
                minWidth: '100px'
              }}
            >
              {confirmText}
            </Button>
          </DialogActions>
        </Dialog>
      </ThemeProvider>
    );
  };

  const Create = (message, title, type = AlertType.ALERT, confirmText = "OK", cancelText = "Cancel") => {
    let div = document.getElementById(rootID);
    if (!div) {
      div = document.createElement("div");
      div.id = rootID;
      document.body.appendChild(div);
    }

    ReactDOM.render(
      <AlertRoot 
        message={message} 
        title={title} 
        type={type} 
        confirmText={confirmText}
        cancelText={cancelText}
      />, 
      div
    );
  };

  export const Confirm = (message, title = "Confirm", confirmText = "OK", cancelText = "Cancel") => {
    Create(message, title, AlertType.CONFIRM, confirmText, cancelText);
    return new Promise(resolve => {
      returnResponse = resolve;
    });
  };

  export const Alert = (message, title = "Alert") => {
    Create(message, title, AlertType.ALERT);
  };

  export const Success = (message, title = "Success") => {
    Create(message, title, AlertType.SUCCESS);
  };

  export const Error = (message, title = "Error") => {
    Create(message, title, AlertType.ERROR);
  };

  export const Warning = (message, title = "Warning", confirmText = "Yes", cancelText = "No") => {
    Create(message, title, AlertType.WARNING, confirmText, cancelText);
    return new Promise(resolve => {
      returnResponse = resolve;
    });
  };

  export const Info = (message, title = "Information") => {
    Create(message, title, AlertType.INFO);
  };