import { productTable, productVariantTable } from "@/db/schema";
import { formatCentsToBRL } from "@/helpers/money";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface ProductItemProps {
  product: typeof productTable.$inferSelect & {
    variants: (typeof productVariantTable.$inferSelect)[];
  };
  textContainerClassName?: string;
}
const ProductItem = ({ product, textContainerClassName }: ProductItemProps) => {
  // Corrigindo o tipo de 'product' para ser um único produto, não um array
  const firstVariant = product.variants[0];
  return (
    <>
      <Link
        href={`/product-variant/${firstVariant.slug}`}
        className="flex flex-col gap-4 md:gap-5 lg:gap-6 group"
      >
        <Image
          src={firstVariant.imageUrl}
          alt={firstVariant.name}
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          width={0}
          height={0}
          className="h-auto w-full rounded-3xl md:rounded-xl lg:rounded-2xl transition-transform group-hover:scale-105"
        />
        <div
          className={cn(
            "flex max-w-[200px] md:max-w-full flex-col gap-1 md:gap-2",
            textContainerClassName,
          )}
        >
          <p className="truncate text-sm md:text-base font-medium">{product.name}</p>
          <p className="text-muted-foreground truncate text-xs md:text-sm font-medium">
            {product.description}
          </p>
          <p className="truncate text-sm md:text-base lg:text-lg font-semibold">
            {formatCentsToBRL(firstVariant.priceInCents)}
          </p>
        </div>
      </Link>
    </>
  );
};

export default ProductItem;
