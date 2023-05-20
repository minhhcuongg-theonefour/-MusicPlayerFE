import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { FaEllipsisH, FaHeadphones, FaCheck } from "react-icons/fa";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Box, Card, Typography } from "@mui/joy";
import { Stack, TextField, Tooltip } from "@mui/material";
import { BsMusicNoteList, BsTrash } from "react-icons/bs";

export default function ConfirmDeletePlaylistDialog({
  playlistID,
  handleDelete,
}) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    console.log("this click 2");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Tooltip title="Delete playlist">
        <i onClick={handleClickOpen}>
          <BsTrash />
        </i>
      </Tooltip>

      <Dialog
        PaperProps={{
          style: {
            backgroundColor: "#282828",
            boxShadow: "none",
            minWidth: 600,
            maxWidth: 600,
            minHeight: 130,
            maxHeight: 130,
          },
        }}
        color="#282828"
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{ minWidth: "100%", minHeight: "100%" }}
      >
        <DialogTitle sx={{ color: "#fff" }} id="alert-dialog-title">
          Are you sure you want to delete this playlist ?
        </DialogTitle>
        <DialogActions>
          <Stack
            direction="row"
            spacing={2}
            sx={{ marginBottom: 2, marginRight: 2 }}
          >
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#3498db",
                "&:hover": {
                  backgroundColor: "#27b7b7",
                },
              }}
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleDelete}
              sx={{
                backgroundColor: "#3498db",
                "&:hover": {
                  backgroundColor: "#e74c3c",
                },
              }}
            >
              Delete
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>
    </>
  );
}
