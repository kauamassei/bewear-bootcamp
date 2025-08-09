import { MinusIcon, PlusIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import { formatCentsToBRL } from "@/helpers/money";
import { Button } from "../ui/button";

interface CartItemProps {
  id: string;
  productName: string;
  productVariantName: string;
  productVariantImageUrl: string;
  productVariantPriceInCents: number;
  quantity: number;
}

const CartItem = ({
  id,
  productName,
  productVariantName,
  productVariantImageUrl,
  productVariantPriceInCents,
  quantity,
}: CartItemProps) => {
  return (
    <div className="flex items-center justify-between gap-3 py-2">
      {/* Esquerda: Imagem + Infos */}
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

          {/* Contador */}
          <div className="flex w-[80px] items-center justify-between rounded-md border p-0.5">
            <Button className="h-3 w-3 p-0" variant="ghost" onClick={() => {}}>
              <MinusIcon className="h-3 w-3" />
            </Button>
            <p className="text-[10px] font-medium">{quantity}</p>
            <Button className="h-3 w-3 p-0" variant="ghost" onClick={() => {}}>
              <PlusIcon className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>

      {/* Direita: Lixeira + Preço */}
      <div className="flex flex-col items-end justify-center gap-1">
        <Button variant="outline" size="icon" className="h-6 w-6 p-0">
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
