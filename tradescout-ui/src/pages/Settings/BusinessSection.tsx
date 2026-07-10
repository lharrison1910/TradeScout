import { Edit, Delete, Add } from "@mui/icons-material";
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  IconButton,
  TableFooter,
  Button,
} from "@mui/material";
import { useState } from "react";
import BusinessModal from "../../components/BusinessModal/BusinessModal";
import { useDeleteBusiness } from "../../hooks/Business/useDeleteBusiness/useDeleteBusiness";
import { usePutBusiness } from "../../hooks/Business/usePutBusiness/usePostBusiness";
import { usePostBusiness } from "../../hooks/Business/usePostBusiness/usePostBusiness";

const BusinessSection = ({ businesses }) => {
  const { mutate: deleteBusiness } = useDeleteBusiness();
  const { mutate: putBusiness } = usePutBusiness();
  const { mutate: postBusiness } = usePostBusiness();
  const [modal, setModal] = useState<boolean>(false);
  const [form, setForm] = useState();

  const handleEdit = (businessId: string) => {
    setForm(businesses.find((business) => business.id === businessId));
    setModal(true);
  };

  const handleAddNew = () => {
    setForm(undefined);
    setModal(true);
  };

  return (
    <Box sx={{ m: 2 }}>
      <Typography variant="h3">Business details</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="center">Tax reference</TableCell>
            <TableCell align="center">Edit</TableCell>
            <TableCell align="center">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {businesses.map((business) => (
            <TableRow key={business.id}>
              <TableCell align="center">
                <TextField value={business.name} disabled={true} />
              </TableCell>
              <TableCell align="center">
                <TextField value={business.taxReference} disabled={true} />
              </TableCell>
              <TableCell align="center">
                <IconButton onClick={() => handleEdit(business.id)}>
                  <Edit />
                </IconButton>
              </TableCell>
              <TableCell align="center">
                <IconButton onClick={() => deleteBusiness(business.id)}>
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <Box>
            <Button endIcon={<Add />} onClick={handleAddNew}>
              Add Row
            </Button>
          </Box>
        </TableFooter>
      </Table>
      <BusinessModal
        open={modal}
        handleClose={() => setModal(false)}
        data={form}
        handleSave={form ? putBusiness : postBusiness}
      />
    </Box>
  );
};

export default BusinessSection;
