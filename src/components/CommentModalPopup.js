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
  Checkbox,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";

const CommentModalPopup = ({ open, onClose, initialData, onSave }) => {
  const [formData, setFormData] = React.useState({
    interact_id: "",
    post_id: "",
    uid: "",
    parent_id: "",
    content: "",
    interact_time: new Date(),
    is_deleted: false,
  });

  React.useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        interact_time: initialData.interact_time
          ? new Date(initialData.interact_time)
          : new Date(),
      });
    }
  }, [initialData, open]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleDateChange = (date) => {
    setFormData((prev) => ({
      ...prev,
      interact_time: date,
    }));
  };

  const handleSubmit = () => {
    onSave({
      ...formData,
      interact_time: formData.interact_time.toISOString(),
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {formData.interact_id ? "编辑评论" : "新建评论"}
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          {/* 只读信息 */}
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="评论ID"
              name="interact_id"
              value={formData.interact_id || ""}
              InputProps={{ readOnly: true }}
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              fullWidth
              label="帖子ID"
              name="post_id"
              value={formData.post_id || ""}
              InputProps={{ readOnly: true }}
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              fullWidth
              label="用户ID"
              name="uid"
              value={formData.uid || ""}
              InputProps={{ readOnly: true }}
            />
          </Grid>

          {/* 可编辑字段 */}
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="父评论ID"
              name="parent_id"
              value={formData.parent_id || ""}
              onChange={handleChange}
              type="number"
              helperText="留空表示顶级评论"
            />
          </Grid>

          <Grid item xs={6}>
            <DatePicker
              label="评论时间"
              value={formData.interact_time}
              onChange={handleDateChange}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="评论内容"
              name="content"
              value={formData.content || ""}
              onChange={handleChange}
              inputProps={{ maxLength: 50 }}
              helperText={`${formData.content?.length || 0}/50`}
              sx={{
                mb: 2,
                flexGrow: 1, // 关键属性：允许文本框扩展
                "& .MuiInputBase-root": {
                  height: "100%", // 输入区域高度填充
                  alignItems: "flex-start", // 顶部对齐
                },
                "& textarea": {
                  resize: "vertical", // 允许垂直拖动调整
                  minHeight: "20px", // 最小高度
                  overflowY: "auto", // 内容过多时显示滚动条
                },
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.is_deleted || false}
                  onChange={handleChange}
                  name="is_deleted"
                />
              }
              label="删除状态"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>取消</Button>
        <Button onClick={handleSubmit} variant="contained">
          保存
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CommentModalPopup;
