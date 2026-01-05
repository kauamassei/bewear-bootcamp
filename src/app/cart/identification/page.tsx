import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import Footer from "@/components/common/footer";
import HeaderWrapper from "@/components/common/header-wrapper";
import { db } from "@/db";
import { shippingAddressTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import CartSummary from "../components/cart-summary";
import Addresses from "./components/addresses";

const IdentificationPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user.id) {
    redirect("/");
  }
  const cart = await db.query.cartTable.findFirst({
    where: (cart, { eq }) => eq(cart.userId, session.user.id),
    with: {
      shippingAddress: true,
      items: {
        with: {
          productVariant: {
            with: {
              product: true,
            },
          },
        },
      },
    },
  });
  if (!cart || cart?.items.length === 0) {
    redirect("/");
  }
  const shippingAddresses = await db.query.shippingAddressTable.findMany({
    where: eq(shippingAddressTable.userId, session.user.id),
  });
  const cartTotalInCents = cart.items.reduce(
    (acc, item) => acc + item.productVariant.priceInCents * item.quantity,
    0,
  );
  return (
    <div>
      <HeaderWrapper />
      <div className="space-y-4 md:space-y-6 lg:space-y-8 px-5 md:px-8 lg:px-12">
        <div className="md:grid md:grid-cols-2 lg:grid-cols-[1.5fr_1fr] md:gap-8 lg:gap-12">
          <Addresses
            shippingAddresses={shippingAddresses}
            defaultShippingAddressId={cart.shippingAddress?.id || null}
          />
          <div className="md:sticky md:top-8 md:self-start">
            <CartSummary
              subtotalInCents={cartTotalInCents}
              totalInCents={cartTotalInCents}
              products={cart.items.map((item) => ({
                id: item.productVariant.id,
                name: item.productVariant.product.name,
                variantName: item.productVariant.name,
                quantity: item.quantity,
                priceInCents: item.productVariant.priceInCents,
                imageUrl: item.productVariant.imageUrl,
              }))}
            />
          </div>
        </div>
      </div>
      <div className="mt-12 md:mt-16 lg:mt-20">
        <Footer />
      </div>
    </div>
  );
};

export default IdentificationPage;