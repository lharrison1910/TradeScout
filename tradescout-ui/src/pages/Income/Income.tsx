import {
  Box,
  Button,
  CircularProgress,
  Modal,
  Typography,
} from "@mui/material";
import { useGetIncome } from "../../hooks/useGetIncome/useGetIncome";
import Grid from "../../components/Grid/Grid";
import { columns } from "./columns";
import { useState } from "react";
import IncomeModal from "../../components/IncomeModal/IncomeModal";

const IncomePage = () => {
  const { data: income, isLoading } = useGetIncome();
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [incomeModal, setIncomeModal] = useState<boolean>(false);
  const [selectedIncome, setSelectedIncome] = useState();

  const openDeleteModal = () => setDeleteModal(true);
  const closeDeleteModal = () => setDeleteModal(false);

  const openIncomeModal = () => setIncomeModal(true);
  const closeIncomeModal = () => {
    setIncomeModal(false);
    setSelectedIncome(null);
  };

  const handleEditIncome = (editIncome) => {
    console.log(editIncome);
    setSelectedIncome(editIncome);
    openIncomeModal();
  };

  if (isLoading) {
    return <CircularProgress />;
  }
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography>Your Income</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            width: "75%",
            justifyContent: "flex-end",
            gap: 2,
            mb: 1,
          }}
        >
          <Button onClick={openIncomeModal} variant="contained">
            Add New Income
          </Button>
          <Button variant="contained">Export this Quarter</Button>
        </Box>

        <Box sx={{ width: "75%", maxHeight: "75%" }}>
          <Grid
            columns={columns(openDeleteModal, handleEditIncome)}
            rows={income}
          />
        </Box>
      </Box>
      <DeleteModal open={deleteModal} handleClose={closeDeleteModal} />
      <IncomeModal
        open={incomeModal}
        handleClose={closeIncomeModal}
        data={selectedIncome}
      />
    </>
  );
};

export default IncomePage;

const DeleteModal = ({ open, handleClose }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "80%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,

    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 2,
  };
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography>Are you sure you want to delete?</Typography>
        <Button variant="contained">Delete</Button>
        <Button variant="contained" onClick={handleClose}>
          Cancel
        </Button>
      </Box>
    </Modal>
  );
};
