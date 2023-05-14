import React from "react";

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

export { calculateTime, isValidImage };
