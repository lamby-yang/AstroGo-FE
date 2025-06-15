import * as React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  FormControlLabel,
  Switch,
  Checkbox,
} from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers";

const weekDays = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];

const RemindModalPopup = ({ open, onClose, initialData, onSave }) => {
  const [formData, setFormData] = React.useState({
    ...initialData,
  });

  React.useEffect(() => {
    setFormData(initialData || { reminder_days_of_week: "0000000" });
  }, [initialData, open]);

  // 处理星期选择
  const handleDayChange = (index) => (event) => {
    const days = formData.reminder_days_of_week.split("");
    days[index] = event.target.checked ? "1" : "0";
    setFormData({ ...formData, reminder_days_of_week: days.join("") });
  };

  // 处理时间选择
  const handleTimeChange = (time) => {
    const formattedTime = time
      ? time.toISOString().split("T")[1].substring(0, 8)
      : "00:00:00";
    setFormData({ ...formData, reminder_time: formattedTime });
  };

  // 提交处理
  const handleSubmit = () => {
    const finalData = {
      ...formData,
      reminder_time: formData.reminder_time || "00:00:00",
    };
    onSave(finalData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>编辑提醒设置</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1, alignItems: "center" }}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              disabled
              label="提醒ID"
              value={formData.reminder_id || ""}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              disabled
              fullWidth
              label="用户ID"
              value={formData.uid || ""}
              InputProps={{ readOnly: true }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TimePicker
              disabled
              label="提醒时间"
              value={new Date(`1970-01-01T${formData.reminder_time}`)}
              onChange={handleTimeChange}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.is_active || false}
                  onChange={(e) =>
                    setFormData({ ...formData, is_active: e.target.checked })
                  }
                />
              }
              label="启用提醒"
            />
          </Grid>

          <Grid item xs={12}>
            <Grid container spacing={2}>
              {weekDays.map((day, index) => (
                <Grid item xs={3} sm={2} key={day}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={
                          formData.reminder_days_of_week?.charAt(index) === "1"
                        }
                        onChange={(e) => {
                          const newDays = (
                            formData.reminder_days_of_week || "0000000"
                          ).split("");
                          newDays[index] = e.target.checked ? "1" : "0";
                          setFormData({
                            ...formData,
                            reminder_days_of_week: newDays.join(""),
                          });
                          console.log(formData);
                        }}
                        color="primary"
                      />
                    }
                    label={day}
                    sx={{
                      "& .MuiFormControlLabel-label": {
                        // 标签样式
                        fontSize: "0.875rem",
                        color: "text.primary",
                      },
                    }}
                  />
                </Grid>
              ))}
            </Grid>
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

export default RemindModalPopup;
