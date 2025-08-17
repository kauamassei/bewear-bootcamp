"use client";

import { Home, ShoppingBag, Truck } from "lucide-react";
import Link from "next/link";
import { Separator } from "../ui/separator";



const HeaderOptions = () => {
  return (
    <>
      <div className="space-y-4">

        <div className="space-y-5">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs font-semibold"
          >
            <Home className="h-4 w-4" />
            Início
          </Link>

          <Link
            href="/"
            className="flex items-center gap-2 text-xs font-semibold"
          >
            <Truck className="h-4 w-4" />
            Meus Pedidos
          </Link>

          <Link
            href="/"
            className="flex items-center gap-2 text-xs font-semibold"
          >
            <ShoppingBag className="h-4 w-4" />
            Sacola
          </Link>
        </div>
        <Separator />

      </div>
    </>
  );
};

export default HeaderOptions;
