import { ChevronLeftIcon, ChevronRightCircle } from "lucide-react";
import Image from "next/image";
import { useContext } from "react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { formatCurrency } from "@/helpers/format-currency";

import { CartProductItem } from "../../components/cart-product.item";
import { CartContext } from "../../contexts/cart";

export const CartSheet = () => {
  const { isOpen, toggleCart, products } = useContext(CartContext);

  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}>
      <SheetContent className="w-[80%]">
        <SheetHeader>
          <SheetTitle className="text-left">Sacola</SheetTitle>
        </SheetHeader>
        {products.map((product) => (
          <CartProductItem product={product} key={product.id} />
        ))}
      </SheetContent>
    </Sheet>
  );
};
