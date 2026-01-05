"use client";

import { productTable, productVariantTable } from "@/db/schema";
import ProductItem from "./product-item";

interface ProductListProps {
  title: string;
  products: (typeof productTable.$inferSelect & {
    variants: (typeof productVariantTable.$inferSelect)[];
  })[];
}

const ProductList = ({ title, products }: ProductListProps) => {
  return (
    <>
      <div className="space-y-6 md:space-y-8">
        <h3 className="px-5 md:px-8 lg:px-12 font-semibold md:text-xl lg:text-2xl">{title}</h3>
        {/* Mobile: scroll horizontal */}
        <div className="flex w-full gap-4 overflow-x-auto px-5 md:hidden [&::-webkit-scrollbar]:hidden">
          {products.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
        {/* Desktop: grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-8 lg:px-12">
          {products.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductList;
