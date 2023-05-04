import * as React from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import Link from "@mui/joy/Link";
import { Box } from "@mui/joy";
import "../styles/Login.css";

export default function Login() {
  return (
    <div className="login">
      <CssVarsProvider>
        <main>
          <Sheet
            sx={{
              width: 300,
              mx: "auto", // margin left & right
              my: 4, // margin top & bottom
              py: 3, // padding top & bottom
              px: 2, // padding left & right
              display: "flex",
              flexDirection: "column",
              gap: 2,
              borderRadius: "sm",
              backgroundColor: "#397070",
            }}
            variant="outlined"
          >
            <div>
              <Typography
                display="center"
                level="h4"
                component="h1"
                sx={{ color: "#fff" }}
              >
                <b>LOGIN</b>
              </Typography>
              {/* <Typography level="body2">Sign in to continue.</Typography> */}
            </div>
            <FormControl>
              <FormLabel sx={{ color: "#fff" }}>Email</FormLabel>
              <Input
                // html input attribute
                name="email"
                type="email"
                placeholder="johndoe@email.com"
              />
            </FormControl>
            <FormControl>
              <FormLabel sx={{ color: "#fff" }}>Password</FormLabel>
              <Input
                // html input attribute
                name="password"
                type="password"
                placeholder="password"
              />
            </FormControl>

            <Button
              sx={{
                mt: 1,
                backgroundColor: "#46B191",
                "&:hover": {
                  background: "#46B191",
                },
              }}
            >
              Log in
            </Button>
            <Typography
              endDecorator={
                <Link href="/sign-up" sx={{ color: "#fff" }}>
                  Sign up
                </Link>
              }
              fontSize="sm"
              sx={{ alignSelf: "center", color: "#fff" }}
            >
              Don&apos;t have an account?
            </Typography>
          </Sheet>
        </main>
      </CssVarsProvider>
    </div>
  );
}
