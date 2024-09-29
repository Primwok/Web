"use client";

import CartTotals from "@/modules/common/components/cart-totals";
import Divider from "@/modules/common/components/divider";
import { CartWithCheckoutStep } from "@/types/global";
import DiscountCode from "@/modules/checkout/components/discount-code";
import LocalizedClientLink from "@/modules/common/components/localized-client-link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

type SummaryProps = {
  cart: CartWithCheckoutStep;
};

const Summary = ({ cart }: SummaryProps) => {
  return (
    <div className="flex flex-col gap-y-4">
      <h2 className="text-[1.5rem] leading-[2.75rem]">Summary</h2>
      <DiscountCode cart={cart} />
      <Separator />
      <CartTotals data={cart} />
      <LocalizedClientLink
        href={"/checkout?step=" + cart.checkout_step}
        data-testid="checkout-button"
      >
        <Button className="w-full h-10">Go to checkout</Button>
      </LocalizedClientLink>
    </div>
  );
};

export default Summary;
