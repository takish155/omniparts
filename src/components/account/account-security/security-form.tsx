import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { ReactNode } from "react";

interface SecurityFormProps {
  title: string;
  description: string;
  form: ReactNode;
}

const SecurityForm = ({ data }: { data: SecurityFormProps }) => {
  return (
    <Card className="w-[95%] max-w-[600px] mb-5">
      <CardHeader>
        <CardTitle>{data.title}</CardTitle>
        <CardDescription>{data.description}</CardDescription>
      </CardHeader>
      <CardContent>{data.form}</CardContent>
    </Card>
  );
};

export default SecurityForm;
