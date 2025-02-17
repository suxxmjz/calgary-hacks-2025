import { JSX } from "react";

interface ContainerProps {
  readonly children: React.ReactNode;
}

export function Container({ children }: ContainerProps): JSX.Element {
  return (
    <div className="bg-white p-4 rounded-sm border shadow-sm">{children}</div>
  );
}
