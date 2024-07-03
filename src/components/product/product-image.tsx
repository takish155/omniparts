import Image, { StaticImageData } from "next/image";
import React from "react";

const ProductImage = ({
  image,
  alt,
}: {
  image: StaticImageData | string;
  alt: string;
}) => {
  return (
    <section className="w-[40%] max-md:w-[90%] ">
      <Image
        priority={true}
        src={image}
        alt={alt}
        width={"300"}
        height={"300"}
        className="w-full h-auto mx-auto"
        blurDataURL="../../../public/images/blur_image.jpg"
      />
    </section>
  );
};

export default ProductImage;
