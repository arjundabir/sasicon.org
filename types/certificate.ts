export interface Certificate {
  user_id: number;
  certificate_type: "digital" | "physical";
  email: string;
  country?: string;
  city?: string;
  region?: string;
  postal_code?: string;
}