import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useTranslations } from "next-intl";
import { Specification } from "@/app/type/api/get-product-info";

export interface ProductSpecificationsProps {
  brand: string;
  category: string;
  year: number;
  other_specification: Specification;
}

const ProductSpecifications = ({
  data,
}: {
  data: ProductSpecificationsProps;
}) => {
  const t = useTranslations("ProductPage");

  return (
    <Table className="text-primary">
      <TableHeader>
        <TableRow>
          <TableHead className="text-xl font-bold">
            {t("specifications")}
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableHead className="font-bold">{t("brand")}</TableHead>
          <TableCell>{data.brand}</TableCell>
        </TableRow>
        <TableRow>
          <TableHead className="font-bold">{t("category")}</TableHead>
          <TableCell>{t(data.category as any)}</TableCell>
        </TableRow>
        <TableRow>
          <TableHead className="font-bold">{t("yearManufactured")}</TableHead>
          <TableCell>{data.year}</TableCell>
        </TableRow>
        {data.other_specification &&
          data.other_specification.map((data) => {
            return (
              <TableRow key={data.specification}>
                <TableHead className="font-bold">
                  {data.specification}
                </TableHead>
                <TableCell>{data.value}</TableCell>
              </TableRow>
            );
          })}
      </TableBody>
    </Table>
  );
};

export default ProductSpecifications;
