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
import { isValidImage } from "../../../utils/helper";
import { toast } from "react-hot-toast";
import { PhotoCamera } from "@mui/icons-material";
import { useAddGenresMutation } from "../../../services/genresAPIs";

export default function DialogCreateNewGenres() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //clear prev avatar in cache
  const [avatar, setAvatar] = useState("");
  useEffect(() => {
    return () => {
      avatar && URL.revokeObjectURL(avatar.preview);
    };
  }, [avatar]);

  //preview image for user
  const handlePreviewAvatar = (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    if (isValidImage(file)) {
      file.preview = URL.createObjectURL(file);
      setAvatar(file);
    } else {
      toast.error("Only png, jpeg, jpg accepted");
    }
  };

  const [addGenres, { isLoading }] = useAddGenresMutation();

  const [genreName, setGenreName] = useState("");

  const handleAddGenres = async () => {
    const formData = new FormData();
    formData.append("name", genreName);
    if (avatar) {
      formData.append("image", avatar);
    }

    console.log("Form Add Genres:");
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    await addGenres(formData);
    toast.success("Created new genres");
    handleClose();
  };
  return (
    <>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        sx={{
          my: 1,
          backgroundColor: "#3498db",
          "&:hover": {
            backgroundColor: "#27b7b7",
          },
        }}
      >
        Create new genre
      </Button>
      <Dialog
        PaperProps={{
          style: {
            backgroundColor: "#282828",
            boxShadow: "none",
            minWidth: 650,
            maxWidth: 650,
            minHeight: 420,
            maxHeight: 420,
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
          Create a new genre
        </DialogTitle>
        <DialogContent>
          <Grid container>
            <Grid item xs={3} sm={5}>
              <Typography fontSize={16} sx={{ marginBottom: 1, color: "#fff" }}>
                Select image for genres
              </Typography>

              <img
                style={{
                  width: "200px",
                  height: "200px",
                }}
                src={avatar?.preview}
              />
              <Button
                variant="contained"
                component="label"
                sx={{
                  width: "12%",
                  backgroundColor: "#3498db",
                  "&:hover": {
                    backgroundColor: "#27b7b7",
                  },
                }}
              >
                <input
                  style={{
                    color: "#fff",
                    borderRadius: 2,
                  }}
                  hidden
                  // accept="image/*"
                  type="file"
                  onChange={handlePreviewAvatar}
                />
                <PhotoCamera />
              </Button>
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
                placeholder="Name of the genre"
                fullWidth
                name="name"
                onChange={(e) => setGenreName(e.target.value)}
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
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#3498db",
                "&:hover": {
                  backgroundColor: "#27b7b7",
                },
              }}
              onClick={handleAddGenres}
              disabled={isLoading}
            >
              Create
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>
    </>
  );
}
