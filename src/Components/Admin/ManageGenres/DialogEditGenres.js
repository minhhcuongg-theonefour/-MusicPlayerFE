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
import { Edit } from "@mui/icons-material";
import { isValidImage } from "../../../utils/helper";
import { PhotoCamera } from "@mui/icons-material";
import {
  useGetGenreDetailsQuery,
  useUpdateGenresMutation,
} from "../../../services/genresAPIs";
import { toast } from "react-hot-toast";

export default function DialogEditGenres({ genresId }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { data, isFetching } = useGetGenreDetailsQuery(genresId);

  const [genresInfo, setGenresInfo] = useState(data);

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

  // const {data}
  const [updateGenres, { isLoading }] = useUpdateGenresMutation();

  const handleUpdateGenres = async () => {
    const formData = new FormData();
    if (genresInfo?.name) {
      formData.append("name", genresInfo?.name);
    }
    if (genresInfo.name.length == 0) {
      toast.error("Name is required");
    }
    if (genresInfo.name.length > 20) {
      toast.error("Genre name is too long");
    }

    if (avatar) {
      formData.append("image", avatar);
    }
    if (genresInfo?.name && genresInfo?.name.length < 20) {
      try {
        const v = await updateGenres({ id: genresId, formData });
        if (v.error && v.error.status === 400) {
          toast.error("Can't update genre");
        } else {
          toast.success("Genre updated");
        }
      } catch (err) {
        console.log(err.message);
      }

      handleClose();
    }
  };

  return (
    <>
      <i onClick={handleClickOpen}>
        <Edit />
      </i>
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
          Update genres
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
                src={avatar?.preview ? avatar.preview : data?.image}
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
                defaultValue={data?.name}
                onChange={(e) =>
                  setGenresInfo({ ...genresInfo, name: e.target.value })
                }
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
              onClick={handleUpdateGenres}
              disabled={isLoading}
            >
              Update
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>
    </>
  );
}
