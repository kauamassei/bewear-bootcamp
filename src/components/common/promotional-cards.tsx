import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { productTable, productVariantTable } from "@/db/schema";

interface PromotionalCardsProps {
  products: (typeof productTable.$inferSelect & {
    variants: (typeof productVariantTable.$inferSelect)[];
  })[];
}

const PromotionalCards = ({ products }: PromotionalCardsProps) => {
  if (products.length < 3) return null;

  const [product1, product2, product3] = products.slice(0, 3);
  const variant1 = product1.variants[0];
  const variant2 = product2.variants[0];
  const variant3 = product3.variants[0];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
      <div className="md:col-span-1 space-y-4 md:space-y-6">
        <Link
          href={`/product-variant/${variant1.slug}`}
          className="group relative block h-[250px] md:h-[300px] rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200"
        >
          <Image
            src={variant1.imageUrl}
            alt={product1.name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-4 md:p-6">
            <h3 className="text-white font-semibold text-base md:text-lg mb-3">
              {product1.name}
            </h3>
            <Button
              className="w-full bg-white text-gray-900 hover:bg-gray-100 rounded-full"
              size="sm"
              asChild
            >
              <Link href={`/product-variant/${variant1.slug}`}>Comprar</Link>
            </Button>
          </div>
        </Link>

        <Link
          href={`/product-variant/${variant2.slug}`}
          className="group relative block h-[250px] md:h-[300px] rounded-xl overflow-hidden bg-gradient-to-br from-primary/20 to-primary/40"
        >
          <Image
            src={variant2.imageUrl}
            alt={product2.name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-4 md:p-6">
            <h3 className="text-white font-semibold text-base md:text-lg mb-3">
              {product2.name}
            </h3>
            <Button
              className="w-full bg-white text-gray-900 hover:bg-gray-100 rounded-full"
              size="sm"
              asChild
            >
              <Link href={`/product-variant/${variant2.slug}`}>Comprar</Link>
            </Button>
          </div>
        </Link>
      </div>

      <Link
        href={`/product-variant/${variant3.slug}`}
        className="group relative block h-[250px] md:h-[500px] md:col-span-2 rounded-xl overflow-hidden bg-gradient-to-br from-blue-100 to-blue-200"
      >
        <Image
          src={variant3.imageUrl}
          alt={product3.name}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-4 md:p-6 lg:p-8">
          <h3 className="text-white font-semibold text-lg md:text-xl lg:text-2xl mb-4 md:mb-6">
            {product3.name}
          </h3>
          <Button
            className="w-full md:w-auto bg-white text-gray-900 hover:bg-gray-100 rounded-full px-6 md:px-8"
            size="lg"
            asChild
          >
            <Link href={`/product-variant/${variant3.slug}`}>Comprar</Link>
          </Button>
        </div>
      </Link>
    </div>
  );
};

export default PromotionalCards;

