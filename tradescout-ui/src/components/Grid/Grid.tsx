import { DataGrid, type GridColDef } from "@mui/x-data-grid";

interface GridProps {
  columns: GridColDef[];
  rows: any;
}

const Grid = ({ columns, rows }: GridProps) => {
  return <DataGrid columns={columns} rows={rows} checkboxSelection />;
};

export default Grid;
