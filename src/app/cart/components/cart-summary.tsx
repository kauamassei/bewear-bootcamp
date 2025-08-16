import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCentsToBRL } from "@/helpers/money";
import React from "react";
import Image from "next/image";

interface CartSummaryProps {
  subtotalInCents: number;
  totalInCents: number;
  products: Array<{
    id: string;
    name: string;
    variantName: string;
    quantity: number;
    priceInCents: number;
    imageUrl: string;
  }>;
}

const CartSummary = ({
  subtotalInCents,
  totalInCents,
  products,
}: CartSummaryProps) => {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Resumo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between">
            <p className="text-sm">Subtotal</p>
            <p className="text-muted-foreground text-sm font-medium">
              {formatCentsToBRL(subtotalInCents)}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-sm">Frete</p>
            <p className="text-muted-foreground text-sm font-medium">GRÁTIS</p>
          </div>
          <div className="flex justify-between">
            <p className="text-sm">Total</p>
            <p className="text-muted-foreground text-sm font-medium">
              {formatCentsToBRL(totalInCents)}
            </p>
          </div>

          <div className="py-3"><Separator /></div>

          {products.map((product) => (
            <div
              className="flex items-center justify-between gap-3"
              key={product.id}
            >
              <div className="flex items-center gap-3">
                <Image
                  src={product.imageUrl}
                  alt={product.variantName}
                  width={50}
                  height={50}
                  className="rounded-lg"
                />
                <div className="flex flex-col gap-0.5">
                  <p className="text-xs font-semibold">{product.name}</p>
                  <p className="text-muted-foreground text-[10px] font-medium">
                    {product.variantName}
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-end justify-center gap-1">
                <p className="text-xs font-bold">
                  {formatCentsToBRL(product.priceInCents)}
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </>
  );
};

export default CartSummary;
