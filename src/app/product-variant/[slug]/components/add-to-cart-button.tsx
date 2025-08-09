'use client'

import { addProductToCart } from "@/actions/add-cart-product";
import { Button } from "@/components/ui/button"
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

interface AddToCartButtonProps {
    productVariantId: string;
    quantity: number;
}

const AddToCartButton = ({productVariantId, quantity}: AddToCartButtonProps) => {
    const {mutate, isPending} = useMutation({
        mutationKey: ['addProductToCart'],
        mutationFn: () => addProductToCart({
            productVariantId,
            quantity,
        })
    })
  return (
    <>
    <Button className="rounded-full" size="lg" variant="outline" disabled={isPending} onClick={() => mutate()}>
        {isPending && <Loader2 className="animate-spin" />}
            Adicionar à sacola
          </Button>
    </>
  )
}

export default AddToCartButton