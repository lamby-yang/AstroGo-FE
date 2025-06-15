import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { exerciseRecordColumns } from "../internals/data/recordsgridData";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, LinearProgress, Snackbar, Alert } from "@mui/material";
import RecordModalPopup from "./RecordModalPopup";
import axios from "axios";

export default function CustomizedDataGrid({ userId }) {
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [rows, setRows] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [saving, setSaving] = React.useState(false);
  const [notification, setNotification] = React.useState({
    open: false,
    message: "",
    severity: "info",
  });

  // 从 API 获取用户运动记录
  React.useEffect(() => {
    const fetchRecords = async () => {
      if (!userId) return;

      try {
        setLoading(true);
        const response = await axios.get(
          `http://127.0.0.1:8000/api/ranking/exercise-records/${userId}/`
        );

        if (response.data.code === 0 && response.data.data) {
          const formattedRows = response.data.data.map((record) => ({
            id: record.record_id,
            ...record,
          }));
          console.log("格式化后的数据:", formattedRows);
          setRows(formattedRows);
        } else {
          throw new Error(response.data.msg || "无法获取运动记录");
        }
      } catch (err) {
        setError(err);
        console.error("获取运动记录失败:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecords();
  }, [userId]);

  // 处理编辑点击
  const handleEditClick = (row) => {
    setSelectedRow(row);
    setModalOpen(true);
  };

  // 处理保存更新 - 修复为异步函数
  const handleSave = async (updatedData) => {
    try {
      setSaving(true);

      // 创建数据副本并清理不需要的字段
      const payload = { ...updatedData };
      delete payload.id; // 删除前端添加的id字段

      console.log("发送更新请求:", payload);
      // 发送 PUT 请求
      const response = await axios.put(
        `http://127.0.0.1:8000/api/ranking/exercise-record/${payload.record_id}/`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // 检查响应状态
      if (response.data.code === 0) {
        console.log("记录更新成功:", response.data);

        // 更新本地状态
        setRows(
          rows.map((row) =>
            row.id === updatedData.id
              ? {
                  ...row,
                  ...response.data.data,
                }
              : row
          )
        );

        // 关闭模态框
        setModalOpen(false);

        // 显示成功通知
        setNotification({
          open: true,
          message: "记录更新成功",
          severity: "success",
        });
      } else {
        // 处理API业务逻辑错误
        throw new Error(response.data.msg || "更新记录失败");
      }
    } catch (error) {
      console.error("更新记录失败:", error);

      // 显示错误通知
      setNotification({
        open: true,
        message: `更新失败: ${error.message || "服务器错误"}`,
        severity: "error",
      });
    } finally {
      setSaving(false);
    }
    setRows(
      rows.map((row) =>
        row.id === updatedData.id ? { ...row, ...updatedData } : row
      )
    );
  };

  // 处理通知关闭
  const handleNotificationClose = () => {
    setNotification({ ...notification, open: false });
  };

  // 如果出现错误，显示错误信息
  if (error) {
    return (
      <div style={{ padding: 20, color: "red" }}>
        加载数据时出错: {error.message}
      </div>
    );
  }

  return (
    <div style={{ height: 600, width: "100%" }}>
      <DataGrid
        checkboxSelection
        rows={rows}
        columns={exerciseRecordColumns.map((col) =>
          col.field === "actions"
            ? {
                ...col,
                renderCell: (params) => (
                  <IconButton
                    sx={{
                      maxHeight: 25,
                      maxWidth: 25,
                      "& > svg": {
                        fontSize: "1rem",
                      },
                    }}
                    onClick={() => handleEditClick(params.row)}
                  >
                    <EditIcon />
                  </IconButton>
                ),
              }
            : col
        )}
        loading={loading || saving}
        components={{
          LoadingOverlay: LinearProgress,
          Toolbar: GridToolbar,
        }}
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
        }
        initialState={{
          pagination: { paginationModel: { pageSize: 20 } },
        }}
        pageSizeOptions={[10, 20, 50]}
        disableColumnResize
        density="compact"
        slotProps={{
          filterPanel: {
            filterFormProps: {
              logicOperatorInputProps: {
                variant: "outlined",
                size: "small",
              },
              columnInputProps: {
                variant: "outlined",
                size: "small",
                sx: { mt: "auto" },
              },
              operatorInputProps: {
                variant: "outlined",
                size: "small",
                sx: { mt: "auto" },
              },
              valueInputProps: {
                InputComponentProps: {
                  variant: "outlined",
                  size: "small",
                },
              },
            },
          },
        }}
      />

      {/* 通知组件 */}
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleNotificationClose}
      >
        <Alert
          severity={notification.severity}
          onClose={handleNotificationClose}
          variant="filled"
        >
          {notification.message}
        </Alert>
      </Snackbar>

      <RecordModalPopup
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        initialData={selectedRow}
        onSave={handleSave}
        saving={saving}
      />
    </div>
  );
}
