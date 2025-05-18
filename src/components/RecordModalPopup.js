import * as React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Grid,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";

const RecordModalPopup = ({ open, onClose, initialData, onSave }) => {
  const [formData, setFormData] = React.useState(initialData || {});

  React.useEffect(() => {
    setFormData(initialData || {});
  }, [initialData, open]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleDateChange = (date, field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: date,
    }));
  };

  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>编辑运动记录</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1, alignItems: "center" }}>
          <Grid item xs={6} md={4}>
            <TextField
              fullWidth
              disabled
              label="记录ID"
              name="record_id"
              value={formData.record_id || ""}
              InputProps={{ readOnly: true }}
            />
          </Grid>

          <Grid item xs={6} md={4}>
            <TextField
              fullWidth
              disabled
              label="用户ID"
              name="uid"
              value={formData.uid || ""}
              InputProps={{ readOnly: true }}
            />
          </Grid>

          {/* 日期选择 */}
          <Grid item xs={6} md={4}>
            <DatePicker
              label="运动日期"
              disabled
              // InputProps={{ readOnly: true }}
              value={formData.record_time || null}
              onChange={(date) => handleDateChange(date, "record_time")}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </Grid>

          <Grid item xs={6} md={4}>
            <TextField
              select
              fullWidth
              label="运动类型"
              disabled
              name="exercise_type"
              value={formData.exercise_type || ""}
              onChange={handleChange}
            >
              {[
                "跑步",
                "竞走",
                "瑜伽",
                "游泳",
                "骑行",
                "羽毛球",
                "篮球",
                "足球",
              ].map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={6} md={4}>
            <TextField
              fullWidth
              type="number"
              label="时长(分钟)"
              disabled
              name="duration"
              value={formData.duration || 0}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={6} md={4}>
            <TextField
              fullWidth
              type="number"
              disabled
              label="距离(公里)"
              name="distance"
              value={formData.distance || 0}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={6} md={4}>
            <TextField
              fullWidth
              type="number"
              label="卡路里(千卡)"
              disabled
              name="calorie"
              value={formData.calorie || 0}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              disabled
              label="认证照片URL"
              name="verification_photo_url"
              value={formData.verification_photo_url || ""}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6} md={4}>
            <TextField
              select
              fullWidth
              label="认证状态"
              name="verification_status"
              value={formData.verification_status || "pending"}
              onChange={handleChange}
            >
              <MenuItem value="approved">通过</MenuItem>
              <MenuItem value="rejected">未通过</MenuItem>
              <MenuItem value="pending">未审核</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={6} md={4}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.is_deleted || false}
                  onChange={handleChange}
                  name="is_deleted"
                />
              }
              label="已删除"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>取消</Button>
        <Button onClick={handleSubmit} variant="contained">
          保存设置
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RecordModalPopup;
