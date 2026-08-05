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
      const menuItems = [
        { title: "Issue", onClick: () => {} },
        { title: "Paid", onClick: () => payInvoice(params.row.id) },
        { title: "Edit", onClick: () => {} },
        { title: "Void", onClick: () => {} },
        { title: "Delete", onClick: () => {} },
        { title: "Download", onClick: () => {} },
        { title: "Preview", onClick: () => getPreview(params.row.id) },
      ];

      const filteredMenuItems = menuItems.filter((item) => {
        const status = params.row.status;
        const title = item.title;

        if (status === "PAID") {
          if (["Issue", "Paid", "Edit", "Delete"].includes(title)) {
            return false;
          }
        } else if (status === "DRAFT") {
          if (title === "Void") {
            return false;
          }
        } else {
          if (["Delete", "Edit"].includes(title)) {
            return false;
          }
        }

        return true;
      });

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
            {filteredMenuItems.map((row) => (
              <MenuItem key={row.title} onClick={row.onClick}>
                {row.title}
              </MenuItem>
            ))}
            {/* <MenuItem>Issue</MenuItem>
            <MenuItem onClick={() => payInvoice(params.row.id)}>Paid</MenuItem>
            <MenuItem>Edit</MenuItem>
            <MenuItem>
              {params.row.status !== "DRAFT" ? "Void" : "Delete"}
            </MenuItem>
            <MenuItem>Download</MenuItem>
            <MenuItem onClick={() => getPreview(params.row.id)}>
              Preview
            </MenuItem> */}
          </Menu>
        </>
      );
    },
    width: 15,
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
        return <>{dayjs(params.row.issuedAt).format("DD/MM/YYYY")}</>;
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

        if (params.row.status !== "PAID") {
          if (daysUntilDue <= 0) {
            bgColor = "#ffebee";
          } else if (daysUntilDue <= 5) {
            bgColor = "#fff8e1";
          }
        }
        if (params.row.status == "PAID") {
          bgColor = "#e9ffe1ff";
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
