import * as React from "react";
import Chip from "@mui/material/Chip";

function renderStatus(status) {
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
    minWidth: 100,
    type: "date",
    renderCell: (params) => new Date(params.value).toLocaleDateString("zh-CN"),
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
   
  },
  {
    field: "verification_status",
    headerName: "认证状态",
    flex: 0.5,
    minWidth: 100,
    renderCell: (params) => renderStatus(params.value),
  },
  {
    field: "is_deleted",
    headerName: "删除状态",
    flex: 0.8,
    minWidth: 100,
    type: "boolean",
    renderCell: (params) => (params.value ? "已删除" : "正常"),
  },
  {
    field: "actions",
    headerName: "操作",
    width: 100,
    flex: 0.5,
  },
];
export const exerciseRecordRows = [
  {
    id: 1,
    record_id: 1,
    uid: 1001,
    record_time: new Date("2024-05-30T09:30:00"),
    exercise_type: "跑步",
    duration: 45,
    distance: 8.5,
    calorie: 450.5,
    verification_photo_url: "https://example.com/photo1.jpg",
    verification_status: "approved",
    is_deleted: false,
  },
  {
    id: 2,
    record_id: 2,
    uid: 1002,
    record_time: new Date("2024-05-20T09:30:00"),
    exercise_type: "游泳",
    duration: 60,
    distance: 1.2,
    calorie: 600.0,
    verification_photo_url: "https://example.com/photo2.jpg",
    verification_status: "rejected",
    is_deleted: false,
  },
  {
    id: 3,
    record_id: 3,
    uid: 1003,
    record_time: new Date("2024-05-20T09:30:00"),
    exercise_type: "骑行",
    duration: 90,
    distance: 25.3,
    calorie: 750.8,
    verification_photo_url: "https://example.com/photo3.jpg",
    verification_status: "pending",
    is_deleted: true,
  },
  {
    id: 4,
    record_id: 4,
    uid: 1004,
    record_time: new Date("2024-05-20T09:30:00"),
    exercise_type: "瑜伽",
    duration: 30,
    distance: 5.0,
    calorie: 150.2,
    verification_photo_url: "https://example.com/photo4.jpg",
    verification_status: "通过",
    is_deleted: false,
  },
  {
    id: 5,
    record_id: 5,
    uid: 1005,
    record_time: new Date("2024-05-20T09:30:00"),
    exercise_type: "跑步",
    duration: 50,
    distance: 7.8,
    calorie: 520.0,
    verification_photo_url: "https://example.com/photo5.jpg",
    verification_status: "未审核",
    is_deleted: false,
  },
];
