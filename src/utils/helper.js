import React from "react";
import { toast } from "react-hot-toast";

const calculateTime = (sec) => {
  const minutes = Math.floor(sec / 60);
  const returnMin = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const seconds = Math.floor(sec % 60);
  const returnSec = seconds < 10 ? `0${seconds}` : `${seconds}`;
  return `${returnMin} : ${returnSec}`;
};

const isValidImage = (img) => {
  const fileSize = img.size / 1024 / 1024;

  const fileType = img.type;

  if (fileSize <= 10) {
    if (
      fileType === "image/jpeg" ||
      fileType === "image/jpg" ||
      fileType === "image/png"
    )
      return true;
  }
  return false;
};

const validateRegisterEmail = (value) => {
  const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  if (!regex.test(value)) {
    toast.error("Your email is not valid");
  }
  return "";
};

const validatePassword = (value) => {
  const passwordRegex = /^.{6,}$/;
  if (!passwordRegex.test(value)) {
    toast.error("Password required at least 6 in length");
  }
  return "";
};

export { calculateTime, isValidImage, validateRegisterEmail, validatePassword };
