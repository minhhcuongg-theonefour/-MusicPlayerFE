import React from "react";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import { CardContent, CardMedia, Stack, Grid } from "@mui/material";
import SongList from "./SongList";
import "../styles/Home.css";
import CardMenu from "./CardMenu";
import { useGetSongsQuery } from "../services/songAPIs";

export default function Home() {
  const { data, isFetching } = useGetSongsQuery();

  return (
    <div className="home">
      <h1 className="title">Genres</h1>
      <Grid container spacing={4}>
        {[1, 2, 3, 4].map((el) => (
          <Grid
            item
            display="flex"
            justifyContent="center"
            minHeight={280}
            marginBottom={3}
          >
            <CardMenu />
          </Grid>
        ))}
      </Grid>
      <h1 className="title">Songs</h1>
      <div className="AudioList">{!isFetching && <SongList data={data} />}</div>
    </div>
  );
  Z;
}
