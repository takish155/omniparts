import React from "react";
import ProductCard, { ProductCardProps } from "../product-card";
import FeaturedSectionHero, {
  FeaturedSectionHeroProps,
} from "./featured-section-hero";
import { Button } from "../ui/button";
import { useTranslations } from "next-intl";
import LocaleLink from "../locale-link";
import { ProductResponse } from "@/app/type/api/home-recommendation";

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
      <section className="w-[90%] mx-auto mb-12">
        <h3 className="text-3xl font-medium mb-4">{title}</h3>
        <section className="flex flex-wrap justify-evenly">
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
        </section>
        <div className="flex justify-end mb-8">
          <LocaleLink href={showMoreLink} passHref={true}>
            <Button>{t("showMore")}</Button>
          </LocaleLink>
        </div>
      </section>
    </article>
  );
};

export default FeaturedSection;
