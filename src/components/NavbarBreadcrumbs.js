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
  profile: "用户个人信息",
  records: "运动记录",
  goals: "目标设定",
  reminders: "运动提醒",
  posts: "社交帖子",
  comments: "社交评论",
};

export default function NavbarBreadcrumbs() {
  const location = useLocation();

  const pathnames = location.pathname.split("/").filter(Boolean);
  const currentPage = pathnames[0] || "profile";

  return (
    <StyledBreadcrumbs
      aria-label="breadcrumb"
      separator={<NavigateNextRoundedIcon fontSize="small" />}
    >
      <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
        <Typography variant="body1">首页</Typography>
      </Link>

      {currentPage !== "profile" ? (
        <Link
          to={`/${currentPage}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Typography variant="body1">
            {pathMap[currentPage] || currentPage}
          </Typography>
        </Link>
      ) : null}

      <Typography
        variant="body1"
        sx={{ color: "text.primary", fontWeight: 600 }}
      >
        {pathnames.length > 1
          ? `用户#${pathnames[1]}`
          : pathMap[currentPage] || currentPage}
      </Typography>
    </StyledBreadcrumbs>
  );
}
