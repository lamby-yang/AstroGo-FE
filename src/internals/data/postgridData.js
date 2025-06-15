import * as React from "react";
import Chip from "@mui/material/Chip";
import { Avatar, AvatarGroup } from "@mui/material";

function renderPostStatus(status) {
  const colors = {
    pass: "success",
    fail: "error",
    pending: "primary",
  };
  const statusLabels = {
    pass: "通过",
    fail: "未通过",
    pending: "未审核",
  };
  const label = statusLabels[status] || status;
  const color = colors[status] || "default";
  return <Chip label={label} color={color} size="small" variant="outlined" />;
}

// 图片预览组件
function renderPostImages(images) {
  return (
    <AvatarGroup max={3}>
      {images.map((img, index) => (
        <Avatar
          key={index}
          src={img}
          variant="rounded"
          sx={{ width: 50, height: 50 }}
          onClick={() => window.open(img, "_blank")}
        />
      ))}
    </AvatarGroup>
  );
}
const contentCellStyle = {
  display: "flex", // 改用现代 flex 布局
  alignItems: "center", // 垂直居中关键属性
  flexWrap: "wrap", // 允许内容换行
  minHeight: 64, // 设置最小高度保证对齐效果
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 3,
  whiteSpace: "pre-wrap",
  wordBreak: "break-word",
  lineHeight: "1.6",
  padding: "8px 0",
  // transition: "max-height 0.3s ease",
};
// 列定义
export const socialMediaColumns = [
  {
    field: "post_id",
    headerName: "帖子ID",
    flex: 0.6,
    minWidth: 70,
    type: "number",
  },
  {
    field: "uid",
    headerName: "用户ID",
    flex: 0.8,
    minWidth: 70,
    type: "number",
  },
  {
    field: "post_title",
    headerName: "标题",
    flex: 1.5,
    minWidth: 150,
    renderCell: (params) => (
      <div className="content-cell" style={contentCellStyle}>
        {params.value}
      </div>
    ),
  },
  {
    field: "post_content",
    headerName: "内容",
    flex: 2,
    minWidth: 150,
    renderCell: (params) => (
      <div className="content-cell" style={contentCellStyle}>
        {params.value}
      </div>
    ),
  },
  {
    field: "post_image",
    headerName: "图片",
    flex: 1.8,
    minWidth: 150,
    renderCell: (params) => renderPostImages(params.value),
  },
  {
    field: "like_count",
    headerName: "点赞数",
    flex: 0.7,
    minWidth: 70,
    type: "number",
    align: "center",
  },
  {
    field: "verification_status",
    headerName: "审核状态",
    flex: 1,
    minWidth: 100,
    renderCell: (params) => renderPostStatus(params.value),
  },
  {
    field: "actions",
    headerName: "操作",
    width: 100,
    flex: 0.8,
  },
];
