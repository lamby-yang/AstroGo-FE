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
import { useParams } from "react-router-dom";

export default function MainGrid() {
  const location = useLocation();

  // 获取路由参数中的用户ID
  const { userId } = useParams();

  // 从路径中提取页面名称（第一段）
  const pageName = location.pathname.split("/")[1] || "profile";

  // 根据页面名称渲染对应内容
  const renderContent = () => {
    switch (pageName) {
      case "profile":
        return <ProfileDataGrid userId={userId} />;
      case "records":
        return <RecordsDataGrid userId={userId} />;
      case "goals":
        return <GoalsDataGrid userId={userId} />;
      case "reminders":
        return <RemindersDataGrid userId={userId} />;
      case "posts":
        return <PostsDataGrid userId={userId} />;
      case "comments":
        return <CommentsDataGrid userId={userId} />;
      default:
        return <ProfileDataGrid userId={userId} />;
    }
  };

  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      {/* 标题固定为"数据管理" */}
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        数据管理
      </Typography>
      <Grid container spacing={2} columns={12}>
        <Grid item xs={12} lg={12}>
          {renderContent()}
        </Grid>
      </Grid>
    </Box>
  );
}
