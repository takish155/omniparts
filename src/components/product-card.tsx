import Image, { StaticImageData } from "next/image";
import React from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { formatToMoney } from "@/lib/formatToMoney";
import LocaleLink from "./locale-link";
import { ProductResponse } from "@/app/type/api/home-recommendation";

export type ProductCardProps = {
  image: StaticImageData | string;
  productName: string;
  productLink: string;
  productPrice: number;
};

const ProductCard = ({
  data,
  className = "w-[280px] h-[400px] mb-8",
  priorityImage = false,
  isAdminProduct = false,
}: {
  data: ProductResponse;
  className?: string;
  priorityImage?: boolean;
  isAdminProduct?: boolean;
}) => {
  if (isAdminProduct) {
    return (
      <Card className={className}>
        <div className="mx-auto h-full w-full flex flex-col justify-between">
          <div className="w-[80%] mx-auto h-auto flex items-center my-auto">
            <Image
              priority={priorityImage}
              className="w-full my-auto"
              objectFit="cover"
              width={500}
              height={500}
              src={data.productImage}
              alt={data.productName}
              blurDataURL="../../public/images/blur_image.jpg"
            />
          </div>
          <div>
            <CardHeader>
              <h3 className="font-semibold text-xl">{data.productName}</h3>
            </CardHeader>
            <CardContent>
              <p className="font-semibold text-base">
                {formatToMoney(data.productPrice, "￥")}
              </p>
            </CardContent>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <LocaleLink
        passHref
        href={`/product/${data.slug!}`}
        className="mx-auto h-full w-full flex flex-col justify-between"
      >
        <div className="w-[70%] mx-auto h-auto flex items-center my-auto">
          <Image
            priority={priorityImage}
            className="w-full my-auto"
            objectFit="cover"
            width={500}
            height={500}
            src={data.productImage}
            alt={data.productName}
            blurDataURL="../../public/images/blur_image.jpg"
          />
        </div>
        <div>
          <CardHeader>
            <h3 className="font-semibold text-xl">{data.productName}</h3>
          </CardHeader>
          <CardContent>
            <p className="font-semibold text-base">
              {formatToMoney(data.productPrice, "￥")}
            </p>
          </CardContent>
        </div>
      </LocaleLink>
    </Card>
  );
};

export default ProductCard;
