"use client";

import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { LogInIcon, LogOutIcon, MenuIcon, SearchIcon} from "lucide-react";
import { Button } from "../ui/button";
import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import { Cart } from "./cart";
import { Separator } from "../ui/separator";
import HeaderOptions from "./header-options";
import HeaderCategories from "./header-categories";
import { categoryTable } from "@/db/schema";

interface HeaderProps {
  categories: (typeof categoryTable.$inferSelect)[];
}

const Header = ({ categories }: HeaderProps) => {
  const { data: session } = authClient.useSession();

  return (
    <>
      <header className="w-full">
        {/* Top Bar - Desktop */}
        <div className="hidden md:flex items-center justify-between px-8 lg:px-12 py-4 border-b">
          <div className="flex items-center gap-2">
            {session?.user && (
              <span className="text-sm font-medium">
                Olá, {session.user.name?.split(" ")[0]}!
              </span>
            )}
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <SearchIcon className="h-4 w-4" />
            </Button>
            <Cart />
          </div>
        </div>

        {/* Logo and Categories - Desktop */}
        <div className="hidden md:block px-8 lg:px-12 py-4">
          <div className="flex flex-col items-center gap-4">
            <Link href="/">
              <Image 
                src="/logo.svg" 
                alt="BEWEAR" 
                width={140} 
                height={36.6}
                className="h-auto"
              />
            </Link>
            <HeaderCategories categories={categories} />
          </div>
        </div>

        {/* Mobile Header */}
        <div className="flex items-center justify-between p-5 md:hidden">
          <Link href="/">
            <Image 
              src="/logo.svg" 
              alt="BEWEAR" 
              width={100} 
              height={26.14}
            />
          </Link>

          <div className="flex items-center gap-3">
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
        </div>
      </header>
    </>
  );
};

export default Header;
