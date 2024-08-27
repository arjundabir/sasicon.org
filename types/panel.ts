export interface Panel {
    id: number;
    user_id: string;
    question: string;
    status: "Pending" | "Approved" | "Rejected" | "Modified" | "Asked" | null;
}

