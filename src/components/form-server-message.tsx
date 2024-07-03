import React from "react";
import { Alert, AlertTitle } from "./ui/alert";

const FormServerMessage = ({
  message,
  center,
}: {
  message: String;
  center?: Boolean;
}) => {
  return (
    <Alert
      variant={"destructive"}
      className={`${center ? "mx-auto" : ""} max-w-sm mb-8`}
    >
      <AlertTitle>{message}</AlertTitle>
    </Alert>
  );
};

export default FormServerMessage;
