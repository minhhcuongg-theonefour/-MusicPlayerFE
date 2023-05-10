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

export default function Profile() {
  const settings = ["Edit profile", "Change password"];
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const [isProfile, setIsProfile] = useState(true);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };


  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
    setIsProfile(prev => !prev);
  };

  const [avatar, setAvatar] = useState();
  useEffect(() => {
    return () => {
      avatar && URL.revokeObjectURL(avatar.preview);
    };
  }, [avatar]);
  const handlePreviewAvatar = (e) => {
    const file = e.target.files[0];
    file.preview = URL.createObjectURL(file);
    setAvatar(file);
    console.log(URL.createObjectURL(file));
  };

  return (
    <>
      <Box sx={{ height: "300px", backgroundColor: "#212121", padding: 4 }}>
        <div className="box">
          <Stack direction="row" spacing={6}>
            <Avatar sx={{ width: "150px", height: "150px" }} src="" />
            <Typography level="h1" sx={{ color: "#fff" }}>
              Username
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
            name="firstName"
            placeholder="First Name"
            label="First Name"
            sx={{
              marginTop: "16px",
              borderRadius: "8px",
              backgroundColor: "#fff",
              display: isProfile ? undefined : "none",
            }}
          />

          <TextField
            InputLabelProps={{ shrink: true }}
            variant="filled"
            name="lastName"
            placeholder="Last Name"
            label="Last Name"
            sx={{
              borderRadius: "8px",
              backgroundColor: "#fff",
              display: isProfile ? undefined : "none",
            }}
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
