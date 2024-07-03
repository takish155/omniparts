import { ReactNode } from "react";
import { Label } from "./ui/label";

interface InputContainerProps {
  label: string;
  htmlFor: string;
  input: ReactNode;
  error: string | undefined;
  className?: string;
}

const InputContainer = ({
  data,
  center,
}: {
  data: InputContainerProps;
  center?: boolean;
}) => {
  return (
    <div
      className={`grid max-w-sm items-center gap-1.5 mb-8 ${data.className} ${
        center ? "mx-auto" : ""
      }`}
    >
      <Label htmlFor={data.htmlFor}>{data.label}</Label>
      {data.input}
      {data.error && data.error !== "AccountSecurity" && (
        <p className="text-red-500">{data.error}</p>
      )}
    </div>
  );
};

export default InputContainer;
