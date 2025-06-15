import * as React from "react";

import { alpha } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Header from "./components/Header";
import MainGrid from "./components/MainGrid";
import SideMenu from "./components/SideMenu";
import AppTheme from "./shared-theme/AppTheme";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  chartsCustomizations,
  dataGridCustomizations,
  treeViewCustomizations,
} from "./theme/customizations";

const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
  ...treeViewCustomizations,
};

export default function Dashboard(props) {
  return (
    <Router>
      <AppTheme {...props} themeComponents={xThemeComponents}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <CssBaseline enableColorScheme />
          <Box sx={{ display: "flex", width: "100vw" }}>
            <SideMenu />
            <Box
              component="main"
              sx={(theme) => ({
                flexGrow: 1,
                backgroundColor: theme.vars
                  ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
                  : alpha(theme.palette.background.default, 1),
                overflow: "auto",
              })}
            >
              <Routes>
                {/* <Route path="/profile" element={<MainContent />} />
                <Route path="/records" element={<MainContent />} />
                <Route path="/goals" element={<MainContent />} />
                <Route path="/reminders" element={<MainContent />} />
                <Route path="/posts" element={<MainContent />} />
                <Route path="/comments" element={<MainContent />} /> */}
                <Route path="*" element={<MainContent />} />
                <Route path="/profile/:userId?" element={<MainContent />} />
                <Route path="/records/:userId?" element={<MainContent />} />
                <Route path="/goals/:userId?" element={<MainContent />} />
                <Route path="/reminders/:userId?" element={<MainContent />} />
                <Route path="/posts/:userId?" element={<MainContent />} />
                <Route path="/comments/:userId?" element={<MainContent />} />
              </Routes>
            </Box>
          </Box>
        </LocalizationProvider>
      </AppTheme>
    </Router>
  );
}
function MainContent() {
  return (
    <Stack
      spacing={2}
      sx={{
        alignItems: "center",
        mx: 3,
        pb: 5,
        mt: { xs: 8, md: 0 },
      }}
    >
      <Header />
      <MainGrid />
    </Stack>
  );
}
