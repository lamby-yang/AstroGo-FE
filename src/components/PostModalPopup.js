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
  IconButton,
  InputAdornment,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

const statusOptions = [
  { value: "pass", label: "通过" },
  { value: "fail", label: "未通过" },
  { value: "pending", label: "未审核" },
];

export default function PostModalPopup({ open, onClose, initialData, onSave }) {
  const initialFormData = initialData
    ? {
        ...initialData,
        post_image: Array.isArray(initialData.post_image)
          ? initialData.post_image
          : initialData.post_image
          ? [initialData.post_image]
          : [],
      }
    : { post_image: [] };

  const [formData, setFormData] = React.useState(initialFormData);

  React.useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        post_image: Array.isArray(initialData.post_image)
          ? initialData.post_image
          : initialData.post_image
          ? [initialData.post_image]
          : [],
      });
    } else {
      setFormData({ post_image: [] });
    }
  }, [initialData, open]);

  // 处理表单变更
  const handleChange = (name) => (event) => {
    setFormData({ ...formData, [name]: event.target.value });
  };

  // 处理图片URL变更
  const handleImageChange = (index) => (event) => {
    const newImages = [...formData.post_image];
    newImages[index] = event.target.value;
    setFormData({ ...formData, post_image: newImages });
  };

  // 删除图片
  const removeImage = (index) => () => {
    const newImages = formData.post_image.filter((_, i) => i !== index);
    setFormData({ ...formData, post_image: newImages });
  };

  // 提交表单
  const handleSubmit = () => {
    const cleanedData = {
      ...formData,
      post_image: formData.post_image
        ? formData.post_image.filter((url) => url && url.trim() !== "")
        : [],
    };
    onSave(cleanedData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>编辑帖子信息</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              disabled
              label="帖子ID"
              value={formData.post_id || ""}
              InputProps={{ readOnly: true }}
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              disabled
              fullWidth
              label="用户ID"
              value={formData.uid || ""}
              InputProps={{ readOnly: true }}
              sx={{ mb: 2 }}
            />
          </Grid>

          <Grid item xs={15}>
            <TextField
              disabled
              fullWidth
              label="帖子标题"
              value={formData.post_title || ""}
              onChange={handleChange("post_title")}
              inputProps={{ maxLength: 20 }}
              helperText={`${formData.post_title?.length || 0}/20`}
              required
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              disabled
              fullWidth
              label="帖子内容"
              multiline
              value={formData.post_content || ""}
              onChange={handleChange("post_content")}
              inputProps={{ maxLength: 150 }}
              helperText={`${formData.post_content?.length || 0}/150`}
              required
              sx={{
                mb: 2,
                flexGrow: 1,
                "& .MuiInputBase-root": {
                  height: "100%",
                  alignItems: "flex-start",
                },
                "& textarea": {
                  resize: "vertical",
                  minHeight: "70px",
                  overflowY: "auto",
                },
              }}
            />
          </Grid>

          {/* 动态图片编辑 */}
          <Grid item xs={12}>
            <Typography variant="subtitle2" gutterBottom>
              图片链接（最多5张）:
            </Typography>
            {/* 修复3: 安全的数组处理 */}
            {formData.post_image &&
              formData.post_image.map((url, index) => (
                <Grid container spacing={1} key={index} sx={{ mb: 1 }}>
                  <Grid item xs={11}>
                    <TextField
                      fullWidth
                      disabled
                      value={url}
                      onChange={handleImageChange(index)}
                      placeholder="输入图片URL"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <span style={{ color: "#666" }}>{index + 1}.</span>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={1}>
                    <IconButton onClick={removeImage(index)}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Grid>
                </Grid>
              ))}
          </Grid>

          {/* 审核状态和点赞数 */}
          <Grid item xs={6}>
            <TextField
              select
              fullWidth
              label="审核状态"
              value={formData.verification_status || ""}
              onChange={handleChange("verification_status")}
              sx={{ mb: 2 }}
            >
              {statusOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="点赞数"
              disabled
              type="number"
              value={formData.like_count || 0}
              onChange={handleChange("like_count")}
              InputProps={{ inputProps: { min: 0 } }}
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          取消
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          保存设置
        </Button>
      </DialogActions>
    </Dialog>
  );
}
