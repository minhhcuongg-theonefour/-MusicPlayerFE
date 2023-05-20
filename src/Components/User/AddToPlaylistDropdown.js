import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Fade from "@mui/material/Fade";
import { BsThreeDotsVertical } from "react-icons/bs";
import MenuItem from "@mui/material/MenuItem";
import {
  useGetPlaylistQuery,
  useAddSongToPlaylistMutation,
} from "../../services/playlistAPIs";

function AddToPlaylist({ song }) {
  const { data: playlistUser, isFetching: playlistUserFetching } =
    useGetPlaylistQuery("userPlaylist", {
      refetchOnMountOrArgChange: true,
    });

  const [addSongToPlaylist] = useAddSongToPlaylistMutation();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  const handleAddToPlaylist = async (event, playlistId, songId) => {
    setAnchorEl(null);
    event.stopPropagation();
    await addSongToPlaylist({ id_playlist: playlistId, id_song: songId });
  };

  const handleClose = (event) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  return (
    <>
      <div>
        <IconButton
          sx={{ color: "#fff" }}
          id="fade-button"
          aria-controls={open ? "fade-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <BsThreeDotsVertical />
        </IconButton>
        <Menu
          PaperProps={{
            style: {
              backgroundColor: "#3e3e3e",
              boxShadow: "none",
              minWidth: 180,
              maxWidth: 180,
            },
          }}
          id="fade-menu"
          MenuListProps={{
            "aria-labelledby": "fade-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          TransitionComponent={Fade}
        >
          <Typography
            fontSize="30"
            weight="medium"
            color="#fff"
            sx={{ display: "flex", justifyContent: "center" }}
          >
            Add to
          </Typography>
          {playlistUser?.map((item) => (
            <MenuItem
              sx={{
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#27b7b7",
                },
                minWidth: 180,
                maxWidth: 180,
              }}
              onClick={(e) => handleAddToPlaylist(e, item?.id, song?.id)}
            >
              <Typography
                sx={{
                  mb: 0.1,
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                }}
              >
                {item?.name}
              </Typography>
            </MenuItem>
          ))}
        </Menu>
      </div>
    </>
  );
}

export default AddToPlaylist;
