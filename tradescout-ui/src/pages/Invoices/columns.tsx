import { MoreVertOutlined } from "@mui/icons-material";
import { IconButton, Menu, MenuItem } from "@mui/material";
import type { GridColDef } from "@mui/x-data-grid";
import { useState } from "react";
import { useDeleteDraft } from "../../hooks/Invoice/useDeleteInvoiceDraft";
import { useDownloadInvoice } from "../../hooks/Invoice/useDownloadInvoice";

const ActionMenu = ({
  params,
  setSelectedId,
  openEditModal,
}: {
  params: any;
  setSelectedId: (newId) => void;
  openEditModal: (editableInvoice) => void;
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const { mutateAsync: deleteDraft } = useDeleteDraft();

  const { mutate: downloadInvoice } = useDownloadInvoice();

  const options = [
    {
      label: "Preview",
      onClick: (id: number) => setSelectedId(id),
    },
    {
      label: "Edit",
      onClick: () => {
        openEditModal({ ...params.row.snapshotData, id: params.row.id });
      },
    },
    {
      label: params.row.issuedAt ? "Void" : "Delete",
      onClick: () => {
        if (!params.row.issuedAt) {
          deleteDraft(params.row.id);
        } else {
        }
      },
    },
    {
      // label: params.row.issuedAt ? "Download" : "Issue",
      label: "Download",
      onClick: () => {
        downloadInvoice(params.row.id);
      },
    },
  ];

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleOptionClick = (func) => {
    func(params.row.id);
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton onClick={handleButtonClick}>
        <MoreVertOutlined />
      </IconButton>
      <Menu open={open} onClose={() => setAnchorEl(null)} anchorEl={anchorEl}>
        {options.map((option, index) => {
          if (option.label === "Edit" && params.row.status !== "DRAFT") {
            return null;
          }

          return (
            <MenuItem
              key={index}
              onClick={() => handleOptionClick(option.onClick)}
            >
              {option.label}
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
};

export const getColumns = ({ setSelectedId, openEditModal }): GridColDef[] => [
  {
    field: "actions",
    headerName: "",
    width: 50,
    renderCell: (params) => (
      <ActionMenu
        params={params}
        setSelectedId={setSelectedId}
        openEditModal={openEditModal}
      />
    ),
  },
  {
    field: "invoiceNumber",
    headerName: "Invoice Number",
    sortable: true,
    width: 150,
  },
  {
    field: "customerName",
    headerName: "Customer Name",
    sortable: true,
    width: 150,
  },
  {
    field: "totalAmount",
    headerName: "Total Amount",
    sortable: true,
    width: 150,
    renderCell: (params) => {
      const amount = Number(params.row.totalAmount);
      return (
        <>
          {new Intl.NumberFormat("en-GB", {
            style: "currency",
            currency: "GBP",
          }).format(amount)}
        </>
      );
    },
  },
  {
    field: "status",
    headerName: "Status",
    sortable: true,
    width: 150,
    renderCell: (params) => {
      const { issuedAt, status } = params.row;

      if (!issuedAt) {
        return <span>{status}</span>;
      }

      if (status === "PAID") {
        return <span style={{ color: "green" }}>{status}</span>;
      }

      const issueDate = new Date(issuedAt);
      const today = new Date();
      const diffInDays =
        (today.getTime() - issueDate.getTime()) / (1000 * 3600 * 24);

      if (diffInDays > 14) {
        return <span style={{ color: "red" }}>{status}</span>;
      }

      if (diffInDays > 7 && diffInDays <= 14) {
        return <span style={{ color: "#d97706" }}>{status}</span>;
      }

      return <span>{status}</span>;
    },
  },
  {
    field: "issuedAt",
    headerName: "Date Issued",
    sortable: true,
    width: 175,
    renderCell(params) {
      if (params.row.issuedAt) {
        return <>{params.row.issuedAt.split("T")[0]}</>;
      } else {
        return <>Not yet issued</>;
      }
    },
  },
  {
    field: "createdAt",
    headerName: "Date Created",
    sortable: true,
    width: 150,
    renderCell: (params) => {
      return <>{params.row.createdAt.split("T")[0]}</>;
    },
  },
];
