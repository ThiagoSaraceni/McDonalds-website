import { useContext } from "react";

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

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
