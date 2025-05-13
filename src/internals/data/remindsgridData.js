import * as React from "react";
import Chip from "@mui/material/Chip";

const renderStatus = (value) => {
  const isActive = value;
  const label = isActive ? "开启" : "关闭";
  const color = isActive ? "success" : "error";
  return <Chip label={label} color={color} size="small" variant="outlined" />;
};
const renderWeekDays = (value) => {
  const daysMap = ["一", "二", "三", "四", "五", "六", "日"];
  const validValue = (value || "").padEnd(7, "0").slice(0, 7);
  const activeDays = [];

  validValue.split("").forEach((bit, index) => {
    if (bit === "1") activeDays.push(`周${daysMap[index]}`);
  });

  let displayText;
  if (activeDays.length === 7) {
    displayText = "每天";
  } else if (activeDays.length === 0) {
    displayText = "未设置";
  } else {
    displayText = activeDays.join("、");
  }
  return <div>{displayText}</div>;
};

export const remindColumns = [
  {
    field: "uid",
    headerName: "用户ID",
    flex: 0.5,
    minWidth: 80,
    type: "number",
  },
  {
    field: "reminder_id",
    headerName: "提醒ID",
    flex: 0.5,
    minWidth: 80,
    type: "number",
  },
  {
    field: "reminder_days_of_week",
    headerName: "提醒周期",
    flex: 1.5,
    minWidth: 150,
    type: "varchar",
    renderCell: (params) => renderWeekDays(params.value),
  },
  {
    field: "reminder_time",
    headerName: "提醒时间",
    flex: 0.8,
    minWidth: 80,
    type: "time",
    renderCell: (params) => {
      const time = new Date(`1970-01-01T${params.value}`);
      return time.toLocaleTimeString("zh-CN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
    },
  },
  {
    field: "is_active",
    headerName: "状态",
    flex: 0.5,
    minWidth: 80,
    type: "boolean",
    renderCell: (params) => renderStatus(params.value),
  },
  {
    field: "actions",
    headerName: "操作",
    width: 100,
    flex: 0.5,
  },
];
export const remindRows = [
  {
    id: 1,
    reminder_id: 1,
    uid: 1001,
    reminder_days_of_week: "1010001",
    reminder_time: "07:30:00",
    is_active: true,
  },
  {
    id: 2,
    reminder_id: 2,
    uid: 1003,
    reminder_days_of_week: "0101010",
    reminder_time: "18:45:00",
    is_active: false,
  },
  {
    id: 3,
    reminder_id: 3,
    uid: 1005,
    reminder_days_of_week: "1111111",
    reminder_time: "12:00:00",
    is_active: true,
  },
  {
    id: 4,
    reminder_id: 4,
    uid: 1008,
    reminder_days_of_week: "0000001",
    reminder_time: "20:15:00",
    is_active: true,
  },
  {
    id: 5,
    reminder_id: 5,
    uid: 1010,
    reminder_days_of_week: "0111111",
    reminder_time: "08:00:00",
    is_active: false,
  },
];
