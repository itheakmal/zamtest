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
// import { useAddTypesMutation } from "../../services/typesApi";
import { useUpdateTypesMutation } from "../../services/typesApi";
export default function UpdateTypeModal(props) {
  const [updateTypes] = useUpdateTypesMutation();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (data.get('image').name === "") {
      data.delete('image');
    }
    data.append("_method", "put");
    data.append("id", props.data.id);
    await updateTypes(data);
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
              defaultValue={props.data.name}
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
              defaultValue={props.data.description}
            />
            <img src={props.data.image} width="50" />
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
            <Button type="submit">Update</Button>
          </DialogActions>
        </Box>
      </Dialog>
    </div>
  );
}
