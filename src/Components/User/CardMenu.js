import React from "react";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";
import { CardContent, CardMedia } from "@mui/material";

export default function CardMenu({ el }) {
  return (
    <Box width={200} height={160}>
      {/* {genres?.map((item) => ( */}
      <Card sx={{ borderRadius: 5, backgroundColor: "#454545" }}>
        <CardMedia
          sx={{ width: "165px", height: "180px" }}
          component="img"
          image={el?.image}
        />
        <CardContent sx={{ padding: 0 }}>
          <Typography
            level="h6"
            sx={{
              color: "#fff",
            }}
          >
            {el?.name}
          </Typography>
        </CardContent>
      </Card>
      {/* ))} */}
    </Box>
  );
}
