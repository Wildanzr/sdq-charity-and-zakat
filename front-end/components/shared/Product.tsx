import Image from "next/image";
import React from "react";

interface ProductProps {
  image: string;
  label: string;
  description: string;
}

const Product = ({ image, description, label }: ProductProps) => {
  return (
    <div className="flex flex-row w-full items-center justify-start space-x-5 bg-primary-100 p-5 rounded-2xl">
      <Image src={image} width={50} height={50} alt={label} />

      <p className="text-neutral-base m-body-base">{description}</p>
    </div>
  );
};

export default Product;
