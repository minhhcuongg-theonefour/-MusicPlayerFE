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
import { useUpdatePlaylistMutation } from "../../services/playlistAPIs";
import { isValidImage } from "../../utils/helper";
import { toast } from "react-hot-toast";
import { useGetuserPlaylistQuery } from "../../services/playlistAPIs";
import { PhotoCamera } from "@mui/icons-material";

export default function RenamePlaylistDialog({ id }) {
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

  const [updatePlaylist, { isLoading }] = useUpdatePlaylistMutation();

  const { data, isFetching } = useGetuserPlaylistQuery(
    id,
    "userPlaylist",
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const [playlistInfo, setPlaylistInfo] = useState(data);

  useEffect(() => {
    setPlaylistInfo(data);
  }, [isFetching]);

  const handleUpdatePlaylist = async () => {
    const formData = new FormData();
    formData.append("name", playlistInfo?.name);

    if (avatar) {
      formData.append("image", avatar);
    }
    await updatePlaylist({ id, formData });
    toast.success("Your playlist updated");
    handleClose();
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
          Update your playlist
        </DialogTitle>
        <DialogContent>
          <Grid container>
            <Grid item xs={3} sm={5}>
              <Typography fontSize={16} sx={{ marginBottom: 1, color: "#fff" }}>
                Change your playlist photo
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
                fullWidth
                name="name"
                defaultValue={data?.name}
                onChange={(e) =>
                  setPlaylistInfo({ ...playlistInfo, name: e.target.value })
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
              onClick={handleUpdatePlaylist}
              disabled={isLoading}
            >
              Update
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>
    </div>
  );
}
