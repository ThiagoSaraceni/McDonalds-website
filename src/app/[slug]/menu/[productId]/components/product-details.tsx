"use client";

import { Prisma } from "@prisma/client";
import { ChefHatIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import { useContext, useState } from "react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatCurrency } from "@/helpers/format-currency";

import { CartContext } from "../../contexts/cart";
import { CartSheet } from "./cart-sheet";

interface ProductDetailsProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true;
          avatarImageUrl: true;
        };
      };
    };
  }>;
}

export const ProductDetails = ({ product }: ProductDetailsProps) => {
  const { toggleCart, addProduct } = useContext(CartContext);

  const [quantity, setQuantity] = useState<number>(1);

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    addProduct({
      ...product,
      quantity,
    })
    toggleCart();
  };


  return (
    <>
      <div className="relative z-50 mt-[-1.5rem] flex flex-auto flex-col overflow-hidden rounded-t-3xl px-5 py-5">
        <div className="flex-auto flex-col overflow-hidden">
          {/* RESTAURANTE LOGO E NOME */}
          <div className="flex items-center gap-1">
            <Image
              src={product.restaurant.avatarImageUrl}
              alt={product.restaurant.name}
              height={16}
              width={16}
            />
            <p className="space-x-1 text-xs text-muted-foreground">
              {product.restaurant.name}
            </p>
          </div>

          {/* NOME DO PRODUTO */}
          <h2 className="mt-1 text-xl font-semibold">{product.name}</h2>

          {/* PRECO E QUANTIDADE */}
          <div className="mt-3 flex items-center justify-between">
            <h3 className="text-xl font-semibold">
              {formatCurrency(product.price)}
            </h3>
            <div className="flex items-center gap-3 text-center">
              <Button
                variant="outline"
                className="h-8 w-8 rounded-xl"
                onClick={handleDecreaseQuantity}
              >
                <ChevronLeftIcon />
              </Button>
              <p className="w-4">{quantity}</p>
              <Button
                variant="destructive"
                className="h-8 w-8 rounded-xl"
                onClick={handleIncreaseQuantity}
              >
                <ChevronRightIcon />
              </Button>
            </div>
          </div>

          <ScrollArea className="h-full">
            {/* SOBRE */}
            <div className="mt-6 space-y-3">
              <h4 className="font-semibold">Sobre</h4>
              <p className="text-sm text-muted-foreground">
                {product.description}
              </p>
            </div>

            {/* INGREDIENTES */}
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-1">
                <ChefHatIcon size={18} />
                <h4 className="font-semibold">Ingredientes</h4>
              </div>
              <ul className="list-disc px-5 text-sm text-muted-foreground">
                {product.ingredients.map((ingredient) => (
                  <li key={ingredient}>{ingredient}</li>
                ))}
              </ul>
            </div>
          </ScrollArea>
        </div>

        <Button
          color="default"
          className="mt-5 h-12 w-full rounded-full text-base"
          onClick={handleAddToCart}
        >
          Adicionar à Sacola
        </Button>

        <CartSheet />
      </div>

     
    </>
  );
};
