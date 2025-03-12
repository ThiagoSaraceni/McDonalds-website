import { ChevronLeftIcon, ChevronRightCircle, TrashIcon } from "lucide-react";
import Image from "next/image";
import { useContext } from "react";

import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/helpers/format-currency";

import { CartContext, CartProduct } from "../contexts/cart";

interface CartItemProps {
  product: CartProduct;
}

export const CartProductItem = ({ product }: CartItemProps) => {
  const { decreaseCartQuantity, increaseCartQuantity } =
    useContext(CartContext);

  return (
    <div className="mb-4 flex items-center justify-between gap-4">
      {/* ESQUERDA */}
      <div className="flex items-center gap-3">
        <div className="relative h-20 w-20 rounded-lg bg-gray-100 p-2">
          <Image src={product.imageUrl} alt={product.name} fill />
        </div>

        <div className="flex flex-col space-y-1">
          <div className="space-y-1">
            <p className="text-xs">{product.name}</p>
            <p className="text-sm font-semibold">
              {formatCurrency(product.price)}
            </p>
          </div>
          <div className="flex items-center gap-1 text-center">
            <Button
              className="h-7 w-7"
              variant="outline"
              onClick={() => decreaseCartQuantity(product.id)}
            >
              <ChevronLeftIcon />
            </Button>
            <p className="w-6 text-xs">{product.quantity}</p>
            <Button
              className="h-7 w-7"
              variant="destructive"
              onClick={() => increaseCartQuantity(product.id)}
            >
              <ChevronRightCircle />
            </Button>
          </div>
        </div>
      </div>

      {/* DIRETA */}
      <Button className="h-7 w-7" variant="outline">
        <TrashIcon />
      </Button>
    </div>
  );
};
