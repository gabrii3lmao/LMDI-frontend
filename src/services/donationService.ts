import api from "./api";
import type {
  CreateDonationRequest,
  CreateDonationResponse,
  DonationStatusResponse,
} from "@/types/Donation";

export const donationService = {
  criarDoacao: (data: CreateDonationRequest) =>
    api.post<CreateDonationResponse>("/payments/donations", data),

  consultarDoacao: (id: string) =>
    api.get<DonationStatusResponse>(`/payments/donations/${id}`),
};
