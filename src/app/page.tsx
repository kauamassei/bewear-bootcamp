import Header from "@/components/common/header";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import { db } from "@/db";
import ProductList from "@/components/common/product-list";

const Home = async () => {
  const products = await db.query.productTable.findMany({
    with: {
      variants: true,
    },
  });
  console.log(products);
  return (
    <>
      <Header />
      <div className="space-y-6">
        <div className="px-5">
          <Image
            src="/banner-01.png"
            alt="Leve uma vida com estilo"
            height={0}
            width={0}
            sizes="100vh"
            className="h-auto w-full"
          />
        </div>

        <ProductList products={products} title="Mais vendidos" />

        <div className="px-5">
          <Image
            src="/banner-02.png"
            alt="Seja autêntico"
            height={0}
            width={0}
            sizes="100vh"
            className="h-auto w-full"
          />
        </div>
      </div>
    </>
  );
};

export default Home;
