import React, { useState } from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import Link from "@mui/joy/Link";
import { Box } from "@mui/joy";
import {
  loginStart,
  loginSuccess,
  loginFailed,
} from "../../features/authSlice";
import "../../styles/Login.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../services/authAPIs";
import { toast } from "react-hot-toast";

export default function Login() {
  const [login] = useLoginMutation();

  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart);
    try {
      const { data } = await login(values);
      dispatch(loginSuccess(data));
      {
        data.user.username === "admin"
          ? navigate("/admin/dashboard")
          : navigate("/");
      }
      toast.success("Login success");
    } catch (err) {
      toast.error("Login failed");
      dispatch(loginFailed());
    }
    setValues(values);
    console.log(values);
  };

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
              <FormLabel sx={{ color: "#fff" }}>User name</FormLabel>
              <Input
                // html input attribute
                name="username"
                placeholder="Example: jenny"
                onChange={(e) =>
                  setValues({ ...values, username: e.target.value })
                }
              />
            </FormControl>
            <FormControl>
              <FormLabel sx={{ color: "#fff" }}>Password</FormLabel>
              <Input
                // html input attribute
                name="password"
                type="password"
                placeholder="password"
                onChange={(e) =>
                  setValues({ ...values, password: e.target.value })
                }
              />
            </FormControl>

            <Button
              onClick={handleLogin}
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
                <Link href="/register" sx={{ color: "#1abc9c" }}>
                  Register
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
