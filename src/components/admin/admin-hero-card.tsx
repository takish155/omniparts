import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { formatToMoney } from "@/lib/formatToMoney";

const AdminHeroCard = ({
  title,
  value,
  isMoney,
}: {
  title: string;
  value: number;
  isMoney?: boolean;
}) => {
  return (
    <Card className="w-[30%]">
      <CardHeader>
        <CardTitle className="font-normal text-md">{title}</CardTitle>
        <CardDescription className="font-bold text-2xl">
          {isMoney ? formatToMoney(value, "¥") : value}
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export default AdminHeroCard;
