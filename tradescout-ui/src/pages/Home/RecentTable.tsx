import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { useEffect } from "react";
import SkeletonTable from "../../components/Skeleton/SkeletonTable";
import { useGetRecent } from "../../hooks/Business/useGetRecent/useGetRecent";
import { useToast } from "../../hooks/useToast/useToast";

const RecentTable = () => {
  const toast = useToast();
  const { data: recent, isFetching, isPending, error } = useGetRecent();

  useEffect(() => {
    if (error) {
      toast.error(error.message || "An error occurred while fetching data.");
    }
  }, [error, toast]);

  if (isFetching || isPending || error) {
    return <SkeletonTable />;
  }

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Amount</TableCell>
          <TableCell>Type</TableCell>
          <TableCell>Details</TableCell>
          <TableCell>Date recieved</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {recent.map((row) => (
          <TableRow key={row.id}>
            <TableCell>£ {row.amount}</TableCell>
            <TableCell>{row.type}</TableCell>
            <TableCell>{row.reference || row.description}</TableCell>
            <TableCell>{row.dateReceived.split("T")[0]}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default RecentTable;
