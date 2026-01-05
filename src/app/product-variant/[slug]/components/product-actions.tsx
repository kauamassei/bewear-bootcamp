"use client";

import { MinusIcon, PlusIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

import AddToCartButton from "./add-to-cart-button";

interface ProductActionsProps {
  productVariantId: string;
}

const ProductActions = ({ productVariantId }: ProductActionsProps) => {
  const [quantity, setQuantity] = useState(1);

  const handleDecrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  return (
    <>
      <div className="px-5 md:px-0">
        <div className="space-y-4">
          <h3 className="font-medium md:text-base lg:text-lg">Quantidade</h3>
          <div className="flex w-[100px] md:w-[120px] items-center justify-between rounded-lg border">
            <Button size="icon" variant="ghost" onClick={handleDecrement} className="md:h-10 md:w-10">
              <MinusIcon className="md:h-5 md:w-5" />
            </Button>
            <p className="md:text-base lg:text-lg">{quantity}</p>
            <Button size="icon" variant="ghost" onClick={handleIncrement} className="md:h-10 md:w-10">
              <PlusIcon className="md:h-5 md:w-5" />
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col space-y-4 px-5 md:px-0 md:space-y-5">
        <AddToCartButton
          productVariantId={productVariantId}
          quantity={quantity}
        />
        <Button className="rounded-full md:text-base lg:text-lg md:h-12 lg:h-14" size="lg">
          Comprar agora
        </Button>
      </div>
    </>
  );
};

export default ProductActions;