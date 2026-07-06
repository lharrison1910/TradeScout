import { IconButton, Menu, MenuItem } from "@mui/material";
import type { GridColDef } from "@mui/x-data-grid";
import { useState } from "react";
import { MoreVertOutlined } from "@mui/icons-material";

const ActionMenu = ({ params, editIncome, openDeleteModal }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <IconButton onClick={handleClick}>
        <MoreVertOutlined />
      </IconButton>
      <Menu open={open} onClose={handleClose} anchorEl={anchorEl}>
        <MenuItem
          onClick={() => {
            handleClose();
            editIncome(params.row);
          }}
        >
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            openDeleteModal();
          }}
        >
          Delete
        </MenuItem>
      </Menu>
    </>
  );
};

export const columns = (openDeleteModal, editIncome): GridColDef[] => [
  {
    field: "actions",
    headerName: "",
    sortable: false,
    hideable: false,
    maxWidth: 20,
    renderCell: (params) => (
      <ActionMenu
        params={params}
        editIncome={editIncome}
        openDeleteModal={openDeleteModal}
      />
    ),
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
