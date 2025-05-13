import * as React from "react";

// 评论内容单元格样式
const commentCellStyle = {
  display: "flex",
  alignItems: "center",
  flexWrap: "wrap",
  minHeight: 64,
  whiteSpace: "pre-wrap",
  wordBreak: "break-word",
  lineHeight: "1.6",
  padding: "8px 0",
};

// 列定义
export const socialCommentColumns = [
  {
    field: "interact_id",
    headerName: "评论ID",
    flex: 0.6,
    minWidth: 90,
    type: "number",
  },
  {
    field: "post_id",
    headerName: "帖子ID",
    flex: 0.8,
    minWidth: 90,
    type: "number",
  },
  {
    field: "uid",
    headerName: "用户ID",
    flex: 0.8,
    minWidth: 90,
    type: "number",
  },
  {
    field: "parent_id",
    headerName: "父评论",
    flex: 0.8,
    minWidth: 100,
    renderCell: (params) => (
      <div style={{ color: params.value ? "#1976d2" : "#999" }}>
        {params.value || "顶级评论"}
      </div>
    ),
  },
  {
    field: "content",
    headerName: "评论内容",
    flex: 3,
    minWidth: 300,
    renderCell: (params) => (
      <div style={{ 
        ...commentCellStyle,
        marginLeft: params.row.parent_id ? "40px" : "0",
        borderLeft: params.row.parent_id ? "3px solid #ddd" : "none",
        paddingLeft: params.row.parent_id ? "12px" : "0"
      }}>
        {params.value}
      </div>
    ),
  },
  {
    field: "interact_time",
    headerName: "评论时间",
    flex: 1.5,
    minWidth: 160,
    type: "dateTime",
    renderCell: (params) => new Date(params.value).toLocaleString("zh-CN"),
  },
  {
    field: "actions",
    headerName: "操作",
    width: 100,
    flex: 0.5,
  },
];

// 示例数据
export const socialCommentRows = [
  {
    id: 1,
    interact_id: 3001,
    post_id: 202405001,
    uid: 1002,
    parent_id: null,
    content: "太棒了！能分享一下跑步路线吗？",
    interact_time: new Date("2024-05-01T12:35:00"),
  },
  {
    id: 2,
    interact_id: 3002,
    post_id: 202405001,
    uid: 1003,
    parent_id: 3001,
    content: "同求路线图，最近也想开始晨跑",
    interact_time: new Date("2024-05-01T12:40:00"),
  },
  {
    id: 3,
    interact_id: 3003,
    post_id: 202405003,
    uid: 1001,
    parent_id: null,
    content: "车架看起来很专业！什么型号的？",
    interact_time: new Date("2024-05-01T13:15:00"),
  },
  {
    id: 4,
    interact_id: 3004,
    post_id: 202405003,
    uid: 1004,
    parent_id: 3003,
    content: "应该是TCR ADV PRO 1 DISC吧？",
    interact_time: new Date("2024-05-01T13:20:00"),
  },
];