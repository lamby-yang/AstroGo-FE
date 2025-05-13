import "./App.css";
import { Box } from "@mui/material";
import * as React from "react";
import Dashboard from "./Dashboard";

function App() {
  return (
    <Box sx={{ display: "flex" }}>
      <Dashboard></Dashboard>
    </Box>
  );
}

export default App;
