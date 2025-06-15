import React, { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  Typography,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Avatar,
  Box,
  Divider,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";

const departments = [
  { id: 1, name: "材料科学与工程学院" },
  { id: 2, name: "电子信息工程学院" },
  { id: 3, name: "自动化科学与电气工程学院" },
  { id: 4, name: "能源与动力工程学院" },
  { id: 5, name: "航空科学与工程学院" },
  { id: 6, name: "计算机学院" },
  { id: 7, name: "机械工程及自动化学院" },
  { id: 8, name: "经济管理学院" },
  { id: 9, name: "数学科学学院" },
  { id: 10, name: "生物与医学工程学院" },
  { id: 11, name: "人文社会科学学院" },
  { id: 12, name: "外国语学院" },
  { id: 13, name: "交通科学与工程学院" },
  { id: 14, name: "可靠性与系统工程学院" },
  { id: 15, name: "宇航学院" },
  { id: 16, name: "飞行学院" },
  { id: 17, name: "仪器科学与光电工程学院" },
  { id: 18, name: "北京学院" },
  { id: 19, name: "物理学院" },
  { id: 20, name: "法学院" },
  { id: 21, name: "软件学院" },
  { id: 23, name: "高等理工学院" },
  { id: 24, name: "中法工程师学院" },
  { id: 25, name: "国际学院" },
  { id: 26, name: "新媒体艺术与设计学院" },
  { id: 27, name: "化学学院" },
  { id: 28, name: "马克思主义学院" },
  { id: 29, name: "人文与社会科学高等研究院" },
  { id: 30, name: "空间与环境学院" },
  { id: 31, name: "无人系统研究院" },
  { id: 32, name: "航空发动机研究院" },
  { id: 35, name: "国际通用工程学院" },
  { id: 37, name: "北航学院" },
  { id: 38, name: "医学科学与工程学院" },
  { id: 39, name: "网络空间安全学院" },
  { id: 41, name: "集成电路科学与工程学院" },
  { id: 42, name: "人工智能研究院" },
  { id: 43, name: "前沿科学技术创新研究院" },
];

export default function ProfileDataGrid({ userId }) {
  const [userData, setUserData] = useState({
    uid: "",
    user_name: "加载中...",
    creat_time: "",
    phone_number: "",
    department: "",
    age: "",
    height: "",
    weight: "",
    avatar_url: "/default-avatar.png",
  });
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/user/${userId}/`
        );
        if (!response.ok) {
          throw new Error(`请求失败 (状态码: ${response.status})`);
        }

        const rawData = await response.json();
        console.log("原始数据:", rawData);

        // 安全转换日期
        const safeDateConvert = (dateStr) => {
          try {
            return new Date(dateStr).toLocaleString();
          } catch {
            return "日期格式错误";
          }
        };

        const formattedData = {
          uid: rawData.uid,
          user_name: rawData.user_name,
          creat_time: safeDateConvert(rawData.creat_time),
          last_login_time: rawData.last_login_time
            ? safeDateConvert(rawData.last_login_time)
            : "从未登录",
          phone_number: rawData.phone_number || "未提供",
          avatar_url: rawData.avatar_url || "/default-avatar.png",
          department: rawData.department || "未知院系",
          age: rawData.age ?? "未知",
          height: rawData.height || "未记录",
          weight: rawData.weight || "未记录",
          pwd: rawData.pwd ? rawData.pwd : "未提供",
          app_id: rawData.app_id ? rawData.app_id : "未提供",
        };

        console.log("格式化后数据:", formattedData);
        setUserData(formattedData);
        setError(null);
      } catch (err) {
        console.error("数据获取失败:", err);
        setError(err.message);
        setUserData(null); // 清空无效数据
      }
    };

    fetchData();
  }, [userId]);

  // 处理表单变更
  const handleChange = (name) => (event) => {
    setUserData({
      ...userData,
      [name]: event.target.value,
    });
  };

  // 处理日期变更
  const handleDateChange = (date, field) => {
    setUserData({
      ...userData,
      [field]: date.toISOString(),
    });
  };

  // 提交表单
  const handleSubmit = (e) => {
    e.preventDefault();
    // 这里应添加API调用
    console.log("提交的用户数据:", userData);
  };
  console.log(userData);
  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        基本信息
      </Typography>
      <Grid container spacing={3} sx={{ alignItems: "center" }}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="用户ID"
            value={userData.uid}
            InputProps={{ readOnly: true }}
            sx={{ mb: 2 }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="用户名"
            value={userData.user_name}
            onChange={handleChange("user_name")}
            required
            InputProps={{ readOnly: true }}
            sx={{ mb: 2 }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="手机号码"
            value={userData.phone_number}
            onChange={handleChange("phone_number")}
            required
            inputProps={{ pattern: "^1[3-9]\\d{9}$" }}
            InputProps={{ readOnly: true }}
            sx={{ mb: 2 }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="密码"
            required
            value={userData.pwd}
            onChange={handleChange("pwd")}
            InputProps={{ readOnly: true }}
            sx={{ mb: 2 }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>所属学院</InputLabel>
            <Select
              value={userData.department}
              label="所属学院"
              InputProps={{ readOnly: true }}
              onChange={handleChange("department")}
            >
              {departments.map((dept) => (
                <MenuItem key={dept.id} value={dept.id}>
                  {`${dept.id}系 ${dept.name}`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <DatePicker
            label="账户创建时间"
            InputProps={{ readOnly: true }}
            value={new Date(userData.creat_time)}
            onChange={(date) => handleDateChange(date, "creat_time")}
            renderInput={(params) => (
              <TextField {...params} fullWidth sx={{ mb: 2 }} />
            )}
            disabled
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <DatePicker
            label="最后登录时间"
            InputProps={{ readOnly: true }}
            value={new Date(userData.last_login_time)}
            onChange={(date) => handleDateChange(date, "last_login_time")}
            renderInput={(params) => (
              <TextField {...params} fullWidth sx={{ mb: 2 }} />
            )}
            disabled
          />
        </Grid>
      </Grid>
      <Divider sx={{ my: 4 }} />
      <Typography variant="h6" sx={{ mb: 2 }}>
        其他信息
      </Typography>
      <Box sx={{ mt: 2, mb: 2, display: "flex", alignItems: "center" }}>
        <Avatar
          src={userData.avatar_url}
          sx={{ width: 64, height: 64, mr: 2 }}
        />
        <TextField
          fullWidth
          label="头像地址"
          InputProps={{ readOnly: true }}
          value={userData.avatar_url}
          onChange={handleChange("avatar_url")}
        />
      </Box>
      <Grid container spacing={2}>
        <Grid size={4}>
          <TextField
            fullWidth
            label="年龄"
            type="number"
            value={userData.age}
            onChange={handleChange("age")}
            InputProps={{ inputProps: { readOnly: true, min: 1, max: 150 } }}
            sx={{ mb: 2 }}
          />
        </Grid>
        <Grid size={4}>
          <TextField
            fullWidth
            label="身高(cm)"
            type="number"
            value={userData.height}
            onChange={handleChange("height")}
            InputProps={{ inputProps: { readOnly: true, min: 50, max: 250 } }}
          />
        </Grid>
        <Grid size={4}>
          <TextField
            fullWidth
            label="体重(kg)"
            type="number"
            value={userData.weight}
            onChange={handleChange("weight")}
            InputProps={{ inputProps: { readOnly: true, min: 10, max: 300 } }}
          />
        </Grid>
      </Grid>
      {/* <Divider sx={{ my: 2 }} />
      <Button
        disabled
        type="submit"
        variant="contained"
        size="large"
        sx={{ float: "right" }}
      >
        保存设置
      </Button> */}
    </Box>
  );
}
