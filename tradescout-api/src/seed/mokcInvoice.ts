import { InvoiceStatusEnum } from "src/Invoice/InvoiceEnums";


export const mockInvoiceSeeds = [
  {
    invoiceNumber: "INV-2026-001",
    customerName: "Acme Corp Ltd",
    totalAmount: 342.00,
    status: InvoiceStatusEnum.PAID,
    issuedAt: new Date("2026-07-15T10:00:00Z"),
    snapshotData: {
      invoice_number: "INV-2026-001",
      invoice_date: "15/07/2026",
      due_date: "29/07/2026",
      customer_name: "Acme Corp Ltd",
      customer_address: "123 Business Rd, London, W1 1AA",
      customer_phone: "07700 900123",
      customer_email: "accounts@acmecorp.co.uk",
      job_location: "London Office - Floor 2 Breakroom",
      job_reference: "PO-9921-A",
      materials: [
        { description: "15mm Copper Pipe (m)", quantity: "10", unit_price: "4.50", total: "45.00" },
        { description: "Standard Labor Rate (hrs)", quantity: "4", unit_price: "60.00", total: "240.00" }
      ],
      subtotal: "285.00",
      vat_rate: "20",
      vat_amount: "57.00",
      discount: "0.00",
      amount_due: "342.00",
      bank_name: "Barclays",
      account_name: "My Plumbing Biz Ltd",
      sort_code: "20-00-00",
      account_number: "12345678",
      payment_terms_days: "14"
    }
  },
  {
    invoiceNumber: "INV-2026-002",
    customerName: "Sarah Jenkins",
    totalAmount: 135.00,
    status: InvoiceStatusEnum.DRAFT,
    issuedAt: undefined, 
    snapshotData: {
      invoice_number: "INV-2026-002",
      invoice_date: "04/08/2026",
      due_date: "04/08/2026",
      customer_name: "Sarah Jenkins",
      customer_address: "42 Willow Avenue, Manchester, M20 2AB",
      customer_phone: "07911 123456",
      customer_email: "s.jenkins.mock@email.com",
      job_location: "42 Willow Avenue, Manchester",
      job_reference: "Emergency Callout",
      materials: [
        { description: "Emergency Callout Fee", quantity: "1", unit_price: "150.00", total: "150.00" }
      ],
      subtotal: "150.00",
      vat_rate: "0", 
      vat_amount: "0.00",
      discount: "15.00", 
      amount_due: "135.00",
      bank_name: "Barclays",
      account_name: "My Plumbing Biz Ltd",
      sort_code: "20-00-00",
      account_number: "12345678",
      payment_terms_days: "0" 
    }
  },
  {
    invoiceNumber: "INV-2026-003",
    customerName: "TechNova Solutions",
    totalAmount: 1020.00,
    status: InvoiceStatusEnum.UNPAID,
    issuedAt: new Date("2026-08-03T14:30:00Z"),
    snapshotData: {
      invoice_number: "INV-2026-003",
      invoice_date: "03/08/2026",
      due_date: "02/09/2026",
      customer_name: "TechNova Solutions",
      customer_address: "Innovation Park, Cambridge, CB4 0WS",
      customer_phone: "01223 987654",
      customer_email: "finance@technova.co.uk",
      job_location: "Server Room A",
      job_reference: "Cooling System Overhaul",
      materials: [
        { description: "Industrial Extractor Fan", quantity: "2", unit_price: "250.00", total: "500.00" },
        { description: "Ducting (m)", quantity: "15", unit_price: "10.00", total: "150.00" },
        { description: "Labor (hrs)", quantity: "4", unit_price: "50.00", total: "200.00" }
      ],
      subtotal: "850.00",
      vat_rate: "20",
      vat_amount: "170.00",
      discount: "0.00",
      amount_due: "1020.00",
      bank_name: "Barclays",
      account_name: "My Plumbing Biz Ltd",
      sort_code: "20-00-00",
      account_number: "12345678",
      payment_terms_days: "30"
    }
  },
  {
    invoiceNumber: "INV-2026-004",
    customerName: "David Smith",
    totalAmount: 600.00,
    status: InvoiceStatusEnum.UNPAID, // Assuming you have an OVERDUE state
    issuedAt: new Date("2026-06-10T09:00:00Z"),
    snapshotData: {
      invoice_number: "INV-2026-004",
      invoice_date: "10/06/2026",
      due_date: "24/06/2026",
      customer_name: "David Smith",
      customer_address: "88 High Street, Bristol, BS1 4QA",
      customer_phone: "07888 111222",
      customer_email: "david.smith@example.com",
      job_location: "Main Bathroom",
      job_reference: "Shower Install",
      materials: [
        { description: "Thermostatic Shower Mixer", quantity: "1", unit_price: "300.00", total: "300.00" },
        { description: "Labor (hrs)", quantity: "4", unit_price: "50.00", total: "200.00" }
      ],
      subtotal: "500.00",
      vat_rate: "20",
      vat_amount: "100.00",
      discount: "0.00",
      amount_due: "600.00",
      bank_name: "Barclays",
      account_name: "My Plumbing Biz Ltd",
      sort_code: "20-00-00",
      account_number: "12345678",
      payment_terms_days: "14"
    }
  },
  {
    invoiceNumber: "INV-2026-005",
    customerName: "Green Gardens Ltd",
    totalAmount: 240.00,
    status: InvoiceStatusEnum.PAID,
    issuedAt: new Date("2026-07-20T11:15:00Z"),
    snapshotData: {
      invoice_number: "INV-2026-005",
      invoice_date: "20/07/2026",
      due_date: "19/08/2026",
      customer_name: "Green Gardens Ltd",
      customer_address: "Unit 4, Greenfield Estate, Leeds, LS1 2AB",
      customer_phone: "0113 456 7890",
      customer_email: "accounts@greengardens.co.uk",
      job_location: "Outdoor Tap Install",
      job_reference: "GG-2026-44",
      materials: [
        { description: "Outdoor Brass Tap", quantity: "1", unit_price: "50.00", total: "50.00" },
        { description: "Labor (hrs)", quantity: "3", unit_price: "50.00", total: "150.00" }
      ],
      subtotal: "200.00",
      vat_rate: "20",
      vat_amount: "40.00",
      discount: "0.00",
      amount_due: "240.00",
      bank_name: "Barclays",
      account_name: "My Plumbing Biz Ltd",
      sort_code: "20-00-00",
      account_number: "12345678",
      payment_terms_days: "30"
    }
  },
  {
    invoiceNumber: "INV-2026-006",
    customerName: "Emma Watson",
    totalAmount: 90.00,
    status: InvoiceStatusEnum.DRAFT,
    issuedAt: undefined,
    snapshotData: {
      invoice_number: "INV-2026-006",
      invoice_date: "04/08/2026",
      due_date: "11/08/2026",
      customer_name: "Emma Watson",
      customer_address: "15 Rose Lane, Oxford, OX2 6HG",
      customer_phone: "07777 888999",
      customer_email: "emma.w@email.com",
      job_location: "Kitchen Sink",
      job_reference: "Leak Repair",
      materials: [
        { description: "U-Bend Pipe", quantity: "1", unit_price: "15.00", total: "15.00" },
        { description: "Labor (hrs)", quantity: "1", unit_price: "60.00", total: "60.00" }
      ],
      subtotal: "75.00",
      vat_rate: "20",
      vat_amount: "15.00",
      discount: "0.00",
      amount_due: "90.00",
      bank_name: "Barclays",
      account_name: "My Plumbing Biz Ltd",
      sort_code: "20-00-00",
      account_number: "12345678",
      payment_terms_days: "7"
    }
  },
  {
    invoiceNumber: "INV-2026-007",
    customerName: "Blue Wave Plumbers (B2B)",
    totalAmount: 450.00,
    status: InvoiceStatusEnum.UNPAID,
    issuedAt: new Date("2026-08-01T08:00:00Z"),
    snapshotData: {
      invoice_number: "INV-2026-007",
      invoice_date: "01/08/2026",
      due_date: "31/08/2026",
      customer_name: "Blue Wave Plumbers (B2B)",
      customer_address: "Warehouse 2, Docks, Liverpool, L3 4BQ",
      customer_phone: "0151 222 3333",
      customer_email: "payable@bluewave.co.uk",
      job_location: "Subcontracting - Site B",
      job_reference: "Sub-092",
      materials: [
        { description: "Day Rate Subcontracting", quantity: "1.5", unit_price: "250.00", total: "375.00" }
      ],
      subtotal: "375.00",
      vat_rate: "20",
      vat_amount: "75.00",
      discount: "0.00",
      amount_due: "450.00",
      bank_name: "Barclays",
      account_name: "My Plumbing Biz Ltd",
      sort_code: "20-00-00",
      account_number: "12345678",
      payment_terms_days: "30"
    }
  },
  {
    invoiceNumber: "INV-2026-008",
    customerName: "The Royal Oak Pub",
    totalAmount: 1200.00,
    status: InvoiceStatusEnum.PAID,
    issuedAt: new Date("2026-06-25T16:45:00Z"),
    snapshotData: {
      invoice_number: "INV-2026-008",
      invoice_date: "25/06/2026",
      due_date: "09/07/2026",
      customer_name: "The Royal Oak Pub",
      customer_address: "1 High St, York, YO1 7LZ",
      customer_phone: "01904 555666",
      customer_email: "management@royaloakyork.co.uk",
      job_location: "Cellar",
      job_reference: "Boiler Service & Repair",
      materials: [
        { description: "Commercial Boiler Parts", quantity: "1", unit_price: "600.00", total: "600.00" },
        { description: "Labor (hrs)", quantity: "8", unit_price: "50.00", total: "400.00" }
      ],
      subtotal: "1000.00",
      vat_rate: "20",
      vat_amount: "200.00",
      discount: "0.00",
      amount_due: "1200.00",
      bank_name: "Barclays",
      account_name: "My Plumbing Biz Ltd",
      sort_code: "20-00-00",
      account_number: "12345678",
      payment_terms_days: "14"
    }
  },
  {
    invoiceNumber: "INV-2026-009",
    customerName: "James Taylor",
    totalAmount: 54.00,
    status: InvoiceStatusEnum.UNPAID,
    issuedAt: new Date("2026-07-01T10:30:00Z"),
    snapshotData: {
      invoice_number: "INV-2026-009",
      invoice_date: "01/07/2026",
      due_date: "15/07/2026",
      customer_name: "James Taylor",
      customer_address: "77 Park Road, Birmingham, B1 1AA",
      customer_phone: "07444 555666",
      customer_email: "jtaylor88@email.com",
      job_location: "Downstairs Toilet",
      job_reference: "Blockage Removal",
      materials: [
        { description: "Labor (Callout minimum)", quantity: "1", unit_price: "45.00", total: "45.00" }
      ],
      subtotal: "45.00",
      vat_rate: "20",
      vat_amount: "9.00",
      discount: "0.00",
      amount_due: "54.00",
      bank_name: "Barclays",
      account_name: "My Plumbing Biz Ltd",
      sort_code: "20-00-00",
      account_number: "12345678",
      payment_terms_days: "14"
    }
  },
  {
    invoiceNumber: "INV-2026-010",
    customerName: "City Library",
    totalAmount: 300.00,
    status: InvoiceStatusEnum.UNPAID,
    issuedAt: new Date("2026-08-02T13:00:00Z"),
    snapshotData: {
      invoice_number: "INV-2026-010",
      invoice_date: "02/08/2026",
      due_date: "01/09/2026",
      customer_name: "City Library",
      customer_address: "Civic Centre, Newcastle, NE1 8QH",
      customer_phone: "0191 232 4444",
      customer_email: "facilities@citylibrary.org",
      job_location: "Public Restrooms",
      job_reference: "Maintenance Contract",
      materials: [
        { description: "Monthly Maintenance Retainer", quantity: "1", unit_price: "250.00", total: "250.00" }
      ],
      subtotal: "250.00",
      vat_rate: "20",
      vat_amount: "50.00",
      discount: "0.00",
      amount_due: "300.00",
      bank_name: "Barclays",
      account_name: "My Plumbing Biz Ltd",
      sort_code: "20-00-00",
      account_number: "12345678",
      payment_terms_days: "30"
    }
  }
];