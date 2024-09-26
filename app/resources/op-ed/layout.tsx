import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div className="relative container mx-auto max-w-3xl p-4 leading-relaxed">
      {children}
    </div>
  );
}
