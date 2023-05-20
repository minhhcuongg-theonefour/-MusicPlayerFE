import React, { useState } from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import Link from "@mui/joy/Link";
import { Box, IconButton } from "@mui/joy";
import "../../styles/Login.css";
import { InputAdornment } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useRegisterMutation } from "../../services/authAPIs";
import {
  registerStart,
  registerSuccess,
  registerFailed,
} from "../../features/authSlice";
import { useNavigate } from "react-router-dom";
import { validateRegisterEmail, validatePassword } from "../../utils/helper";

export default function Register() {
  const [register] = useRegisterMutation();

  const navigate = useNavigate();

  const [values, setValues] = useState({
    username: "",
    email: "",
    image:
      "https://res.cloudinary.com/doqhasjec/image/upload/v1681990980/samples/NMC%20Bookstore/Default_ct9xzk.png",
    password: "",
    showPass: false,
  });

  const handlePassVisibilty = () => {
    setValues({
      ...values,
      showPass: !values.showPass,
    });
  };

  const dispatch = useDispatch();

  // console.log(emailError);

  const handleRegister = async (e) => {
    e.preventDefault();
    const emailError = validateRegisterEmail(values.email);
    const passwordError = validatePassword(values.password);

    dispatch(registerStart());
    try {
      if (
        values.username.length < 15 &&
        values.password.length >= 6 &&
        !emailError &&
        !passwordError
      ) {
        const v = await register(values);
        dispatch(registerSuccess(v));
        console.log(v);
        if (v.error && v.error.status === 400) {
          toast.error("Failed to register");
        }
        if (v.error && v.error.status === 403) {
          toast.error("Email or user name already exists");
        }
        if (values.username.length > 15) {
          toast.error("Your user name is too long");
        }
        if (emailError) {
          toast.error("Your email is not valid 111");
        }
        if (passwordError) {
          toast.err("Your password must have 6 character in length");
        }
        if (v.data) {
          toast.success("Welcome to B2CD Music");
          navigate("/login");
        }
      }
    } catch (err) {
      toast.error("Register failed"), dispatch(registerFailed());
    }
    // console.log(values);
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
                <b>REGISTER</b>
              </Typography>
              {/* <Typography level="body2">Sign in to continue.</Typography> */}
            </div>
            <FormControl>
              <FormLabel sx={{ color: "#fff" }}>User name</FormLabel>
              <Input
                // html input attribute
                name="username"
                placeholder="Example: jennifer"
                onChange={(e) =>
                  setValues({ ...values, username: e.target.value })
                }
              />
            </FormControl>
            <FormControl>
              <FormLabel sx={{ color: "#fff" }}>Email</FormLabel>
              <Input
                // html input attribute
                name="email"
                type="email"
                placeholder="abc@gmail.com"
                onChange={(e) =>
                  setValues({ ...values, email: e.target.value })
                }
              />
            </FormControl>
            <FormControl>
              <FormLabel sx={{ color: "#fff" }}>Password</FormLabel>
              <Input
                fullWidth
                required
                name="password"
                label="Password"
                placeholder="Enter your password"
                type={values.showPass ? "text" : "password"}
                id="password"
                onChange={(e) =>
                  setValues({ ...values, password: e.target.value })
                }
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
              onClick={handleRegister}
            >
              Sign up
            </Button>
            <Typography
              endDecorator={
                <Link href="/login" sx={{ color: "#1abc9c" }}>
                  Login
                </Link>
              }
              fontSize="sm"
              sx={{ alignSelf: "center", color: "#fff" }}
            >
              Already have an account?
            </Typography>
          </Sheet>
        </main>
      </CssVarsProvider>
    </div>
  );
}
