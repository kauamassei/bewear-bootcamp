import { productVariantTable } from "@/db/schema";
import Image from "next/image";
import Link from "next/link";


interface VariantSelectorProps {
    selectedVariantSlug: string,
  variants: (typeof productVariantTable.$inferSelect)[];
}

const VariantSelector = ({ variants, selectedVariantSlug }: VariantSelectorProps) => {
    
  return (
    <>
      <div className="flex items-center gap-4 md:gap-5 lg:gap-6">
        {variants.map((variant) => (
          <Link href={`/product-variant/${variant.slug}`} key={variant.id}
          className={selectedVariantSlug === variant.slug ? 'border-primary rounded-xl border-2 md:border-[3px]' : 'border-2 border-transparent hover:border-primary/50 rounded-xl transition-colors'}
          >
            <Image
              width={68}
              height={68}
              src={variant.imageUrl}
              alt={variant.name}
              className="rounded-xl md:w-[80px] md:h-[80px] lg:w-[90px] lg:h-[90px]"
            />
          </Link>
        ))}
      </div>
    </>
  );
};

export default VariantSelector;
