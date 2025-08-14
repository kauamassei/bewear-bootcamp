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
    <div className="flex items-center justify-between gap-3 py-2">
      <div className="flex items-center gap-3">
        <Image
          src={productVariantImageUrl}
          alt={productVariantName}
          width={50}
          height={50}
          className="rounded-md"
        />
        <div className="flex flex-col gap-0.5">
          <p className="text-xs font-semibold">{productName}</p>
          <p className="text-muted-foreground text-[10px] font-medium">
            {productVariantName}
          </p>

          <div className="flex w-[80px] items-center justify-between rounded-md border p-0.5">
            <Button
              className="h-3 w-3 p-0"
              variant="ghost"
              onClick={handleDecreaseQuantityClick}
            >
              <MinusIcon className="h-3 w-3" />
            </Button>
            <p className="text-[10px] font-medium">{quantity}</p>
            <Button
              className="h-4 w-4"
              variant="ghost"
              onClick={handleIncreaseQuantityClick}
            >
              <PlusIcon className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-end justify-center gap-1">
        <Button
          variant="outline"
          size="icon"
          className="h-6 w-6 p-0"
          onClick={handleDeleteClick}
        >
          <TrashIcon className="h-3 w-3" />
        </Button>
        <p className="text-xs font-bold">
          {formatCentsToBRL(productVariantPriceInCents)}
        </p>
      </div>
    </div>
  );
};

export default CartItem;
