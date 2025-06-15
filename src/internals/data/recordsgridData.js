import * as React from "react";
import Chip from "@mui/material/Chip";
// 日期格式化函数
const formatDate = (dateStr) => {
  if (!dateStr) return "";

  try {
    const dateParts = dateStr.split("-");
    if (dateParts.length !== 3) return dateStr;

    const year = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10) - 1; // JS月份0-11
    const day = parseInt(dateParts[2], 10);

    const date = new Date(year, month, day);
    if (isNaN(date)) return dateStr;

    // 返回中文格式：2025年6月5日
    return `${year}年${month + 1}月${day}日`;
  } catch (e) {
    console.error("日期格式化错误:", e);
    return dateStr;
  }
};
function renderStatus(status) {
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

export const exerciseRecordColumns = [
  {
    field: "record_id",
    headerName: "记录ID",
    flex: 0.5,
    minWidth: 80,
    type: "number",
  },
  {
    field: "uid",
    headerName: "用户ID",
    flex: 0.8,
    minWidth: 80,
    type: "number",
  },
  {
    field: "record_time",
    headerName: "运动日期",
    flex: 1,
    minWidth: 150,
    renderCell: (params) => {
      return formatDate(params?.row?.record_time);
    },
    sortComparator: (v1, v2) => {
      try {
        const d1 = new Date(v1).getTime();
        const d2 = new Date(v2).getTime();
        return d1 - d2;
      } catch (e) {
        return v1.localeCompare(v2);
      }
    },
    valueGetter: (params) => params?.row?.record_time || "",
  },
  {
    field: "exercise_type",
    headerName: "运动类型",
    flex: 0.8,
    minWidth: 100,
  },
  {
    field: "duration",
    headerName: "时长(分钟)",
    flex: 0.8,
    minWidth: 100,
    type: "number",
  },
  {
    field: "distance",
    headerName: "距离(公里)",
    flex: 0.8,
    minWidth: 100,
    type: "number",
  },
  {
    field: "calorie",
    headerName: "卡路里(千卡)",
    flex: 0.8,
    minWidth: 120,
    type: "number",
  },
  {
    field: "verification_photo_url",
    headerName: "认证照片",
    flex: 1.5,
    minWidth: 150,
    renderCell: (params) => {
      if (!params || !params.value) return "无照片";

      return (
        <img
          src={params.value}
          alt="验证照片"
          style={{ width: 50, height: 50, objectFit: "cover" }}
          onError={(e) => {
            e.target.onerror = null;
            e.target.parentNode.textContent = "照片加载失败";
          }}
        />
      );
    },
  },
  {
    field: "verification_status",
    headerName: "认证状态",
    flex: 0.5,
    minWidth: 100,
    renderCell: (params) => {
      if (!params || params.value === undefined) return "";
      return renderStatus(params.value);
    },
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
