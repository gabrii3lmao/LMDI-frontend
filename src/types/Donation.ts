export type BillingType = "CREDIT_CARD" | "PIX" | "BOLETO";

export type DonationStatus =
  | "pending"
  | "paid"
  | "failed"
  | "expired"
  | "cancelled";

export interface CreateDonationRequest {
  name: string;
  email: string;
  amountCents: number;
  recurring: boolean;
  billingType: BillingType;
  /** CPF/CNPJ obrigatório — usado pelo ASAAS para criar a cobrança. */
  cpfCnpj: string;
}

export interface CreateDonationResponse {
  id: string;
  amountCents: number;
  billingType: BillingType;
  recurring: boolean;
  status: DonationStatus;
  /** URL hospedada do ASAAS (invoiceUrl) — o pagador é redirecionado para cá. */
  paymentUrl?: string;
  /** Para doações recorrentes, ID da assinatura no ASAAS. */
  subscriptionId?: string;
}

export interface DonationStatusResponse {
  id: string;
  customerName: string;
  customerEmail: string;
  amountCents: number;
  currency: string;
  billingType: BillingType;
  recurring: boolean;
  status: DonationStatus;
  createdAt: string;
  expiresAt?: string;
}
