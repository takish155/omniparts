import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import React from "react";

const ProductToReviewCard = ({
  productName,
  productImage,
}: {
  productName: string;
  productImage: string;
}) => {
  return (
    <Card className="w-[100%] max-w-[700px] mb-6">
      <CardHeader className="w-full flex flex-row items-center justify-between">
        <Image
          src={productImage}
          alt={productName}
          width={500}
          height={500}
          className="w-[40%]"
        />
        <CardTitle className="max-sm:text-sm">{productName}</CardTitle>
      </CardHeader>
    </Card>
  );
};

export default ProductToReviewCard;
