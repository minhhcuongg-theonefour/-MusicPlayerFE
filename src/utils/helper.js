import React from "react";

const calculateTime = (sec) => {
  const minutes = Math.floor(sec / 60);
  const returnMin = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const seconds = Math.floor(sec % 60);
  const returnSec = seconds < 10 ? `0${seconds}` : `${seconds}`;
  return `${returnMin} : ${returnSec}`;
};

export { calculateTime };
