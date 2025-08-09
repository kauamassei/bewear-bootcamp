'use client'

import { ShoppingBasketIcon } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useQuery } from "@tanstack/react-query";
import { getCart } from "@/actions/get-cart";

const Cart = () => {
  const {data: cart, isPending: cartIsLoading} = useQuery({
    queryKey: ['cart'],
    queryFn: () => getCart(),
  });
  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
        <Button variant="outline" size="icon">
            <ShoppingBasketIcon />
          </Button>
        </SheetTrigger>

        <SheetContent>
          <SheetHeader>
            <SheetTitle>
              Carrinho
            </SheetTitle>
          </SheetHeader>
          <div>
            
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Cart;
