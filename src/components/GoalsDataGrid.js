import * as React from "react";
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
} from "@mui/material";

// 运动类型和周期枚举值
const TARGET_TYPES = [
  "跑步",
  "竞走",
  "瑜伽",
  "游泳",
  "骑行",
  "羽毛球",
  "篮球",
  "足球",
];
const TARGET_CYCLES = ["每日", "每周", "每月"];

export default function ExerciseTargetsDataGrid() {
  const [targetData, setTargetData] = React.useState({
    uid: 1001,
    target_id: 202405001,
    target_type: "跑步",
    target_cycle: "每周",
    target_duration: 300,
    target_calorie: 1500.5,
  });

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
    const value = Math.max(0, event.target.value);
    setTargetData((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  // 提交表单
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("提交的运动目标:", targetData);
    // 这里添加API调用
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        运动目标设置
      </Typography>

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

        {/* 可编辑字段 */}
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>运动类型</InputLabel>
            <Select
              value={targetData.target_type}
              disabled
              label="运动类型"
              onChange={handleChange("target_type")}
            >
              {TARGET_TYPES.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
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
              {TARGET_CYCLES.map((cycle) => (
                <MenuItem key={cycle} value={cycle}>
                  {cycle}
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
        <Button type="submit" variant="contained" size="large" sx={{ ml: 2 }}>
          保存设置
        </Button>
      </Box>
    </Box>
  );
}
