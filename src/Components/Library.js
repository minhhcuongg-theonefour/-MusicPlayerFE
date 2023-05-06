import React from "react";
import { CardContent, CardMedia, Stack, Grid } from "@mui/material";
import CardMenu from "./CardMenu";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

export default function Library() {
  const navigate = useNavigate();

  return (
    <>
      <h1 className="title">Your library</h1>
      <Grid container spacing={4}>
        {[1, 2, 3, 4].map((el) => (
          <Grid
            onClick={() => navigate(`/library/1`)}
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
    </>
  );
}
