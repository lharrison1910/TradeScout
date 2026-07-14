import { IconButton, Menu, MenuItem } from "@mui/material";
import type { GridColDef } from "@mui/x-data-grid";
import { type ReactElement, useState } from "react";
import { MoreVertOutlined } from "@mui/icons-material";

export const columns = (setData, closeModal, setDelete): GridColDef[] => [
  {
    field: "actions",
    headerName: "",
    sortable: false,
    hideable: false,
    renderCell: (params) => {
      const [anchorEl, setAnchorEl] = useState<ReactElement | null>(null);
      const open = Boolean(anchorEl);

      const handleButtonClick = (
        event: React.MouseEvent<HTMLButtonElement>,
      ) => {
        setAnchorEl(event.currentTarget);
      };

      const handleClose = () => {
        setAnchorEl(null);
        closeModal();
      };

      return (
        <>
          <IconButton onClick={handleButtonClick}>
            <MoreVertOutlined />
          </IconButton>
          <Menu open={open} onClose={handleClose} anchorEl={anchorEl}>
            <MenuItem onClick={() => setData(params.row)}>Edit</MenuItem>
            <MenuItem onClick={() => setDelete(params.row.id)}>Delete</MenuItem>
          </Menu>
        </>
      );
    },
    maxWidth: 20,
  },
  {
    field: "dateReceived",
    headerName: "Date Recieved",
    width: 130,
    sortable: true,
    flex: 1,
    renderCell(params) {
      return <>{params.row.dateReceived.split("T")[0]}</>;
    },
  },
  {
    field: "amount",
    headerName: "Amount (£)",
    sortable: true,
    flex: 1,
  },
  {
    field: "category",
    headerName: "Category",
    sortable: true,
    flex: 1,

    renderCell: (params) => {
      return <>{params.row.category.replaceAll("_", " ")}</>;
    },
    // maxWidth: 100,
  },
  {
    field: "paymentMethod",
    headerName: "Payment type",
    sortable: true,
    width: 120,
    flex: 1,
  },
  {
    field: "reference",
    headerName: "Job Reference",
    sortable: true,
    // maxWidth: 100,
    width: 120,
    flex: 1,
  },
];
