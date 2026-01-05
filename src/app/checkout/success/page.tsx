"use client";

import Image from "next/image";
import Link from "next/link";

import Header from "@/components/common/header";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";

const CheckoutSuccessPage = () => {
  return (
    <>
      <Header />
      <Dialog open={true} onOpenChange={() => {}}>
        <DialogContent className="text-center md:max-w-lg lg:max-w-xl">
          <Image
            src="/illustration.svg"
            alt="Success"
            width={300}
            height={300}
            className="mx-auto md:w-[350px] md:h-[350px] lg:w-[400px] lg:h-[400px]"
          />
          <DialogTitle className="mt-4 text-2xl md:text-3xl lg:text-4xl">Pedido efetuado!</DialogTitle>
          <DialogDescription className="font-medium md:text-base lg:text-lg">
            Seu pedido foi efetuado com sucesso. Você pode acompanhar o status
            na seção de "Meus Pedidos".
          </DialogDescription>

          <DialogFooter className="flex-col md:flex-row gap-3 md:gap-4">
            <Button className="rounded-full w-full md:w-auto" size="lg">
              <Link href='/my-orders'>Ver meus pedidos</Link>
            </Button>
            <Button
              className="rounded-full w-full md:w-auto"
              variant="outline"
              size="lg"
              asChild
            >
              <Link href="/">Voltar para a loja</Link>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CheckoutSuccessPage;