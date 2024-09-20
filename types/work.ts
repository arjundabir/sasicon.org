export interface Work {
  id: number;
  timestamp: string;
  email_address: string;
  first_last_name: string;
  year?: string;
  majors?: string;
  submission_type: string;
  category?: string;
  meaning?: string;
  choice?: string;
  title: string;
  submission_link: string;
  description?: string;
  votes: number;
}
