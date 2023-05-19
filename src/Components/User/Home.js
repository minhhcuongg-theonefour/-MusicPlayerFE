import React from "react";
import { CardContent, CardMedia, Stack, Grid } from "@mui/material";
import SongList from "./SongList";
import "../../styles/Home.css";
import CardMenu from "./CardMenu";
import { useGetSongsQuery } from "../../services/songAPIs";
import { useGetGenresQuery } from "../../services/genresAPIs";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const { data, isFetching } = useGetSongsQuery("Allsongs", {
    refetchOnMountOrArgChange: true,
  });
  const { data: genres, isFetching: genresFetching } = useGetGenresQuery(
    "AllGenres",
    { refetchOnMountOrArgChange: true }
  );

  return (
    <div className="home">
      <h1 className="title">Genres</h1>
      <Grid container spacing={4}>
        {!genresFetching &&
          genres?.map((el) => (
            <Grid
              key={el?.id}
              onClick={() => navigate(`/genre/${el?.id}`)}
              item
              display="flex"
              justifyContent="center"
              minHeight={280}
              marginBottom={3}
            >
              <CardMenu el={el} />
            </Grid>
          ))}
      </Grid>
      {!isFetching && (
        <>
          <h1 className="title">Songs</h1>
          <div className="AudioList">
            {!isFetching && (
              <SongList
                data={data}
                source="song"
                data_length={data?.length}
                playlist_id={null}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}
