import HeaderWrapper from "@/components/common/header-wrapper";
import React from "react";
import { db } from "@/db";
import ProductList from "@/components/common/product-list";
import { productTable } from "@/db/schema";
import { desc } from "drizzle-orm";
import Footer from "@/components/common/footer";
import Brands from "@/components/common/brands";
import HeroBanner from "@/components/common/hero-banner";
import PromotionalCards from "@/components/common/promotional-cards";
import bewearHomeBg from "@/../../public/bewearHomeBg.png";

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

  return (
    <>
      <HeaderWrapper />
      <div className="space-y-6 md:space-y-12 lg:space-y-16">
        <div className="mx-auto w-full max-w-7xl px-5 md:px-8 lg:px-12">
          <HeroBanner imageSrc={bewearHomeBg} alt="Leve uma vida com estilo" />
        </div>

        <div className="mx-auto w-full max-w-7xl">
          <Brands title="Marcas parceiras" />
        </div>

        <div className="mx-auto w-full max-w-7xl">
          <ProductList products={products} title="Mais vendidos" />
        </div>

        <div className="mx-auto w-full max-w-7xl px-5 md:px-8 lg:px-12">
          <PromotionalCards products={newlyCreateProducts.slice(0, 3)} />
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Home;
