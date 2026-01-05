import { MinusIcon, PlusIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import { formatCentsToBRL } from "@/helpers/money";
import { Button } from "../ui/button";

import { toast } from "sonner";

import { useRemoveProductFromCart } from "@/hooks/mutations/use-remove-product-from-cart";
import { useDecreaseCartProduct } from "@/hooks/mutations/use-decrease-cart-product";
import { useIncreaseCartProduct } from "@/hooks/mutations/use-increase-cart-product";

interface CartItemProps {
  id: string;
  productName: string;
  productVariantId: string;
  productVariantName: string;
  productVariantImageUrl: string;
  productVariantPriceInCents: number;
  quantity: number;
}

const CartItem = ({
  id,
  productName,
  productVariantId,
  productVariantName,
  productVariantImageUrl,
  productVariantPriceInCents,
  quantity,
}: CartItemProps) => {
  const removeProductFromCartMutation = useRemoveProductFromCart(id);

  const decreaseCartProductQuantityMutation = useDecreaseCartProduct(id);

  const increaseCartProductQuantityMutation =
    useIncreaseCartProduct(productVariantId);

  const handleDeleteClick = () => {
    removeProductFromCartMutation.mutate(undefined, {
      onSuccess: () => {
        toast.success("Produto removido do carrinho.");
      },
      onError: () => {
        toast.error("Erro ao remover produto do carrinho.");
      },
    });
  };

  const handleDecreaseQuantityClick = () => {
    decreaseCartProductQuantityMutation.mutate(undefined, {
      onSuccess: () => {
        toast.success("Quantidade do produto removida.");
      },
    });
  };

  const handleIncreaseQuantityClick = () => {
    increaseCartProductQuantityMutation.mutate(undefined, {
      onSuccess: () => {
        toast.success("Quantidade do produto aumentada.");
      },
    });
  };

  return (
    <div className="flex items-center justify-between gap-3 py-2 md:gap-4">
      <div className="flex items-center gap-3 md:gap-4">
        <Image
          src={productVariantImageUrl}
          alt={productVariantName}
          width={50}
          height={50}
          className="rounded-md md:w-[60px] md:h-[60px] lg:w-[70px] lg:h-[70px]"
        />
        <div className="flex flex-col gap-0.5 md:gap-1">
          <p className="text-xs md:text-sm font-semibold">{productName}</p>
          <p className="text-muted-foreground text-[10px] md:text-xs font-medium">
            {productVariantName}
          </p>

          <div className="flex w-[80px] md:w-[100px] items-center justify-between rounded-md border p-0.5 md:p-1">
            <Button
              className="h-3 w-3 md:h-4 md:w-4 p-0"
              variant="ghost"
              onClick={handleDecreaseQuantityClick}
            >
              <MinusIcon className="h-3 w-3 md:h-4 md:w-4" />
            </Button>
            <p className="text-[10px] md:text-xs font-medium">{quantity}</p>
            <Button
              className="h-4 w-4 md:h-5 md:w-5"
              variant="ghost"
              onClick={handleIncreaseQuantityClick}
            >
              <PlusIcon className="h-3 w-3 md:h-4 md:w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-end justify-center gap-1 md:gap-2">
        <Button
          variant="outline"
          size="icon"
          className="h-6 w-6 md:h-7 md:w-7 p-0"
          onClick={handleDeleteClick}
        >
          <TrashIcon className="h-3 w-3 md:h-4 md:w-4" />
        </Button>
        <p className="text-xs md:text-sm font-bold">
          {formatCentsToBRL(productVariantPriceInCents)}
        </p>
      </div>
    </div>
  );
};

export default CartItem;
