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
  Box,
  Divider,
  CircularProgress,
  Alert,
} from "@mui/material";
import axios from "axios";

// 运动类型和周期枚举值
const target_types = {
  duration: "锻炼时长",
  calorie: "目标卡路里",
};
const target_cycles = {
  day: "每日",
  week: "每周",
  month: "每月",
};
export default function ExerciseTargetsDataGrid() {
  const [targetData, setTargetData] = useState({
    uid: 1001,
    target_id: 202405001,
    target_type: "锻炼时长",
    target_cycle: "每周",
    target_duration: 300,
    target_calorie: 1500.5,
  });

  // 加载状态
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 处理表单变更
  const handleChange = (name) => (event) => {
    const value = event.target.value;
    setTargetData((prev) => ({
      ...prev,
      [name]: name.includes("calorie") ? parseFloat(value) : value,
    }));
  };

  // 处理数值输入
  const handleNumberChange = (name) => (event) => {
    const value = Math.max(
      0,
      event.target.value === "" ? 0 : parseFloat(event.target.value)
    );
    setTargetData((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  // 从 API 获取数据
  const fetchData = async (uid) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/targets/${uid}/`
      );
      const data = response.data[0];
      setTargetData({
        uid: data.uid,
        target_id: data.target_id,
        target_type: data.target_type,
        target_cycle: data.target_cycle,
        target_duration: data.target_duration || 0,
        target_calorie: data.target_calorie || 0,
      });
    } catch (err) {
      console.error("获取数据失败:", err);
      setError("无法加载目标数据，请稍后重试。");
    } finally {
      setLoading(false);
    }
  };

  // 提交表单
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await axios.put(
        `http://127.0.0.1:8000/api/targets/${targetData.uid}/`,
        targetData
      );
      alert("目标设置已保存！");
      fetchData(targetData.uid);
    } catch (err) {
      console.error("提交失败:", err);
      setError("保存失败，请稍后重试。");
    } finally {
      setLoading(false);
    }
  };

  // 组件挂载时加载数据（示例 UID=2）
  useEffect(() => {
    fetchData(2); // 这里可以动态传入 UID
  }, []);

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        运动目标设置
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* 只读字段 */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            disabled
            label="用户ID"
            value={targetData.uid}
            InputProps={{ readOnly: true }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            disabled
            label="目标ID"
            value={targetData.target_id}
            InputProps={{ readOnly: true }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>目标类型</InputLabel>
            <Select
              value={targetData.target_type} // 值为英文 key，如 "duration"
              disabled
              label="目标类型"
              onChange={handleChange("target_type")}
            >
              {Object.keys(target_types).map((key) => (
                <MenuItem key={key} value={key}>
                  {target_types[key]}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>目标周期</InputLabel>
            <Select
              value={targetData.target_cycle}
              disabled
              label="目标周期"
              onChange={handleChange("target_cycle")}
            >
              {Object.keys(target_cycles).map((cycle) => (
                <MenuItem key={cycle} value={cycle}>
                  {target_cycles[cycle]}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="目标时长（分钟）"
            type="number"
            value={targetData.target_duration}
            onChange={handleNumberChange("target_duration")}
            inputProps={{ min: 0, step: 10 }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="目标卡路里（千卡）"
            type="number"
            value={targetData.target_calorie}
            onChange={handleChange("target_calorie")}
            inputProps={{ min: 0, step: 0.1 }}
          />
        </Grid>
      </Grid>

      <Divider sx={{ my: 4 }} />

      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          type="submit"
          variant="contained"
          size="large"
          sx={{ ml: 2 }}
          disabled={loading}
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "保存设置"
          )}
        </Button>
      </Box>
    </Box>
  );
}
