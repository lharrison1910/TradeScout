import { Delete } from "@mui/icons-material";
import {
  Box,
  Typography,
  TextField,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  TableFooter,
  Autocomplete,
  Grid,
  Divider,
  Paper,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { useState, useEffect } from "react";
import type { NewInvoiceRequestSchema } from "../../types/invoiceSchema";
import { UpperCaseLabel } from "../../utils/inputFieldNameTidy";
import Modal from "../Modal/Modal";
import { useNewInvoice } from "../../hooks/Invoice/useNewInvoice";
import { useEditInvoice } from "../../hooks/Invoice/useEditInvoice";
import Button from "../Button/Button";
import { useAuth } from "../../hooks/useAuth/useAuth";

interface OSMPlace {
  place_id: number;
  display_name: string;
}

interface InvoiceModalProps {
  open: boolean;
  handleClose: () => void;
  invoiceToEdit?: (NewInvoiceRequestSchema & { id: number }) | null; // <-- Optional edit prop
}

const InvoiceModal = ({
  open,
  handleClose,
  invoiceToEdit,
}: InvoiceModalProps) => {
  const { user, selectedBusiness } = useAuth();
  const { mutateAsync: newInvoice } = useNewInvoice();
  const { mutateAsync: updateInvoice } = useEditInvoice();

  const isEditing = Boolean(invoiceToEdit);

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

  useEffect(() => {
    if (!open) return;

    if (invoiceToEdit) {
      reset({
        ...invoiceToEdit,
        invoice_date: dayjs(invoiceToEdit.invoice_date),
        due_date: dayjs(invoiceToEdit.due_date),
      });
    } else {
      const currentBusiness = user?.businesses?.find(
        (business) => business.id === selectedBusiness,
      );

      reset({
        ...defaultValues,
        bank_name: currentBusiness?.bankName || "",
        account_name: currentBusiness?.bankAccountName || "",
        sort_code: currentBusiness?.bankSortCode || "",
        account_number: currentBusiness?.bankAccountNumber || "",
      });
    }
  }, [open, invoiceToEdit, user, selectedBusiness, reset]);

  const closeModal = () => {
    reset(defaultValues);
    handleClose();
  };

  const saveInvoice = handleSubmit(async (data) => {
    console.log(isEditing, invoiceToEdit.id);
    if (isEditing && invoiceToEdit?.id) {
      await updateInvoice({ id: invoiceToEdit.id, ...data });
    } else {
      await newInvoice(data);
    }
    closeModal();
  });

  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState<OSMPlace[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (inputValue.length < 3) {
      setOptions([]);
      return;
    }

    setLoading(true);

    const delayDebounceFn = setTimeout(async () => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
            inputValue,
          )}&format=json&addressdetails=1&countrycodes=gb`,
        );
        const data = await response.json();
        setOptions(data);
      } catch (error) {
        console.error("Error fetching addresses:", error);
      } finally {
        setLoading(false);
      }
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [inputValue]);

  const watchedMaterials = watch("materials");
  const watchedDiscount = watch("discount");
  const watchedVatRate = watch("vat_rate");

  useEffect(() => {
    if (!watchedMaterials) return;

    const calculatedSubtotal = watchedMaterials.reduce((sum, item) => {
      return sum + (Number(item.line_total) || 0);
    }, 0);

    const discountAmount = Number(watchedDiscount) || 0;
    const vatRate = Number(watchedVatRate) || 20;
    const calculatedVat = calculatedSubtotal * (vatRate / 100);
    const calculatedTotal = calculatedSubtotal + calculatedVat - discountAmount;

    setValue("subtotal", calculatedSubtotal.toFixed(2));
    setValue("vat_amount", calculatedVat.toFixed(2));
    setValue("amount_due", calculatedTotal.toFixed(2));
  }, [watchedMaterials, watchedDiscount, watchedVatRate, setValue]);

  return (
    <Modal
      open={open}
      handleClose={closeModal}
      title={isEditing ? "Edit Invoice" : "New Invoice"}
      handleSave={saveInvoice}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 4, p: 1 }}>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h6" gutterBottom color="primary">
              Job & Invoice Details
            </Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Controller
                  name="invoice_number"
                  control={control}
                  rules={{ required: "Invoice Number is required" }}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label={UpperCaseLabel(field.name)}
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                    />
                  )}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Controller
                  name="job_reference"
                  control={control}
                  rules={{ required: "A reference is required" }}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label={UpperCaseLabel(field.name)}
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                    />
                  )}
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Controller
                  name="job_location"
                  control={control}
                  rules={{ required: "Location is required" }}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label={UpperCaseLabel(field.name)}
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                    />
                  )}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Controller
                  name="invoice_date"
                  control={control}
                  rules={{ required: "Invoice date is required" }}
                  render={({
                    field: { ref, onChange, value, ...field },
                    fieldState,
                  }) => (
                    <LocalizationProvider
                      dateAdapter={AdapterDayjs}
                      adapterLocale="en-gb"
                    >
                      <DatePicker
                        {...field}
                        format="DD/MM/YYYY"
                        label={UpperCaseLabel(field.name)}
                        value={value}
                        inputRef={ref}
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            error: !!fieldState.error,
                            helperText: fieldState.error?.message,
                          },
                        }}
                        onChange={(newDate) => {
                          onChange(newDate);
                          if (newDate) {
                            setValue("due_date", dayjs(newDate).add(14, "day"));
                          }
                        }}
                      />
                    </LocalizationProvider>
                  )}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Controller
                  name="due_date"
                  control={control}
                  rules={{
                    required: "Due date is required",
                    validate: (value) => {
                      if (
                        dayjs(value).isBefore(dayjs(currentInvoiceDate), "day")
                      )
                        return "Must be on/after invoice date";
                      return true;
                    },
                  }}
                  render={({ field, fieldState }) => (
                    <LocalizationProvider
                      dateAdapter={AdapterDayjs}
                      adapterLocale="en-gb"
                    >
                      <DatePicker
                        {...field}
                        readOnly
                        format="DD/MM/YYYY"
                        label={UpperCaseLabel(field.name)}
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            error: !!fieldState.error,
                            helperText: fieldState.error?.message,
                            sx: { backgroundColor: "#f5f5f5", borderRadius: 1 },
                          },
                        }}
                      />
                    </LocalizationProvider>
                  )}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h6" gutterBottom color="primary">
              Customer Details
            </Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12 }}>
                <Controller
                  name="customer_name"
                  control={control}
                  rules={{
                    required: "Customer Name is required",
                    minLength: 5,
                  }}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label={UpperCaseLabel(field.name)}
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                    />
                  )}
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Controller
                  name="customer_address"
                  control={control}
                  rules={{ required: "Customer address is required" }}
                  render={({ field: { onChange, value, ref }, fieldState }) => (
                    <Autocomplete
                      fullWidth
                      options={options}
                      getOptionLabel={(option) => option.display_name || ""}
                      isOptionEqualToValue={(option, val) =>
                        option.place_id === val.place_id
                      }
                      value={
                        options.find((opt) => opt.display_name === value) ||
                        (value
                          ? ({ display_name: value, place_id: 0 } as OSMPlace)
                          : null)
                      }
                      loading={loading}
                      onInputChange={(_, newInputValue) =>
                        setInputValue(newInputValue)
                      }
                      onChange={(_, newValue) =>
                        onChange(newValue ? newValue.display_name : "")
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          inputRef={ref}
                          label="Customer Address"
                          error={!!fieldState.error}
                          helperText={fieldState.error?.message}
                        />
                      )}
                    />
                  )}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Controller
                  name="customer_phone"
                  control={control}
                  rules={{
                    required: "Customer Phone number is required",
                    pattern: {
                      value: /^\+?[0-9\s\-()]{7,15}$/,
                      message: "Invalid phone number",
                    },
                  }}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      fullWidth
                      type="tel"
                      label={UpperCaseLabel(field.name)}
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                    />
                  )}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Controller
                  name="customer_email"
                  control={control}
                  rules={{
                    required: "Customer email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Invalid email address",
                    },
                  }}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label={UpperCaseLabel(field.name)}
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Divider />

        <Box>
          <Typography variant="h6" gutterBottom color="primary">
            Materials & Services
          </Typography>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell align="center" width="15%">
                  Quantity
                </TableCell>
                <TableCell align="center" width="15%">
                  Unit Price (£)
                </TableCell>
                <TableCell align="center" width="15%">
                  Total (£)
                </TableCell>
                <TableCell align="center" width="5%">
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {fields.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <Controller
                      name={`materials.${index}.description`}
                      control={control}
                      rules={{ required: "Description required" }}
                      render={({ field, fieldState }) => (
                        <TextField
                          {...field}
                          fullWidth
                          size="small"
                          error={!!fieldState.error}
                          helperText={fieldState.error?.message}
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
                        min: { value: 1, message: "Min 1" },
                      }}
                      render={({
                        field: { onChange, ...field },
                        fieldState,
                      }) => (
                        <TextField
                          {...field}
                          fullWidth
                          size="small"
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
                          slotProps={{ htmlInput: { min: 1, step: "1" } }}
                        />
                      )}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Controller
                      name={`materials.${index}.unit_price`}
                      control={control}
                      rules={{
                        required: "Required",
                        min: { value: 0.01, message: "Min 0.01" },
                      }}
                      render={({
                        field: { onChange, ...restField },
                        fieldState,
                      }) => (
                        <TextField
                          {...restField}
                          fullWidth
                          size="small"
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
                          slotProps={{ htmlInput: { min: 0.01, step: "0.01" } }}
                        />
                      )}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Controller
                      name={`materials.${index}.line_total`}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          size="small"
                          disabled
                          type="number"
                          error={
                            !!formState.errors.materials?.[index]?.line_total
                          }
                        />
                      )}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      onClick={() => remove(index)}
                      color="error"
                      size="small"
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={5}>
                  <Button
                    onClick={() =>
                      append({
                        description: "",
                        quantity: 1,
                        unit_price: 0.01,
                        line_total: 1,
                      })
                    }
                    title="Add Material/Service"
                  />
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </Box>

        <Divider />

        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h6" gutterBottom color="primary">
              Bank Details
            </Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Controller
                  name="bank_name"
                  control={control}
                  rules={{ required: "Bank name required" }}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      fullWidth
                      disabled
                      label={UpperCaseLabel(field.name)}
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                    />
                  )}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Controller
                  name="account_name"
                  control={control}
                  rules={{ required: "Account details required" }}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      fullWidth
                      disabled
                      label={UpperCaseLabel(field.name)}
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                    />
                  )}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Controller
                  name="sort_code"
                  control={control}
                  rules={{ required: "Sort code required" }}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      fullWidth
                      disabled
                      label={UpperCaseLabel(field.name)}
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                    />
                  )}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Controller
                  name="account_number"
                  control={control}
                  rules={{ required: "Account number required" }}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      fullWidth
                      disabled
                      label={UpperCaseLabel(field.name)}
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                    />
                  )}
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Controller
                  name="payment_terms_days"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      disabled
                      label={UpperCaseLabel(field.name)}
                      error={!!formState.errors.payment_terms_days}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                bgcolor: "#f8fafc",
                borderRadius: 2,
                border: "1px solid #e2e8f0",
              }}
            >
              <Typography variant="h6" gutterBottom color="primary">
                Payment Summary
              </Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Controller
                    name="subtotal"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        disabled
                        label={UpperCaseLabel(field.name)}
                      />
                    )}
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <Controller
                    name="vat_amount"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        disabled
                        label={UpperCaseLabel(field.name)}
                      />
                    )}
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <Controller
                    name="discount"
                    control={control}
                    rules={{
                      required: "Required",
                      min: { value: 0, message: "Cannot be negative" },
                    }}
                    render={({ field: { onChange, ...field }, fieldState }) => (
                      <TextField
                        {...field}
                        fullWidth
                        type="number"
                        label={UpperCaseLabel(field.name)}
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                        onChange={(e) => {
                          onChange(parseFloat(e.target.value) || 0);
                        }}
                      />
                    )}
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <Controller
                    name="amount_due"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        disabled
                        label={UpperCaseLabel(field.name)}
                        sx={{
                          "& .MuiInputBase-input.Mui-disabled": {
                            WebkitTextFillColor: "#1976d2",
                            fontWeight: "bold",
                          },
                        }}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default InvoiceModal;
