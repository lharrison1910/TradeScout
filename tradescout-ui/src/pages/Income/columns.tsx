import type { GridColDef } from "@mui/x-data-grid";

export const columns = (): GridColDef[] => [
  {
    field: "dateReceived",
    headerName: "Date Recieved",
    maxWidth: 100,
    sortable: true,
  },
  {
    field: "amount",
    headerName: "Amount (£)",
    sortable: true,
  },
  {
    field: "category",
    headerName: "Category",
    sortable: true,
  },
  {
    field: "paymentMethod",
    headerName: "Payment type",
    sortable: true,
  },
  {
    field: "jobReference",
    headerName: "Job Reference",
    sortable: true,
  },
];
