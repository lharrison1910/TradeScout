import { Delete, ExpandMore } from "@mui/icons-material";
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
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Autocomplete,
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
import Button from "../Button/Button";
import { useState, useEffect } from "react";

interface OSMPlace {
  place_id: number;
  display_name: string;
}

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

  const textFieldSx = { width: "40%" };
  const accordianDetailSx = {
    display: "flex",
    flexDirection: "column",
    gap: 1,
  };

  return (
    <Modal
      open={open}
      handleClose={closeModal}
      title="New Invoice"
      handleSave={saveInvoice}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {/* invoice details */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography>Invoice Details</Typography>
          </AccordionSummary>
          <AccordionDetails sx={accordianDetailSx}>
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
                  sx={textFieldSx}
                />
              )}
            />
            <Box sx={{ display: "flex", gap: 0.2 }}>
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
                          format="DD/MM/YYYY"
                          label={UpperCaseLabel(field.name)}
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
                    if (
                      dayjs(value).isBefore(dayjs(currentInvoiceDate), "day")
                    ) {
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
                          format="DD/MM/YYYY"
                          label={UpperCaseLabel(field.name)}
                          slotProps={{
                            textField: {
                              error: !!fieldState.error,
                              helperText: fieldState.error?.message,
                              sx: {
                                backgroundColor: "#f5f5f5",
                                borderRadius: 1,
                              },
                            },
                          }}
                        />
                      </LocalizationProvider>
                    </>
                  );
                }}
              />
            </Box>
          </AccordionDetails>
        </Accordion>
        {/*customer details */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography>Customer Details</Typography>
          </AccordionSummary>
          <AccordionDetails sx={accordianDetailSx}>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Controller
                name="customer_name"
                control={control}
                rules={{ required: "Customer Name is required", minLength: 5 }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    label={UpperCaseLabel(field.name)}
                    sx={textFieldSx}
                  />
                )}
              />
              <Controller
                name="customer_address"
                control={control}
                rules={{ required: "Customer address is required" }}
                render={({ field: { onChange, value, ref }, fieldState }) => (
                  <Autocomplete
                    fullWidth
                    options={options}
                    getOptionLabel={(option) => option.display_name || ""}
                    isOptionEqualToValue={(option, value) =>
                      option.place_id === value.place_id
                    }
                    value={
                      options.find((opt) => opt.display_name === value) || null
                    }
                    loading={loading}
                    onInputChange={(event, newInputValue) => {
                      setInputValue(newInputValue);
                    }}
                    onChange={(event, newValue) => {
                      onChange(newValue ? newValue.display_name : "");
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        inputRef={ref}
                        label="Customer Address"
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                        // InputProps={{
                        //   ...params.InputProps,
                        //   endAdornment: (
                        //     <>
                        //       {loading ? (
                        //         <CircularProgress color="inherit" size={20} />
                        //       ) : null}
                        //       {params.InputProps.endAdornment}
                        //     </>
                        //   ),
                        // }}
                      />
                    )}
                  />
                )}
              />
            </Box>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Controller
                name="customer_phone"
                control={control}
                rules={{
                  required: "Customer Phone number is required",
                  pattern: {
                    value: /^\+?[0-9\s\-()]{7,15}$/,
                    message: "Please enter a valid phone number",
                  },
                }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    type="tel"
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    label={UpperCaseLabel(field.name)}
                    sx={textFieldSx}
                  />
                )}
              />
              <Controller
                name="customer_email"
                control={control}
                rules={{
                  required: "Customer email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Please enter a valid email address",
                  },
                }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    label={UpperCaseLabel(field.name)}
                    sx={textFieldSx}
                  />
                )}
              />
            </Box>
          </AccordionDetails>
        </Accordion>
        {/* job details  */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography>Job Details</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ ...accordianDetailSx, flexDirection: "row" }}>
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
                  sx={textFieldSx}
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
          </AccordionDetails>
        </Accordion>
        {/* materials  */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography>Materials</Typography>
          </AccordionSummary>
          <AccordionDetails>
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
                        render={({
                          field: { onChange, ...field },
                          fieldState,
                        }) => (
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
          </AccordionDetails>
        </Accordion>
        {/* payment details  */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography>Payment Details</Typography>
          </AccordionSummary>
          <AccordionDetails sx={accordianDetailSx}>
            <Box sx={{ display: "flex", gap: 2 }}>
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
                    sx={textFieldSx}
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
                    sx={textFieldSx}
                  />
                )}
              />
            </Box>
            <Box sx={{ display: "flex", gap: 2 }}>
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
                    sx={textFieldSx}
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
                    sx={textFieldSx}
                  />
                )}
              />
            </Box>
          </AccordionDetails>
        </Accordion>
        {/*Bank Details */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography>Bank Details</Typography>
          </AccordionSummary>
          <AccordionDetails sx={accordianDetailSx}>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Controller
                name="bank_name"
                control={control}
                rules={{ required: "Bank name is Required" }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    label={UpperCaseLabel(field.name)}
                    sx={textFieldSx}
                  />
                )}
              />
              <Controller
                name="account_name"
                control={control}
                rules={{ required: "Account details required is Required" }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    label={UpperCaseLabel(field.name)}
                    sx={textFieldSx}
                  />
                )}
              />
            </Box>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Controller
                name="sort_code"
                control={control}
                rules={{ required: "Account details required is Required" }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    label={UpperCaseLabel(field.name)}
                    sx={textFieldSx}
                  />
                )}
              />
              <Controller
                name="account_number"
                control={control}
                rules={{ required: "Account details required is Required" }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    label={UpperCaseLabel(field.name)}
                    sx={textFieldSx}
                  />
                )}
              />
            </Box>

            <Controller
              name="payment_terms_days"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  error={!!formState.errors.payment_terms_days}
                  label={UpperCaseLabel(field.name)}
                  disabled
                  sx={textFieldSx}
                />
              )}
            />
          </AccordionDetails>
        </Accordion>
      </Box>
    </Modal>
  );
};

export default InvoiceModal;
