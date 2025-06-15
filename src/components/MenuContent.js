import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FlagRoundedIcon from "@mui/icons-material/FlagRounded";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";
import { Divider } from "@mui/material";
import { Link, useLocation, useParams } from "react-router-dom";

// 用户相关菜单项
const mainListItems = [
  { text: "用户个人信息", icon: <AccountCircleIcon />, path: "profile" },
  { text: "运动记录", icon: <AssignmentRoundedIcon />, path: "records" },
  { text: "目标设定", icon: <FlagRoundedIcon />, path: "goals" },
  { text: "运动提醒", icon: <InfoRoundedIcon />, path: "reminders" },
];

// 社区管理菜单项
const secondaryListItems = [
  { text: "社交帖子", icon: <PeopleRoundedIcon />, path: "posts" },
  { text: "社交评论", icon: <ChatRoundedIcon />, path: "comments" },
];

export default function MenuContent() {
  const location = useLocation();

  // 从URL参数获取用户ID
  const { userId: paramUserId } = useParams();

  // 从位置路径中提取页面名称
  const currentPage = location.pathname.split("/")[1] || "profile";

  // 从URL解析当前用户ID（路径的最后一个部分）
  const pathSegments = location.pathname.split("/").filter(Boolean);
  const currentUserId =
    pathSegments.length > 1 ? pathSegments[pathSegments.length - 1] : null;

  return (
    <Stack sx={{ flexGrow: 1 }}>
      <List dense>
        {mainListItems.map((item, index) => (
          <ListItem key={index} sx={{ display: "block" }}>
            <ListItemButton
              component={Link}
              // 将用户ID附加到路径中：/profile/1
              to={`/${item.path}${currentUserId ? `/${currentUserId}` : ""}`}
              // 判断当前菜单项是否选中：检查路径前缀是否匹配
              selected={currentPage === item.path}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List dense>
        {secondaryListItems.map((item, index) => (
          <ListItem key={index} sx={{ display: "block" }}>
            <ListItemButton
              component={Link}
              // 将用户ID附加到路径中：/posts/1
              to={`/${item.path}${currentUserId ? `/${currentUserId}` : ""}`}
              // 判断当前菜单项是否选中：检查路径前缀是否匹配
              selected={currentPage === item.path}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
