import Image from "next/image";
import React from "react";
import star from "@/../public/images/staricon.jpg";

const StarIcon = () => {
  return <Image src={star} alt="star" width={25} height={25} />;
};

export default StarIcon;
