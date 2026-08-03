import { MoreVertOutlined } from "@mui/icons-material";
import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import type { GridColDef } from "@mui/x-data-grid";
import dayjs from "dayjs";
import { useState, type ReactElement } from "react";

export const columns = (getPreview, payInvoice): GridColDef[] => [
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
      };

      return (
        <>
          <IconButton onClick={handleButtonClick}>
            <MoreVertOutlined />
          </IconButton>
          <Menu open={open} onClose={handleClose} anchorEl={anchorEl}>
            <MenuItem>Issue</MenuItem>
            <MenuItem onClick={() => payInvoice(params.row.id)}>Paid</MenuItem>
            <MenuItem>Edit</MenuItem>
            <MenuItem>
              {params.row.status !== "DRAFT" ? "Void" : "Delete"}
            </MenuItem>
            <MenuItem>Download</MenuItem>
            <MenuItem onClick={() => getPreview(params.row.id)}>
              Preview
            </MenuItem>
          </Menu>
        </>
      );
    },
  },
  {
    field: "invoiceNumber",
    headerName: "Invoice Number",
    sortable: true,
    width: 90,
  },
  {
    field: "customerName",
    headerName: "Customer Name",
    sortable: true,
    width: 150,
  },
  {
    field: "CustomerAddress",
    headerName: "Customer Address",
    sortable: true,
    width: 150,
    valueGetter: (_value, row) => {
      const address = row.snapshotData.customer_address.split(",")[0];
      return address;
    },
  },
  {
    field: "totalAmount",
    headerName: "Amount Due (£)",
    sortable: true,
  },
  {
    field: "status",
    headerName: "Status",
    sortable: true,
  },
  {
    field: "issuedAt",
    headerName: "Date issued",
    renderCell(params) {
      if (params.row.issuedAt) {
        return <>{params.row.issuedAt.split("T")[0]}</>;
      } else {
        return <>Not yet issued</>;
      }
    },
    width: 150,
  },
  {
    field: "dueDate",
    headerName: "Due Date",
    renderCell(params) {
      if (params.row.issuedAt) {
        const dueDate = dayjs(params.row.issuedAt).add(14, "day");

        const today = dayjs().startOf("day");
        const normalizedDueDate = dueDate.startOf("day");

        const daysUntilDue = normalizedDueDate.diff(today, "day");

        let bgColor = "transparent";

        if (params.row.status !== "paid") {
          if (daysUntilDue <= 0) {
            bgColor = "#ffebee";
          } else if (daysUntilDue <= 5) {
            bgColor = "#fff8e1";
          }
        }

        return (
          <Box
            sx={{
              backgroundColor: bgColor,
              padding: "4px 8px",
              borderRadius: 1,
              width: "100%",
              display: "flex",
              alignItems: "center",
            }}
          >
            {dueDate.format("DD/MM/YYYY")}
          </Box>
        );
      } else {
        return <>Not yet issued</>;
      }
    },
    width: 150,
  },
  {
    field: "business",
    headerName: "Business",
    renderCell(params) {
      return <>{params.row.business.name}</>;
    },
    flex: 1,
  },
];
