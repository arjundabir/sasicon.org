export interface User {
  id: string;
  first_name: string;
  last_name: string;
  raffle_tickets: number;
  wants_certificate: boolean;
  workshops: string[];
  is_admin: boolean;
  school_email: string;
  food_tickets: number;
  checked_in: Date;
  vote: number | null;
}

export interface UserDatabase{
  public:{
    Tables :{
      users:{
        Row: User
      }
      
    }
  }
}