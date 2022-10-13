import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { useTypesQuery, useDeleteTypesMutation } from "../../services/typesApi";
import { Button, Typography } from "@mui/material";
import AddTypesModal from "./AddTypeModal";
import UpdateTypeModal from "./UpdateTypeModal";

const Dashboard = () => {
  const { data, error, isLoading, isSuccess } = useTypesQuery();
  const [deleteTypes] = useDeleteTypesMutation();
  const [open, setOpen] = React.useState(false);
  const [updateOpen, setUpdateOpen] = React.useState(false);
  const [editData, setEditData] = React.useState({});

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleUpdateOpen = () => {
    setUpdateOpen(true);
  };
  const handleUpdateClose = () => {
    setUpdateOpen(false);
  };
  const handleDelete = (ids) => {
    const formIDs = new FormData();
    let idsarray = [ids];
    formIDs.append("ids[]", idsarray);
    formIDs.append("_method", "delete");
    deleteTypes(formIDs);
  };
  const handleUpdate = (row) => {
    setEditData(row);
    setUpdateOpen(true);
  };
  if (isLoading) {
    return <div>Loading</div>;
  }
  if (error) {
    return <div>An error occured</div>;
  }
  return (
    <>
      {isSuccess && (
        <>
          <Box
            component="div"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 1,
            }}
          >
            <Typography variant="h5">Types</Typography>

            <Button variant="outlined" onClick={handleClickOpen}>
              Add new Types
            </Button>
          </Box>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell align="right">Image</TableCell>
                  <TableCell align="right">Company ID</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.data.type.data.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell>{row.description}</TableCell>
                    <TableCell align="right">
                      <img src={row.image} width="50" />
                    </TableCell>
                    <TableCell align="right">{row.company_id}</TableCell>
                    <TableCell align="center">
                      <Button onClick={() => handleDelete(row.id)}>
                        Delete
                      </Button>
                      <Button onClick={() => handleUpdate(row)}>Update</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
      <AddTypesModal handleClose={handleClose} open={open} />
      <UpdateTypeModal handleClose={handleUpdateClose} open={updateOpen} data={editData} />
    </>
  );
};

export default Dashboard;
