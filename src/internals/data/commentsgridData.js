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
      <div
        style={{
          ...commentCellStyle,
          marginLeft: params.row.parent_id ? "40px" : "0",
          borderLeft: params.row.parent_id ? "3px solid #ddd" : "none",
          paddingLeft: params.row.parent_id ? "12px" : "0",
        }}
      >
        {params.value}
      </div>
    ),
  },
  {
    field: "is_deleted",
    headerName: "删除状态",
    flex: 0.8,
    minWidth: 100,
    type: "boolean",
    renderCell: (params) => {
      if (!params || params.value === undefined) return "";
      return params.value ? "已删除" : "正常";
    },
  },
  {
    field: "actions",
    headerName: "操作",
    width: 100,
    flex: 0.5,
  },
];
