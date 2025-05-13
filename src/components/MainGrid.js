import * as React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ProfileDataGrid from "./ProfileDataGrid";
import RecordsDataGrid from "./RecordsDataGrid";
import GoalsDataGrid from "./GoalsDataGrid";
import RemindersDataGrid from "./RemindersDataGrid";
import PostsDataGrid from "./PostsDataGrid";
import CommentsDataGrid from "./CommentsDataGrid";
import { useLocation } from "react-router-dom";
export default function MainGrid() {
  const location = useLocation();
  const renderContent = () => {
    switch (location.pathname) {
      case "/profile":
        return <ProfileDataGrid />;
      case "/records":
        return <RecordsDataGrid />;
      case "/goals":
        return <GoalsDataGrid />;
      case "/reminders":
        return <RemindersDataGrid />;
      case "/posts":
        return <PostsDataGrid />;
      case "/comments":
        return <CommentsDataGrid />;

      default:
        return <ProfileDataGrid />;
    }
  };
  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        数据管理
      </Typography>
      <Grid container spacing={2} columns={12}>
        <Grid size={{ xs: 12, lg: 12 }}>
          {renderContent()}
        </Grid>
      </Grid>
    </Box>
  );
}
