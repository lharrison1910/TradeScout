import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  Skeleton,
  TableBody,
} from "@mui/material";

const SkeletonTable = () => (
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>
          <Skeleton variant="text" width="60%" />
        </TableCell>
        <TableCell>
          <Skeleton variant="text" width="40%" />
        </TableCell>
        <TableCell>
          <Skeleton variant="text" width="80%" />
        </TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {[1, 2, 3, 4].map((index) => (
        <TableRow key={index}>
          <TableCell>
            <Skeleton
              variant="rectangular"
              sx={{ width: "50px", height: 20, borderRadius: 1 }}
            />
          </TableCell>
          <TableCell>
            <Skeleton
              variant="rectangular"
              sx={{ width: "70px", height: 20, borderRadius: 4 }}
            />
          </TableCell>
          <TableCell>
            <Skeleton variant="text" width="90%" height={20} />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export default SkeletonTable;
