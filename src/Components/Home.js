import React from "react";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";
import { CardContent, CardMedia, Stack, Grid } from "@mui/material";
import SongList from "./SongList";
import "../styles/Home.css";

export default function Home() {
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
            <Box width={200} height={160}>
              <Card sx={{ borderRadius: 5, backgroundColor: "#454545" }}>
                <CardMedia
                  component="img"
                  image="https://i.scdn.co/image/ab67616d0000b273212d776c31027c511f0ee3bc"
                />
                <CardContent sx={{ padding: 0 }}>
                  <Typography
                    level="h4"
                    sx={{
                      color: "#fff",
                    }}
                  >
                    Pop
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </Grid>
        ))}
      </Grid>
      <h1 className="title">Songs</h1>
      <div className="AudioList">
        <SongList />
      </div>
    </div>
  );
}
