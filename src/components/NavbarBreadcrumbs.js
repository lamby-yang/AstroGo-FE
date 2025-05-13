import * as React from "react";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Breadcrumbs, { breadcrumbsClasses } from "@mui/material/Breadcrumbs";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import { useLocation, Link } from "react-router-dom";

const StyledBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
  margin: theme.spacing(1, 0),
  [`& .${breadcrumbsClasses.separator}`]: {
    color: (theme.vars || theme).palette.action.disabled,
    margin: 1,
  },
  [`& .${breadcrumbsClasses.ol}`]: {
    alignItems: "center",
  },
}));
const pathMap = {
  "/": "Dashboard",
  "/profile": "用户个人信息",
  "/records": "运动记录",
  "/goals": "目标设定",
  "/reminders": "运动提醒",
  "/posts": "社交帖子",
  "/comments": "社交评论",
};
export default function NavbarBreadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <StyledBreadcrumbs
      aria-label="breadcrumb"
      separator={<NavigateNextRoundedIcon fontSize="small" />}
    >
      <Typography variant="body1">Dashboard</Typography>
      {pathnames.map((value, index) => {
        const last = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;

        return last ? (
          <Typography
            variant="body1"
            sx={{ color: "text.primary", fontWeight: 600 }}
            key={to}
          >
            {pathMap[to] || value}
          </Typography>
        ) : (
          <Link
            to={to}
            style={{ textDecoration: "none", color: "inherit" }}
            key={to}
          >
            <Typography variant="body1">{pathMap[to] || value}</Typography>
          </Link>
        );
      })}
    </StyledBreadcrumbs>
  );
}
