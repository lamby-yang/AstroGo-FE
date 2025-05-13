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
import { Link, useLocation } from "react-router-dom";

//用户相关
const mainListItems = [
  { text: "用户个人信息", icon: <AccountCircleIcon />, path: "/profile" },
  { text: "运动记录", icon: <AssignmentRoundedIcon />, path: "/records" },
  { text: "目标设定", icon: <FlagRoundedIcon />, path: "/goals" },
  { text: "运动提醒", icon: <InfoRoundedIcon />, path: "/reminders" },
];

//整个社区管理
const secondaryListItems = [
  { text: "社交帖子", icon: <PeopleRoundedIcon />, path: "/posts" },
  { text: "社交评论", icon: <ChatRoundedIcon />, path: "/comments" },
];

export default function MenuContent() {
  const location = useLocation();

  return (
    <Stack sx={{ flexGrow: 1 }}>
      <List dense>
        {mainListItems.map((item, index) => (
          <ListItem key={index} sx={{ display: "block" }}>
            <ListItemButton
              component={Link}
              to={item.path}
              selected={location.pathname === item.path}
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
              to={item.path}
              selected={location.pathname === item.path}
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
