import { Box, Tab, Tabs, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import useStyles from "./styles";

const StaffTop: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Box>
      <h1>Staff Top</h1>
    </Box>
  );
};

export default StaffTop;
