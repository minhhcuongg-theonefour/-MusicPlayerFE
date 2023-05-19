import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function NoSongBox() {
  return (
    <Card
      sx={{
        marginLeft: 50,
        marginTop: 10,
        maxWidth: 300,
        backgroundColor: "#2c3e50",
      }}
    >
      <CardContent>
        <Typography variant="subtitle1" color="#fff">
          Oops, looks like you don't have any thing in here
          <br />
        </Typography>
      </CardContent>
      <CardActions>
        <Link to="/" style={{ textDecoration: "none", marginTop: 8 }}>
          <Button
            variant="contained"
            sx={{
              marginLeft: 9,
              backgroundColor: "#27b7b7",
              "&:hover": {
                backgroundColor: "#27b7b7",
              },
            }}
          >
            Go add some
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}
