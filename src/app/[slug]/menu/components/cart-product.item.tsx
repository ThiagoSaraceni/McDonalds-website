import { ChevronLeftIcon, ChevronRightCircle, TrashIcon } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/helpers/format-currency";

import { CartProduct } from "../contexts/cart";

interface CartItemProps {
  product: CartProduct;
}

export const CartProductItem = ({ product }: CartItemProps) => {
  return (
    <div className="flex items-center justify-between mb-4 gap-4">

        {/* ESQUERDA */}
        <div className="flex items-center gap-3">
        <div className="relative h-20 w-20 bg-gray-100 rounded-lg p-2">
        <Image src={product.imageUrl} alt={product.name} fill />
      </div>

      <div className="space-y-1 flex flex-col">
        <div className="space-y-1">
          <p className="text-xs">{product.name}</p>
          <p className="text-sm font-semibold">{formatCurrency(product.price)}</p>
        </div>
        <div className="flex items-center gap-1 text-center">
          <Button className="h-7 w-7" variant="outline">
            <ChevronLeftIcon />
          </Button>
          <p className="w-6 text-xs">8</p>
          <Button className="h-7 w-7" variant="destructive">
            <ChevronRightCircle />
          </Button>
        </div>
      </div>
      </div>
      
      {/* DIRETA */}
      <Button className="h-7 w-7 " variant="outline">
            <TrashIcon  />
        </Button>
    </div>
  );
};
