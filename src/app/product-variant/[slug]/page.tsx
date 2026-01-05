import Header from "@/components/common/header";
import { db } from "@/db";
import { productTable, productVariantTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import Image from "next/image";
import { formatCentsToBRL } from "@/helpers/money";

import ProductList from "@/components/common/product-list";
import Footer from "@/components/common/footer";
import VariantSelector from "./components/variant-selector";

import ProductActions from "./components/product-actions";

interface ProductVariantPageProps {
  params: Promise<{ slug: string }>;
}

const ProductVariantPage = async ({ params }: ProductVariantPageProps) => {
  const { slug } = await params;
  const productVariant = await db.query.productVariantTable.findFirst({
    where: eq(productVariantTable.slug, slug),
    with: {
      product: {
        with: {
          variants: true,
        },
      },
    },
  });
  if (!productVariant) {
    return notFound();
  }

  const likelyProducts = await db.query.productTable.findMany({
    where: eq(productTable.categoryId, productVariant.product.categoryId),
    with: {
      variants: true,
    },
  });
  return (
    <>
      <Header />
      <div className="flex flex-col space-y-6 md:space-y-8 lg:space-y-10">
        {/* Mobile: imagem full width */}
        <div className="md:hidden">
          <Image
            src={productVariant.imageUrl}
            alt={productVariant.name}
            sizes="100vw"
            width={0}
            height={0}
            className="h-auto w-full object-cover"
          />
        </div>

        {/* Desktop: layout em duas colunas */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-12 px-8 lg:px-12">
          <div>
            <Image
              src={productVariant.imageUrl}
              alt={productVariant.name}
              sizes="(max-width: 768px) 100vw, 50vw"
              width={0}
              height={0}
              className="h-auto w-full object-cover rounded-lg lg:rounded-xl"
            />
          </div>
          <div className="flex flex-col space-y-6 lg:space-y-8">
            <div>
              <h2 className="text-2xl lg:text-3xl font-semibold">
                {productVariant.product.name}
              </h2>
              <h3 className="text-muted-foreground text-base lg:text-lg mt-2">
                {productVariant.name}
              </h3>
              <h3 className="text-xl lg:text-2xl font-bold mt-4">
                {formatCentsToBRL(productVariant.priceInCents)}
              </h3>
            </div>

            <VariantSelector
              selectedVariantSlug={productVariant.slug}
              variants={productVariant.product.variants}
            />

            <ProductActions productVariantId={productVariant.id} />

            <div>
              <p className="text-base lg:text-lg leading-relaxed">
                {productVariant.product.description}
              </p>
            </div>
          </div>
        </div>

        {/* Mobile: conteúdo abaixo da imagem */}
        <div className="md:hidden space-y-6">
          <div className="px-5">
            <VariantSelector
              selectedVariantSlug={productVariant.slug}
              variants={productVariant.product.variants}
            />
          </div>
          <div className="px-5">
            {/*Descricao*/}
            <h2 className="text-lg font-semibold">
              {productVariant.product.name}
            </h2>
            <h3 className="text-muted-foreground text-sm">
              {productVariant.name}
            </h3>
            <h3>{formatCentsToBRL(productVariant.priceInCents)}</h3>
          </div>

          <ProductActions productVariantId={productVariant.id} />
          <div className="px-5">
            <p className="text-shadow-amber-600">
              {productVariant.product.description}
            </p>
          </div>
        </div>

        <ProductList title="Talvez você goste" products={likelyProducts} />

        <Footer />
      </div>
    </>
  );
};

export default ProductVariantPage;
