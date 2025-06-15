import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { socialMediaColumns } from "../internals/data/postgridData";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, CircularProgress, Alert } from "@mui/material";
import PostModalPopup from "./PostModalPopup";
import axios from "axios";

export default function CustomizedDataGrid() {
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [posts, setPosts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [updateMessage, setUpdateMessage] = React.useState(null);

  const createProcessedColumns = () => {
    return socialMediaColumns.map((col) => {
      if (col.type === "dateTime") {
        return {
          ...col,
          valueGetter: (params) =>
            params.value ? new Date(params.value) : null,
        };
      }

      if (col.field === "post_image") {
        const originalRenderCell = col.renderCell;
        return {
          ...col,
          renderCell: (params) => {
            const images = params.value || [];
            const safeParams = {
              ...params,
              value: images,
            };
            return originalRenderCell ? originalRenderCell(safeParams) : null;
          },
        };
      }

      if (col.field === "actions") {
        return {
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
        };
      }

      return col;
    });
  };
  const processedColumns = createProcessedColumns();
  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get("http://127.0.0.1:8000/api/posts/", {});

      if (response.status >= 200 && response.status < 300) {
        setPosts(response.data);
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          err.response?.data?.message ||
          err.message ||
          "无法获取帖子数据"
      );
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchPosts();
  }, []);

  const handleEditClick = (row) => {
    setSelectedRow(row);
    setModalOpen(true);
  };

  const handleSave = async (updatedData) => {
    try {
      setUpdateMessage(null);
      const payload = {
        uid: updatedData.uid,
        post_id: updatedData.post_id, 
        verification_status: updatedData.verification_status,
        post_title: updatedData.post_title,
        post_content: updatedData.post_content,
        post_image:
          updatedData.post_image && updatedData.post_image.length > 0
            ? JSON.stringify(
                Array.isArray(updatedData.post_image)
                  ? updatedData.post_image
                  : updatedData.post_image
                  ? [updatedData.post_image]
                  : []
              )
            : null,
      };

      const response = await axios.put(
        `http://127.0.0.1:8000/api/posts/${updatedData.post_id}/`,
        payload
      );
      fetchPosts();
      setModalOpen(false);
    } catch (error) {
      console.error("更新失败", error);

      let errorMessage = "更新失败，请重试";

      if (error.response?.data) {
        console.error("错误响应:", error.response.data);

        if (error.response.data) {
          if (typeof error.response.data === "object") {
            errorMessage = Object.entries(error.response.data)
              .map(
                ([field, errors]) =>
                  `${field}: ${
                    Array.isArray(errors) ? errors.join(", ") : errors
                  }`
              )
              .join("; ");
          } else {
            errorMessage = error.response.data.toString();
          }
        }
      } else if (error.message) {
        errorMessage = error.message;
      }

      setUpdateMessage({
        type: "error",
        content: errorMessage,
      });
    }
  };

  return (
    <div>
      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}
      {updateMessage && (
        <Alert
          severity={updateMessage.type}
          onClose={() => setUpdateMessage(null)}
          sx={{ mb: 2 }}
        >
          {updateMessage.content}
        </Alert>
      )}

      <DataGrid
        checkboxSelection
        rows={posts}
        getRowId={(row) => row.post_id}
        columns={processedColumns}
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
        }
        initialState={{
          pagination: { paginationModel: { pageSize: 20 } },
        }}
        pageSizeOptions={[10, 20, 50]}
        disableColumnResize
        density="compact"
        getRowHeight={() => 120}
        sx={{
          "& .MuiDataGrid-cell": {
            display: "flex !important",
            alignItems: "center",
            padding: "8px 16px",
          },
          "& .MuiDataGrid-columnSeparator": {
            display: "none",
          },
        }}
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
      <PostModalPopup
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        initialData={selectedRow}
        onSave={handleSave}
      />
    </div>
  );
}
