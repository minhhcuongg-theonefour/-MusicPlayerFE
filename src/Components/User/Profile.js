import { Box, Tooltip, Typography } from "@mui/joy";
import {
  Button,
  Container,
  ImageListItem,
  MenuItem,
  Stack,
  TextField,
  Menu,
  Fade,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Avatar from "@mui/joy/Avatar";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import "../../styles/Profile.css";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, selectCurrentUser } from "../../features/authSlice";
import { PhotoCamera } from "@mui/icons-material";
import { isValidImage } from "../../utils/helper";
import { useUpdateUserMutation } from "../../services/authAPIs";
import { toast } from "react-hot-toast";

export default function Profile() {
  const settings = ["Edit profile", "Change password"];
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const [isProfile, setIsProfile] = useState(true);

  const user = useSelector(selectCurrentUser);

  // console.log(user);

  const [value, setValue] = useState(user);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
    setIsProfile((prev) => !prev);
  };

  const dispatch = useDispatch();

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

  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const handleUpdateUserInfo = async () => {
    const formData = new FormData();
    formData.append("full_name", value?.full_name);

    if (avatar) {
      formData.append("image", avatar);
    }
    const v = await updateUser(formData);
    dispatch(loginSuccess({ user: v.data }));
    console.log("Form Update user:");
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    toast.success("Your profile updated");
  };

  return (
    <>
      <Box sx={{ height: "300px", backgroundColor: "#212121", padding: 4 }}>
        <div className="box">
          <Stack direction="row" spacing={6}>
            <Stack direction="column">
              <Avatar
                sx={{ width: "150px", height: "150px" }}
                src={avatar?.preview ? avatar.preview : user?.image}
              />
              <Button
                variant="contained"
                component="label"
                sx={{
                  width: "12%",
                  height: "10%",
                  mt: 1,
                  marginLeft: 5,
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
                <PhotoCamera
                  sx={{
                    width: "200%",
                    height: "200%",
                  }}
                />
              </Button>
            </Stack>
            <Typography level="h1" sx={{ color: "#fff" }}>
              {user?.username}
            </Typography>
          </Stack>

          <Tooltip title="Open settings">
            <MoreVertIcon
              onClick={handleOpenUserMenu}
              fontSize="large"
              sx={{ color: "#fff", mt: 2 }}
            />
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <MenuItem key={setting} onClick={handleCloseUserMenu}>
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </div>
      </Box>
      <Container sx={{ mb: 16, display: "flex", justifyContent: "center" }}>
        <Stack
          spacing={2}
          sx={{
            width: "60%",
            display: "flex",
            flexWrap: "wrap",
            justifyItems: "center",
          }}
        >
          <TextField
            InputLabelProps={{ shrink: true }}
            variant="filled"
            name="username"
            placeholder="Username"
            label="Username"
            disabled
            sx={{
              marginTop: "16px",
              borderRadius: "8px",
              backgroundColor: "#fff",
              display: isProfile ? undefined : "none",
            }}
            defaultValue={user?.username}
          />

          <TextField
            InputLabelProps={{ shrink: true }}
            variant="filled"
            name="full_name"
            placeholder="Fullname"
            label="Fullname"
            sx={{
              borderRadius: "8px",
              backgroundColor: "#fff",
              display: isProfile ? undefined : "none",
            }}
            defaultValue={user?.full_name}
            onChange={(e) => setValue({ ...value, full_name: e.target.value })}
          />

          <TextField
            InputLabelProps={{ shrink: true }}
            variant="filled"
            name="email"
            placeholder="Email"
            label="Email"
            sx={{
              borderRadius: "8px",
              backgroundColor: "#fff",
              display: isProfile ? undefined : "none",
            }}
            defaultValue={user?.email}
            onChange={(e) => setValue({ ...value, email: e.target.value })}
          />
          <TextField
            InputLabelProps={{ shrink: true }}
            variant="filled"
            name="oldpassword"
            placeholder="Your old password"
            label="Old password"
            sx={{
              borderRadius: "8px",
              backgroundColor: "#fff",
              display: !isProfile ? undefined : "none",
            }}
          />

          <TextField
            InputLabelProps={{ shrink: true }}
            variant="filled"
            name="newpassword"
            placeholder="New password"
            label="New password"
            sx={{
              borderRadius: "8px",
              backgroundColor: "#fff",
              display: !isProfile ? undefined : "none",
            }}
          />

          <TextField
            InputLabelProps={{ shrink: true }}
            variant="filled"
            name="cfmpassword"
            placeholder="Confirm your password"
            label="Confirm password"
            sx={{
              borderRadius: "8px",
              backgroundColor: "#fff",
              display: !isProfile ? undefined : "none",
            }}
          />
          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              disabled={isLoading}
              sx={{
                width: "50%",
                height: "50%",
                padding: "20px",
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              onClick={handleUpdateUserInfo}
              variant="contained"
              sx={{
                padding: "20px",
                width: "50%",
                height: "50%",
                backgroundColor: "#27B7B7",
                "&:hover": {
                  backgroundColor: "#27B7B7",
                },
              }}
            >
              Save changes
            </Button>
          </Stack>
        </Stack>
      </Container>
    </>
  );
}
