import { useMutation } from "@tanstack/react-query";
import { invoiceApiClient } from "../../api/InvoiceApiClient";
import type { NewInvoiceRequestSchema } from "../../types/invoiceSchema";

export const useNewInvoice = () =>
  useMutation({
    mutationKey: ["NewInvoice"],
    mutationFn: (payload: NewInvoiceRequestSchema) =>
      invoiceApiClient.createInvoice({
        businessId: "b673b581-7720-4a0f-ae71-609db7fc6fd6",
        invoiceNumber: "INV-0001",
        invoice_date: "2026-07-27T08:00:00.000Z",
        due_date: "2026-08-26T08:00:00.000Z",
        customer_name: "Sarah Jenkins",
        customer_address: "42 Privet Drive, Little Whinging, Surrey",
        customer_phone: "07700 900461",
        customer_email: "sarah.jenkins@example.com",
        job_location: "En-suite Bathroom",
        job_reference: "PO-9921",
        materials: [
          {
            description: "15mm Copper Pipe (3m)",
            quantity: 4,
            unit: "length",
            unit_price: 12.5,
            line_total: 50.0,
          },
          {
            description: "Thermostatic Mixer Shower Valve",
            quantity: 1,
            unit: "item",
            unit_price: 145.0,
            line_total: 145.0,
          },
          {
            description: "Labor (Standard Rate)",
            quantity: 6,
            unit: "hours",
            unit_price: 45.0,
            line_total: 270.0,
          },
        ],
        subtotal: 465.0,
        vat_amount: 93.0,
        discount: 0.0,
        amount_due: 558.0,
        bank_name: "Barclays",
        account_name: "TradeScout Plumbing Ltd",
        sort_code: "20-45-14",
        account_number: "10293847",
        payment_terms_days: 30,
      }),
  });
