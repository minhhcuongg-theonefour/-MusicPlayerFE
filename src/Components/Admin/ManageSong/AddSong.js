import {
  Autocomplete,
  Box,
  Button,
  Container,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { isValidImage } from "../../../utils/helper";
import { toast } from "react-hot-toast";
import { PhotoCamera } from "@mui/icons-material";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import { useGetGenresQuery } from "../../../services/genresAPIs";
import { useAddSongMutation } from "../../../services/songAPIs";

export default function AddSong() {
  const [genresArr, setGenresArr] = useState([]);
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

  //select song file

  const [songFile, setSongFile] = useState("");

  const [otherInfo, setOtherInfo] = useState({
    name: "",
    singer: "",
  });

  //preview song file
  const handlePreviewSongfile = (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    file.preview = URL.createObjectURL(file);
    setSongFile(file);
  };

  const { data: genres, isFetching: genresFetching } = useGetGenresQuery(
    "AllGenres",
    { refetchOnMountOrArgChange: true }
  );
  const [addSong, { isLoading }] = useAddSongMutation();

  const audioRef = useRef(null);

  const handleSubmit = async () => {
    const formData = new FormData();
    if (audioRef.current?.duration) {
      formData.append("duration", Math.floor(audioRef.current.duration));
    }

    formData.append("file", songFile);
    formData.append("image", avatar);
    genresArr.forEach((el) => formData.append("genres", el));
    formData.append("name", otherInfo.name);
    formData.append("singer", otherInfo.singer);

    await addSong(formData);

    toast.success("New song created");
  };

  return (
    <>
      <Container sx={{ display: "flex", justifyContent: "center" }}>
        <Box>
          <Typography variant="h5">Create new song</Typography>
          <Stack sx={{ my: 2 }} spacing={2}>
            <TextField
              sx={{ width: "100%" }}
              label="Song's name"
              variant="outlined"
              name="name"
              value={otherInfo.name}
              onChange={(e) =>
                setOtherInfo({ ...otherInfo, name: e.target.value })
              }
            />
            <TextField
              sx={{ width: "100%" }}
              label="Singer"
              name="singer"
              variant="outlined"
              value={otherInfo.singer}
              onChange={(e) =>
                setOtherInfo({ ...otherInfo, singer: e.target.value })
              }
            />
            <Autocomplete
              sx={{ width: "100%" }}
              multiple
              id="tags-outlined"
              onChange={(event, value) => {
                if (genresArr.length < 4) {
                  value.forEach((el) => {
                    if (!genresArr.includes(el.id)) {
                      setGenresArr((prev) => [...prev, el.id]);
                    }
                  });
                }
              }}
              options={!genresFetching && genres}
              getOptionLabel={(option) => option?.name}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select genres"
                  placeholder="Genres"
                />
              )}
            />
            {/* this is for image */}
            <img
              style={{
                width: "300px",
                height: "200px",
              }}
              src={
                avatar?.preview
                  ? avatar.preview
                  : "https://res.cloudinary.com/doqhasjec/image/upload/v1684256077/B2CDMusic/defaultSong_j5wkxe.png"
              }
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
                  color: "#000",
                }}
                hidden
                // accept="image/*"
                type="file"
                onChange={handlePreviewAvatar}
              />
              <PhotoCamera />
            </Button>

            {/* this is for audio */}

            <audio controls src={songFile.preview} ref={audioRef}></audio>
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
                  color: "#000",
                }}
                hidden
                // accept="image/*"
                type="file"
                onChange={handlePreviewSongfile}
              />
              <MusicNoteIcon />
            </Button>
          </Stack>
          <Stack direction="row" spacing={3} sx={{ marginLeft: 40 }}>
            <Button
              variant="contained"
              disabled={isLoading}
              sx={{
                width: "50%",
                backgroundColor: "#95a5a6",
                "&:hover": {
                  backgroundColor: "#27b7b7",
                },
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              disabled={isLoading}
              sx={{
                width: "50%",
                backgroundColor: "#3498db",
                "&:hover": {
                  backgroundColor: "#27b7b7",
                },
              }}
              onClick={handleSubmit}
            >
              Upload song
            </Button>
          </Stack>
        </Box>
      </Container>
    </>
  );
}
