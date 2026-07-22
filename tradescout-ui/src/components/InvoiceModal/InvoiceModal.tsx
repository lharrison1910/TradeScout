import { useState } from "react";
import Modal from "../Modal/Modal";
import { Box, Divider } from "@mui/material";

import type { NewInvoiceRequestSchema } from "../../types/invoiceSchema";
import {
  BankDetails,
  CustomerDetails,
  InvoiceDetails,
  JobDetails,
  MaterialsTable,
  PaymentDetails,
} from "./InvoiceForm";

const InvoiceModal = ({ open, handleClose, handleSave }) => {
  const initialFormState: NewInvoiceRequestSchema = {
    businessId: "",
    invoice_number: "",
    invoice_date: new Date().toISOString().split("T")[0],
    due_date: "",
    customer_name: "",
    customer_address: "",
    customer_phone: "",
    customer_email: "",
    job_location: "",
    job_reference: "",
    materials: [],
    subtotal: "0.00",
    vat_rate: "20",
    vat_amount: "0.00",
    discount: "0.00",
    amount_due: "0.00",
    bank_name: "",
    account_name: "",
    sort_code: "",
    account_number: "",
    payment_terms_days: "14",
  };
  const [formData, setFormData] =
    useState<NewInvoiceRequestSchema>(initialFormState);

  const closeModal = () => {
    setFormData(initialFormState);
    handleClose();
  };

  const handleChange = (name: string, value: unknown) => {
    setFormData({
      ...formData,
      [name]: value,
      amount_due: String(
        Number(formData.subtotal) +
          Number(formData.vat_amount) -
          Number(formData.discount),
      ),
    });
  };

  const saveInvoice = () => {
    handleSave(formData);
    closeModal();
  };

  return (
    <Modal
      open={open}
      handleClose={closeModal}
      title="New Invoice"
      handleSave={() => saveInvoice()}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <InvoiceDetails formData={formData} handleChange={handleChange} />
        <Divider />
        <CustomerDetails formData={formData} handleChange={handleChange} />
        <Divider />
        <JobDetails formData={formData} handleChange={handleChange} />
        <Divider />
        <MaterialsTable />
        <Divider />
        <PaymentDetails formData={formData} handleChange={handleChange} />
        <Divider />
        <BankDetails formData={formData} handleChange={handleChange} />
        <Divider />
      </Box>
    </Modal>
  );
};

export default InvoiceModal;
