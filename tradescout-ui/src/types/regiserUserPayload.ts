export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  business: {
    businessName: string;
    vatNumber?: string;
    taxReference?: string;
    bankName?: string;
    bankAccountName?: string;
    bankAccountNumber?: string;
    bankSortCode?: string;
  };
}