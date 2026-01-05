"use client";

import { ShoppingBasketIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { formatCentsToBRL } from "@/helpers/money";

import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import CartItem from "./cart-item";
import { useCart } from "@/hooks/queries/use-cart";
import Link from "next/link";

export const Cart = () => {
  const { data: cart } = useCart();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <ShoppingBasketIcon />
        </Button>
      </SheetTrigger>
      <SheetContent className="md:w-[500px] lg:w-[600px]">
        <SheetHeader>
          <SheetTitle className="md:text-xl lg:text-2xl">Carrinho</SheetTitle>
        </SheetHeader>

        <div className="flex h-full flex-col px-5 pb-5 md:px-6 md:pb-6">
          <div className="flex h-full max-h-full flex-col overflow-hidden">
            <ScrollArea className="h-full">
              <div className="flex h-full flex-col gap-8 md:gap-6">
                {cart?.items.map((item) => (
                  <CartItem
                    key={item.id}
                    id={item.id}
                    productVariantId={item.productVariant.id}
                    quantity={item.quantity}
                    productName={item.productVariant.product.name}
                    productVariantName={item.productVariant.name}
                    productVariantImageUrl={item.productVariant.imageUrl}
                    productVariantPriceInCents={
                      item.productVariant.priceInCents
                    }
                  />
                ))}
              </div>
            </ScrollArea>
          </div>

          {cart?.items && cart?.items.length > 0 && (
            <div className="flex flex-col gap-4 md:gap-5">
              <Separator />

              <div className="flex items-center justify-between text-xs md:text-sm font-medium">
                <p>Subtotal</p>
                <p>{formatCentsToBRL(cart?.totalPriceInCents ?? 0)}</p>
              </div>

              <Separator />

              <div className="flex items-center justify-between text-xs md:text-sm font-medium">
                <p>Entrega</p>
                <p>GRÁTIS</p>
              </div>

              <Separator />

              <div className="flex items-center justify-between text-xs md:text-sm font-medium">
                <p>Total</p>
                <p className="md:text-base lg:text-lg">{formatCentsToBRL(cart?.totalPriceInCents ?? 0)}</p>
              </div>

              <Button className="mt-5 rounded-full md:h-12 lg:h-14 md:text-base" asChild>
                <Link href="/cart/identification">Finalizar compra</Link>
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

// SERVER ACTION
