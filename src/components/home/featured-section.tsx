import React from "react";
import ProductCard, { ProductCardProps } from "../product-card";
import FeaturedSectionHero, {
  FeaturedSectionHeroProps,
} from "./featured-section-hero";
import { Button } from "../ui/button";
import { useTranslations } from "next-intl";
import LocaleLink from "../locale-link";
import { ProductResponse } from "@/app/type/api/home-recommendation";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

const FeaturedSection = ({
  title,
  data,
  heroData,
  noHero,
  showMoreLink,
  priorityImage = false,
}: {
  heroData?: FeaturedSectionHeroProps;
  title: string;
  data: ProductResponse[];
  noHero?: boolean;
  showMoreLink: string;
  priorityImage?: boolean;
}) => {
  const t = useTranslations("indexpage");

  return (
    <article>
      {!noHero && <FeaturedSectionHero data={heroData!} />}
      <section className="w-[95%] mx-auto mb-12">
        <h3 className="text-3xl font-medium mb-4">{title}</h3>
        {/* <section className="flex flex-wrap justify-evenly">
          {data.map((product) => {
            return (
              <ProductCard
                key={product.slug}
                priorityImage={priorityImage}
                data={{
                  productImage: product.productImage,
                  productName: product.productName,
                  productPrice: product.productPrice,
                  slug: product.slug,
                }}
              />
            );
          })}
        </section> */}
        <Carousel className="w-[90%] mx-auto max-sm:w-[75%]">
          <CarouselContent>
            {data.map((product, index) => {
              return (
                <CarouselItem key={product.slug} className="basis-[20rem] ">
                  <ProductCard
                    className={`w-[280px] max-sm:w-[250px] h-[400px] mb-8 ${
                      index !== 0 ? "mx-auto" : ""
                    }`}
                    priorityImage={priorityImage}
                    data={{
                      productImage: product.productImage,
                      productName: product.productName,
                      productPrice: product.productPrice,
                      slug: product.slug,
                    }}
                  />
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>
      <div className="flex justify-end mb-8">
        <LocaleLink href={showMoreLink} passHref={true}>
          <Button className="mr-4">{t("showMore")}</Button>
        </LocaleLink>
      </div>
    </article>
  );
};

export default FeaturedSection;
