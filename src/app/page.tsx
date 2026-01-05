import Header from "@/components/common/header";
import Image from "next/image";
import React from "react";
import { db } from "@/db";
import ProductList from "@/components/common/product-list";
import CategorySelector from "@/components/common/category-selector";
import { productTable } from "@/db/schema";
import { desc } from "drizzle-orm";
import Footer from "@/components/common/footer";
import Brands from "@/components/common/brands";
import bewearHomeBg from "@/../../public/bewearHomeBg.png";
import bewearHomeBg2 from "@/../../public/bewearHomeBg2.png";

const Home = async () => {
  const products = await db.query.productTable.findMany({
    with: {
      variants: true,
    },
  });
  const newlyCreateProducts = await db.query.productTable.findMany({
    orderBy: [desc(productTable.createdAt)],
    with: {
      variants: true,
    },
  });

  const categories = await db.query.categoryTable.findMany({});

  return (
    <>
      <Header />
      <div className="space-y-6 md:space-y-12 lg:space-y-16">
        <div className="mx-auto w-full max-w-7xl px-5 md:px-8 lg:px-12">
          {/* Banner Mobile */}
          <Image
            src="/banner-01.png"
            alt="Leve uma vida com estilo"
            height={0}
            width={0}
            sizes="100vw"
            className="h-auto w-full md:hidden md:rounded-lg lg:rounded-xl"
          />
          {/* Banner Desktop */}
          <Image
            src={bewearHomeBg}
            alt="Leve uma vida com estilo"
            height={0}
            width={0}
            sizes="100vw"
            className="hidden h-auto w-full md:block md:rounded-lg lg:rounded-xl"
          />
        </div>

        <div className="mx-auto w-full max-w-7xl">
          <Brands title="Marcas parceiras" />
        </div>

        <div className="mx-auto w-full max-w-7xl">
          <ProductList products={products} title="Mais vendidos" />
        </div>

        <div className="mx-auto w-full max-w-7xl px-5 md:px-8 lg:px-12">
          <CategorySelector categories={categories} />
        </div>

        <div className="mx-auto w-full max-w-7xl px-5 md:px-8 lg:px-12">
          {/* Banner Mobile */}
          <Image
            src="/banner-02.png"
            alt="Seja autêntico"
            height={0}
            width={0}
            sizes="100vw"
            className="h-auto w-full md:hidden md:rounded-lg lg:rounded-xl"
          />
          {/* Banner Desktop */}
          <Image
            src={bewearHomeBg2}
            alt="Seja autêntico"
            height={0}
            width={0}
            sizes="100vw"
            className="hidden h-auto w-full md:block md:rounded-lg lg:rounded-xl"
          />
        </div>

        <div className="mx-auto w-full max-w-7xl">
          <ProductList products={newlyCreateProducts} title="Novos produtos" />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Home;
