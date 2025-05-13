import * as React from "react";
import Chip from "@mui/material/Chip";
import { Avatar, AvatarGroup } from "@mui/material";

function renderPostStatus(status) {
  const colors = {
    approved: "success",
    rejected: "error",
    pending: "primary",
  };
  const statusLabels = {
    approved: "通过",
    rejected: "未通过",
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
    field: "post_time",
    headerName: "发布时间",
    flex: 1.5,
    minWidth: 150,
    type: "dateTime",
    renderCell: (params) => new Date(params.value).toLocaleString("zh-CN"),
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
    width: 80,
    flex: 0.5,
  },
];

// 示例数据
export const socialMediaRows = [
  {
    id: 1,
    post_id: 202405001,
    uid: 1001,
    post_time: new Date("2024-05-01T12:30:00"),
    post_title: "晨跑打卡 | 今日份多巴胺",
    post_content:
      "今天沿着江边完成了10公里慢跑，空气清新景色宜人，坚持运动第28天！",
    post_image: [
      "https://example.com/post1-1.jpg",
      "https://example.com/post1-2.jpg",
    ],
    like_count: 245,
    verification_status: "approved",
  },
  {
    id: 2,
    post_id: 202405002,
    uid: 1002,
    post_time: new Date("2024-05-01T12:30:00"),
    post_title: "瑜伽体验课记录",
    post_content: "第一次尝试空中瑜伽，核心力量还需要加强，继续努力～",
    post_image: ["https://example.com/post2.jpg"],
    like_count: 89,
    verification_status: "pending",
  },
  {
    id: 3,
    post_id: 202405003,
    uid: 1003,
    post_time: new Date("2024-05-01T12:30:00"),
    post_title: "骑行装备分享",
    post_content: "新入手的公路车和骑行装备，这个周末准备挑战环湖路线！",
    post_image: [
      "https://example.com/post3-1.jpg",
      "https://example.com/post3-2.jpg",
      "https://example.com/post3-3.jpg",
    ],
    like_count: 167,
    verification_status: "rejected",
  },
];
