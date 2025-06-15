import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import { socialCommentColumns } from "../internals/data/commentsgridData";
import CommentModalPopup from "./CommentModalPopup";
import axios from "axios";

export default function CustomizedDataGrid() {
  const [rows, setRows] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [modalOpen, setModalOpen] = React.useState(false);

  // 获取评论数据
  const fetchComments = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://127.0.0.1:8000/api/flat-comments/"
      );
      setRows(response.data);
    } catch (error) {
      console.error("获取评论数据失败:", error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchComments();
  }, []);

  const handleEditClick = (row) => {
    setSelectedRow(row);
    setModalOpen(true);
  };

  const handleSave = async (updatedData) => {
    try {
      console.log("更新评论数据:", updatedData);
      // 发送更新请求
      await axios.put(
        `http://127.0.0.1:8000/api/comments/${updatedData.interact_id}/`,
        updatedData
      );
      // 更新成功后刷新数据
      fetchComments();
      setModalOpen(false);
    } catch (error) {
      console.error("更新评论失败:", error);
    }
  };

  return (
    <div>
      <DataGrid
        checkboxSelection
        loading={loading}
        rows={rows}
        getRowId={(row) => row.interact_id}
        columns={socialCommentColumns.map((col) =>
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
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
        }
        initialState={{
          pagination: { paginationModel: { pageSize: 20 } },
        }}
        pageSizeOptions={[10, 20, 50]}
        disableColumnResize
        density="compact"
        getRowHeight={() => 80}
        sx={{
          "& .MuiDataGrid-cell": {
            display: "flex !important",
            alignItems: "center",
            padding: "8px 16px",
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
      <CommentModalPopup
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        initialData={selectedRow}
        onSave={handleSave}
      />
    </div>
  );
}
