"use client";

import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { LogInIcon, LogOutIcon, MenuIcon} from "lucide-react";
import { Button } from "../ui/button";
import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import { Cart } from "./cart";
import { Separator } from "../ui/separator";
import HeaderOptions from "./header-options";

const Header = () => {
  const { data: session } = authClient.useSession();

  return (
    <>
      <header className="flex items-center justify-between p-5 md:px-8 md:py-6 lg:px-12 lg:py-8">
        <Link href="/">
          <Image 
            src="/logo.svg" 
            alt="BEWEAR" 
            width={100} 
            height={26.14}
            className="md:w-[120px] lg:w-[140px]"
          />
        </Link>

        {/* Menu Desktop */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-semibold hover:text-primary transition-colors">
            Início
          </Link>
          <Link href="/my-orders" className="text-sm font-semibold hover:text-primary transition-colors">
            Meus Pedidos
          </Link>
          {session?.user ? (
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={session?.user?.image as string | undefined}
                />
                <AvatarFallback>
                  {session?.user?.name?.split(" ")?.[0]?.[0]}
                  {session?.user?.name?.split(" ")?.[1]?.[0]}
                </AvatarFallback>
              </Avatar>
              <Button
                variant="outline"
                size="sm"
                onClick={() => authClient.signOut()}
                className="gap-2"
              >
                <LogOutIcon className="h-4 w-4" />
                <span className="hidden lg:inline">Sair</span>
              </Button>
            </div>
          ) : (
            <Button size="sm" asChild>
              <Link href="/authentication" className="gap-2">
                <LogInIcon className="h-4 w-4" />
                <span className="hidden lg:inline">Entrar</span>
              </Link>
            </Button>
          )}
        </nav>

        {/* Menu Mobile */}
        <div className="flex items-center gap-3 md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <MenuIcon />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="px-5">
                {session?.user ? (
                  <>
                    <div className="flex justify-between space-y-6">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage
                            src={session?.user?.image as string | undefined}
                          />
                          <AvatarFallback>
                            {session?.user?.name?.split(" ")?.[0]?.[0]}
                            {session?.user?.name?.split(" ")?.[1]?.[0]}
                          </AvatarFallback>
                        </Avatar>

                        <div>
                          <h3 className="font-semibold">
                            {session?.user?.name}
                          </h3>
                          <span className="text-muted-foreground block text-xs">
                            {session?.user?.email}
                          </span>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => authClient.signOut()}
                      >
                        <LogOutIcon />
                      </Button>
                      
                    </div>
                  </>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h2 className="font-semibold">Olá. Faça seu login!</h2>
                      <Button size="lg" asChild>
                        <Link href="/authentication">
                          <LogInIcon className="bg" />
                        </Link>
                      </Button>
                    </div>
                    <Separator />
                    <HeaderOptions />
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
          <Cart />
        </div>

        {/* Cart Desktop */}
        <div className="hidden md:block">
          <Cart />
        </div>
      </header>
    </>
  );
};

export default Header;
