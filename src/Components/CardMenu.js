import React from "react";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";
import { CardContent, CardMedia } from "@mui/material";

export default function CardMenu() {
  return (
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
  );
}
