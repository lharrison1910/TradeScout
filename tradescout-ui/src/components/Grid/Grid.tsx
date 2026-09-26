import { DataGrid, type GridColDef } from "@mui/x-data-grid";

interface GridProps {
  columns: GridColDef[];
  rows: any;
}

const Grid = ({ columns, rows }: GridProps) => {
  return (
    <DataGrid
      columns={columns}
      rows={rows}
      disableRowSelectionOnClick
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 5,
          },
        },
      }}
      pageSizeOptions={[5]}
      sx={{
        width: "fit-content",
        maxWidth: "90%",
      }}
    />
  );
};

export default Grid;
