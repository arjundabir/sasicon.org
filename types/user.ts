export interface User {
  id: string;
  first_name: string;
  last_name: string;
  raffle_tickets: number;
  wants_certificate: boolean;
  workshops: string[];
  is_admin: boolean;
}