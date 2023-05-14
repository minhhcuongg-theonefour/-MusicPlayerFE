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
import { Stack, TextField } from "@mui/material";

export default function ConfirmDeletePlaylistDialog() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="breadCrump">
      <i onClick={handleClickOpen}>
        <FaEllipsisH />
      </i>
      <Dialog
        PaperProps={{
          style: {
            backgroundColor: "#282828",
            boxShadow: "none",
            minWidth: 600,
            maxWidth: 600,
            minHeight: 400,
            maxHeight: 400,
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
          Delete this playlist from your library ?
        </DialogTitle>
        <DialogContent>
          <Grid container>
            <Grid item xs={3} sm={5}>
              <Typography fontSize={16} sx={{ marginBottom: 1, color: "#fff" }}>
                This will delete the ## from your library
              </Typography>
              <img
                style={{
                  width: "200px",
                  height: "200px",
                }}
                src={
                  avatar?.preview
                    ? avatar.preview
                    : "https://res.cloudinary.com/doqhasjec/image/upload/v1683789765/B2CDMusic/defaultPlaylist_vco9j8.png"
                }
              />
              <input
                style={{
                  color: "#fff",
                }}
                // hidden
                // accept="image/*"
                type="file"
                onChange={handlePreviewAvatar}
              />
            </Grid>
            <Grid item xs={3} sm={7}>
              <TextField
                sx={{
                  mt: 8,
                  display: "flex",
                  justifyContent: "center",
                  backgroundColor: "#fff",
                  borderRadius: 5,
                }}
                fullWidth
                value={"#This is the name of the playlist"}
              ></TextField>
            </Grid>
          </Grid>
        </DialogContent>
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
              Disagree
            </Button>
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
              Update
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>
    </div>
  );
}
