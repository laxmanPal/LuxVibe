import { CircularProgress } from "@mui/material";
import React from "react";

const FetchingData = ({title}) => {
  return (
    <div className="flex items-center justify-center">
      <p className="text-center">
        <CircularProgress color="inherit" /> <br /> {title}
      </p>
    </div>
  );
};

export default FetchingData;
