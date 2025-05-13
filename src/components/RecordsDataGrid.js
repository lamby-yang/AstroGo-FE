import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  exerciseRecordColumns,
  exerciseRecordRows,
} from "../internals/data/recordsgridData";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import RecordModalPopup from "./RecordModalPopup";

export default function CustomizedDataGrid() {
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [modalOpen, setModalOpen] = React.useState(false);

  const handleEditClick = (row) => {
    setSelectedRow(row);
    setModalOpen(true);
  };

  const handleSave = (updatedData) => {
    // 这里处理保存逻辑，比如API调用
    console.log("更新后的数据:", updatedData);
  };
  return (
    <div>
      <DataGrid
        // checkboxSelection
        rows={exerciseRecordRows}
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
      <RecordModalPopup
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        initialData={selectedRow}
        onSave={handleSave}
      />
    </div>
  );
}
