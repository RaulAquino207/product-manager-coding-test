import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import React from "react";

interface CustomModalProps {
    open: boolean;
    onClose: () => void;
    title: string;
    actions: { label: string, onClick: () => void, props?: object }[];
    children: React.ReactNode; 
  }

  // [COMMENT] This component is a custom modal that can be used to display a dialog box with a title, content, and actions.
  
  const CustomModal: React.FC<CustomModalProps> = ({ open, onClose, title, actions, children }) => {
    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          {children}
        </DialogContent>
        <DialogActions>
          {actions.map((action, index) => (
            <Button key={index} onClick={action.onClick} {...action.props}>
              {action.label}
            </Button>
          ))}
        </DialogActions>
      </Dialog>
    );
  };
  
  export default CustomModal;