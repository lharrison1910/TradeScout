import { IconButton, Menu, MenuItem } from "@mui/material";
import type { GridColDef } from "@mui/x-data-grid";
import { type ReactElement, useState } from "react";
import { MoreVertOutlined } from "@mui/icons-material";

export const columns = (setData, closeModal): GridColDef[] => [
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
            <MenuItem>Delete</MenuItem>
          </Menu>
        </>
      );
    },
    maxWidth: 20,
  },
  {
    field: "dateReceived",
    headerName: "Date Recieved",
    width: 110,
    sortable: true,
    renderCell(params) {
      return <>{params.row.dateReceived.split("T")[0]}</>;
    },
  },
  {
    field: "amount",
    headerName: "Amount (£)",
    sortable: true,
    // maxWidth: 100,
  },
  {
    field: "category",
    headerName: "Category",
    sortable: true,
    // maxWidth: 100,
  },
  {
    field: "paymentMethod",
    headerName: "Payment type",
    sortable: true,
    // maxWidth: 100,
  },
  {
    field: "jobReference",
    headerName: "Job Reference",
    sortable: true,
    // maxWidth: 100,
  },
];
