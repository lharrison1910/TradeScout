import { Delete } from "@mui/icons-material";
import {
  Box,
  Typography,
  TextField,
  Divider,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  TableFooter,
  Button,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth/useAuth";
import type { NewInvoiceRequestSchema } from "../../types/invoiceSchema";
import { UpperCaseLabel } from "../../utils/inputFieldNameTidy";
import Modal from "../Modal/Modal";
import { useNewInvoice } from "../../hooks/Invoice/useNewInvoice";

const InvoiceModal = ({ open, handleClose }) => {
  const { mutateAsync: newInvoice } = useNewInvoice();
  const defaultValues: NewInvoiceRequestSchema = {
    invoice_number: "",
    invoice_date: dayjs(),
    due_date: dayjs().add(12, "day"),
    customer_name: "",
    customer_address: "",
    customer_phone: "",
    customer_email: "",
    job_location: "",
    job_reference: "",
    materials: [
      {
        description: "",
        quantity: 1,
        unit_price: 0.01,
        line_total: 1,
      },
    ],
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
  const {
    control,
    formState,
    handleSubmit,
    reset,
    setValue,
    getValues,
    watch,
  } = useForm<NewInvoiceRequestSchema>({
    mode: "onChange",
    defaultValues,
    criteriaMode: "all",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "materials",
  });
  const currentInvoiceDate = watch("invoice_date");

  const closeModal = () => {
    reset();
    handleClose();
  };

  const saveInvoice = handleSubmit(async (data) => {
    await newInvoice(data);
    closeModal();
  });

  const { user, selectedBusiness } = useAuth();
  const businessName = user.businesses.find(
    (business) => business.id === selectedBusiness,
  ).name;

  return (
    <Modal
      open={open}
      handleClose={closeModal}
      title="New Invoice"
      handleSave={saveInvoice}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {/* Invoice details  */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
          <Typography>Invoice Details</Typography>

          <Typography>Current Business: {businessName}</Typography>

          <Controller
            name="invoice_number"
            control={control}
            rules={{ required: "Invoice Number is required" }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                label={UpperCaseLabel(field.name)}
              />
            )}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              width: "100%",
            }}
          >
            <Controller
              name="invoice_date"
              control={control}
              rules={{
                required: "Invoice date is required",
                validate: (value) => {
                  if (dayjs(value).isBefore(dayjs(), "day")) {
                    return "Invoice date cannot be in the past";
                  }
                  return true;
                },
              }}
              render={({
                field: { ref, onChange, value, ...field },
                fieldState,
              }) => {
                return (
                  <>
                    <LocalizationProvider
                      dateAdapter={AdapterDayjs}
                      adapterLocale="en-gb"
                    >
                      <DatePicker
                        {...field}
                        value={value}
                        inputRef={ref}
                        disablePast
                        slotProps={{
                          textField: {
                            error: !!fieldState.error,
                            helperText: fieldState.error?.message,
                          },
                        }}
                        onChange={(newDate) => {
                          onChange(newDate);

                          if (newDate) {
                            const calculatedDueDate = dayjs(newDate).add(
                              14,
                              "day",
                            );
                            setValue("due_date", calculatedDueDate, {});
                          }
                        }}
                      />
                    </LocalizationProvider>
                  </>
                );
              }}
            />
            <Controller
              name="due_date"
              control={control}
              rules={{
                required: "Due date is required",
                validate: (value) => {
                  if (dayjs(value).isBefore(dayjs(), "day")) {
                    return "Due date cannot be in the past";
                  }
                  if (dayjs(value).isBefore(dayjs(currentInvoiceDate), "day")) {
                    return "Due date must be on or after the invoice date";
                  }
                  return true;
                },
              }}
              render={({ field, fieldState }) => {
                return (
                  <>
                    <LocalizationProvider
                      dateAdapter={AdapterDayjs}
                      adapterLocale="en-gb"
                    >
                      <DatePicker
                        {...field}
                        readOnly
                        slotProps={{
                          textField: {
                            error: !!fieldState.error,
                            helperText: fieldState.error?.message,
                            sx: { backgroundColor: "#f5f5f5", borderRadius: 1 },
                          },
                        }}
                      />
                    </LocalizationProvider>
                  </>
                );
              }}
            />
          </Box>
        </Box>
        <Divider />

        {/* customer details  */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 0.5,
          }}
        >
          <Typography>Customer Details</Typography>
          <Box sx={{ justifyContent: "space-evenly" }}>
            <Controller
              name="customer_name"
              control={control}
              rules={{ required: "Customer Name is required" }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  label={UpperCaseLabel(field.name)}
                />
              )}
            />
            <Controller
              name="customer_address"
              control={control}
              rules={{ required: "Customer address is required" }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  label={UpperCaseLabel(field.name)}
                />
              )}
            />
          </Box>
          <Box sx={{ justifyContent: "space-evenly" }}>
            <Controller
              name="customer_phone"
              control={control}
              rules={{ required: "Customer Phone number is required" }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  label={UpperCaseLabel(field.name)}
                />
              )}
            />
            <Controller
              name="customer_email"
              control={control}
              rules={{ required: "Customer email is required" }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  label={UpperCaseLabel(field.name)}
                />
              )}
            />
          </Box>
        </Box>
        <Divider />

        {/* job details  */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography>Job Details</Typography>
          <Controller
            name="job_location"
            control={control}
            rules={{ required: "Location is required" }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                label={UpperCaseLabel(field.name)}
              />
            )}
          />
          <Controller
            name="job_reference"
            control={control}
            rules={{ required: "A reference is required" }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                label={UpperCaseLabel(field.name)}
              />
            )}
          />
        </Box>
        <Divider />

        {/* materials  */}
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="center">Unit Price (£)</TableCell>
              <TableCell align="center">Total</TableCell>
              <TableCell align="center">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fields.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell align="center">
                  <Controller
                    name={`materials.${index}.description`}
                    control={control}
                    rules={{ required: "A description is required" }}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                        label={UpperCaseLabel(field.name)}
                      />
                    )}
                  />
                </TableCell>
                <TableCell align="center">
                  <Controller
                    name={`materials.${index}.quantity`}
                    control={control}
                    rules={{
                      required: "Required",
                      min: { value: 1, message: "Must be at least 1" },
                    }}
                    render={({ field: { onChange, ...field }, fieldState }) => (
                      <TextField
                        {...field}
                        type="number"
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                        onChange={(e) => {
                          const qty = parseFloat(e.target.value) || 0;
                          onChange(qty);
                          const price =
                            getValues(`materials.${index}.unit_price`) || 0;
                          setValue(
                            `materials.${index}.line_total`,
                            parseFloat((qty * price).toFixed(2)),
                          );
                        }}
                        slotProps={{
                          htmlInput: { min: 1, step: "1" },
                        }}
                      />
                    )}
                  />
                </TableCell>

                {/* Unit Price */}
                <TableCell align="center">
                  <Controller
                    name={`materials.${index}.unit_price`}
                    control={control}
                    rules={{
                      required: "Required",
                      min: { value: 0.01, message: "Must be at least 1" },
                    }}
                    render={({
                      field: { onChange, ...restField },
                      fieldState,
                    }) => (
                      <TextField
                        {...restField}
                        type="number"
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                        onChange={(e) => {
                          const price = parseFloat(e.target.value) || 0;
                          onChange(price);
                          const qty =
                            getValues(`materials.${index}.quantity`) || 0;
                          setValue(
                            `materials.${index}.line_total`,
                            parseFloat((qty * price).toFixed(2)),
                          );
                        }}
                        slotProps={{
                          htmlInput: { min: 0.01, step: "0.01" },
                        }}
                      />
                    )}
                  />
                </TableCell>

                {/* Total */}
                <TableCell align="center">
                  <Controller
                    name={`materials.${index}.line_total`}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        disabled
                        type="number"
                        error={
                          !!formState.errors.materials?.[index]?.line_total
                        }
                      />
                    )}
                  />
                </TableCell>

                {/* Delete Button */}
                <TableCell align="center">
                  <IconButton onClick={() => remove(index)} color="error">
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <Button
              onClick={() =>
                append({
                  description: "",
                  quantity: 1,
                  unit_price: 0.01,
                  line_total: 1,
                })
              }
              title="Add Row"
            />
          </TableFooter>
        </Table>
        <Divider />

        {/* payment details  */}
        <Box sx={{ display: "flex" }}>
          <Typography>Payment Details</Typography>
          <Controller
            name="subtotal"
            control={control}
            rules={{
              required: "Required",
              min: { value: 0.01, message: "Must be at least 1" },
            }}
            render={({ field: { onChange, ...field }, fieldState }) => (
              <TextField
                {...field}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                label={UpperCaseLabel(field.name)}
                type="number"
                onChange={(e) => {
                  const subtotal = parseFloat(e.target.value) || 0;
                  onChange(subtotal);
                }}
                slotProps={{
                  htmlInput: { min: 0.01, step: "0.01" },
                }}
              />
            )}
          />
          <Controller
            name="vat_amount"
            control={control}
            rules={{
              required: "Required",
              min: { value: 0.01, message: "Must be at least 1" },
            }}
            render={({ field: { onChange, ...field }, fieldState }) => (
              <TextField
                {...field}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                label={UpperCaseLabel(field.name)}
                type="number"
                onChange={(e) => {
                  const vat = parseFloat(e.target.value) || 0;
                  onChange(vat);
                }}
                slotProps={{
                  htmlInput: { min: 0.01, step: "0.01" },
                }}
              />
            )}
          />
          <Controller
            name="discount"
            control={control}
            rules={{
              required: "Required",
              min: { value: 0.01, message: "Must be at least 1" },
            }}
            render={({ field: { onChange, ...field }, fieldState }) => (
              <TextField
                {...field}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                label={UpperCaseLabel(field.name)}
                type="number"
                onChange={(e) => {
                  const vat = parseFloat(e.target.value) || 0;
                  onChange(vat);
                }}
                slotProps={{
                  htmlInput: { min: 0.01, step: "0.01" },
                }}
              />
            )}
          />
          <Controller
            name="amount_due"
            control={control}
            rules={{
              required: "Required",
              min: { value: 0.01, message: "Must be at least 1" },
            }}
            render={({ field: { onChange, ...field }, fieldState }) => (
              <TextField
                {...field}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                label={UpperCaseLabel(field.name)}
                type="number"
                onChange={(e) => {
                  const vat = parseFloat(e.target.value) || 0;
                  onChange(vat);
                }}
                slotProps={{
                  htmlInput: { min: 0.01, step: "0.01" },
                }}
              />
            )}
          />
        </Box>
        <Divider />

        {/* bank details  */}
        <Box>
          <Typography>Bank Details</Typography>
          <Controller
            name="bank_name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                error={!!formState.errors.bank_name}
                label={UpperCaseLabel(field.name)}
              />
            )}
          />
          <Controller
            name="account_name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                error={!!formState.errors.account_name}
                label={UpperCaseLabel(field.name)}
              />
            )}
          />
          <Controller
            name="sort_code"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                error={!!formState.errors.sort_code}
                label={UpperCaseLabel(field.name)}
              />
            )}
          />
          <Controller
            name="account_number"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                error={!!formState.errors.account_name}
                label={UpperCaseLabel(field.name)}
              />
            )}
          />
          <Controller
            name="payment_terms_days"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                error={!!formState.errors.payment_terms_days}
                label={UpperCaseLabel(field.name)}
              />
            )}
          />
        </Box>
      </Box>
    </Modal>
  );
};

export default InvoiceModal;
