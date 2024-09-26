export interface Panel {
    id: string;
    user_id: string;
    question: string;
    status: "Pending" | "Approved" | "Rejected" | "Modified" | "Asked" | null;
    message: string | null;
}

