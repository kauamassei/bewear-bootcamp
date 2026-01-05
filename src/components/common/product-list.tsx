"use client";

import { productTable, productVariantTable } from "@/db/schema";
import ProductItem from "./product-item";
import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";

interface ProductListProps {
  title: string;
  products: (typeof productTable.$inferSelect & {
    variants: (typeof productVariantTable.$inferSelect)[];
  })[];
  showViewAll?: boolean;
}

const ProductList = ({ title, products, showViewAll = true }: ProductListProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const productsPerPage = 4;

  const totalPages = Math.ceil(products.length / productsPerPage);
  const visibleProducts = products.slice(
    currentIndex * productsPerPage,
    (currentIndex + 1) * productsPerPage
  );

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  return (
    <>
      <div className="space-y-6 md:space-y-8">
        <div className="flex items-center justify-between px-5 md:px-8 lg:px-12">
          <h3 className="font-semibold md:text-xl lg:text-2xl">{title}</h3>
          {showViewAll && (
            <div className="flex items-center gap-2 md:gap-4">
              <div className="hidden md:flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handlePrev}
                  disabled={totalPages <= 1}
                  className="h-8 w-8"
                >
                  <ChevronLeftIcon className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleNext}
                  disabled={totalPages <= 1}
                  className="h-8 w-8"
                >
                  <ChevronRightIcon className="h-4 w-4" />
                </Button>
              </div>
              <Link
                href="/category"
                className="text-sm md:text-base font-semibold text-primary hover:underline flex items-center gap-1"
              >
                Ver todos
                <ChevronRightIcon className="h-4 w-4" />
              </Link>
            </div>
          )}
        </div>
        {/* Mobile: scroll horizontal */}
        <div className="flex w-full gap-4 overflow-x-auto px-5 md:hidden [&::-webkit-scrollbar]:hidden">
          {products.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
        {/* Desktop: grid com navegação */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 px-8 lg:px-12">
          {visibleProducts.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductList;
