import React from "react";
import { Button } from "../ui/button";
import Image, { StaticImageData } from "next/image";
import LocaleLink from "../locale-link";

export type FeaturedSectionHeroProps = {
  title: string;
  description: string;
  actionButtonName: string;
  buttonLink: string;
  image: StaticImageData | string;
  position?: "left" | "right";
  isHero?: boolean;
};

const FeaturedSectionHero = ({ data }: { data: FeaturedSectionHeroProps }) => {
  return (
    <section
      className={`flex bg-gray-950 mb-5  max-md:flex-col-reverse ${
        data.position === "right" ? "md:flex-row-reverse" : ""
      }`}
    >
      <section className="text-white my-auto w-[50%] max-md:w-[90%] max-md:py-6">
        <div className="w-[95%] mx-auto">
          <h2 className="text-3xl font-bold ml-4 mb-2">{data.title}</h2>
          <p className="ml-4 mb-4">{data.description}</p>
        </div>
        <div className="w-[95%] mx-auto">
          <LocaleLink href={data.buttonLink} passHref={true}>
            <Button className="ml-4">{data.actionButtonName}</Button>
          </LocaleLink>
        </div>
      </section>
      <Image
        priority={data.isHero}
        src={data.image}
        alt="cpu"
        className="w-[45%] h-auto  max-md:w-full"
      />
    </section>
  );
};

export default FeaturedSectionHero;
