import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { remindColumns } from "../internals/data/remindsgridData";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import RemindModalPopup from "./RemindModalPopup";
import axios from "axios"; // 导入 axios

export default function CustomizedDataGrid({ userId }) {
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [reminders, setReminders] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  // 获取API数据
  React.useEffect(() => {
    const fetchReminders = async () => {
      try {
        setLoading(true);

        // 使用 axios 替代 fetch
        const response = await axios.get(
          `http://127.0.0.1:8000/api/reminders/${userId}/`
        );

        // 检查状态码 - axios 不会自动抛出非200错误
        if (response.status >= 200 && response.status < 300) {
          setReminders(response.data);
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      } catch (err) {
        setError(
          err.response?.data?.message ||
            err.response?.data?.detail ||
            err.message ||
            "Unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchReminders();
  }, [userId]);

  const handleEditClick = (row) => {
    setSelectedRow(row);
    setModalOpen(true);
  };

  const handleSave = async (updatedData) => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/reminder/${updatedData.reminder_id}/`,
        updatedData
      );
      const updatedReminder = response.data.data;

      if (response.status === 200) {
        setReminders((prev) =>
          prev.map((r) =>
            r.reminder_id === updatedData.reminder_id ? updatedReminder : r
          )
        );
        setModalOpen(false);
      }
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  return (
    <div>
      {error ? (
        <div>Error: {error}</div>
      ) : (
        <DataGrid
          checkboxSelection
          loading={loading}
          rows={reminders}
          getRowId={(row) => row.reminder_id}
          columns={remindColumns.map((col) =>
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
      )}
      <RemindModalPopup
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        initialData={selectedRow}
        onSave={handleSave}
      />
    </div>
  );
}
