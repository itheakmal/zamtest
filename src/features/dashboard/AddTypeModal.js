import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Box from "@mui/material/Box";
import { useAddTaskMutation } from "../../services/typesApi";
export default function AddTypeModal(props) {
  const [addTask, result] = useAddTaskMutation();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    await addTask(data);
    props.handleClose();
  };
  
  return (
    <div>
      <Dialog open={props.open} onClose={props.handleClose}>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <DialogTitle>Types</DialogTitle>
          <DialogContent>
            <DialogContentText>Please Add Types</DialogContentText>

            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              type="text"
              name="name"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              multiline
              id="description"
              label="Description"
              type="text"
              name="description"
              fullWidth
              variant="standard"
            />
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="label"
            >
              <input name="image" hidden accept="image/*" type="file" />
              <PhotoCamera />
            </IconButton>
          </DialogContent>
          <DialogActions>
            <Button onClick={props.handleClose}>Cancel</Button>
            <Button type="submit">Add</Button>
          </DialogActions>
        </Box>
      </Dialog>
    </div>
  );
}
