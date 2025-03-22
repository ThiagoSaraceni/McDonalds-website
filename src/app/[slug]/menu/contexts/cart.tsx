"use client";

import { Product } from "@prisma/client";
import { createContext, ReactNode, useState } from "react";

export interface CartProduct
  extends Pick<Product, "id" | "name" | "price" | "imageUrl"> {
  quantity: number;
}

export interface ICartContext {
  isOpen: boolean;
  products: CartProduct[];
  toggleCart: () => void;
  total: number;
  addProduct: (product: CartProduct) => void;
  decreaseCartQuantity: (productId: string) => void;
  increaseCartQuantity: (productId: string) => void;
  removeProduct: (productId: string) => void;
}

export const CartContext = createContext<ICartContext>({
  isOpen: false,
  products: [],
  toggleCart: () => {},
  total: 0,
  addProduct: () => {},
  decreaseCartQuantity: () => {},
  increaseCartQuantity: () => {},
  removeProduct: () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<CartProduct[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const total = products.reduce((acc, product) => {
    return acc + product.price * product.quantity;
  }, 0);

  const toggleCart = () => {
    setIsOpen((prevState) => !prevState);
  };

  const addProduct = (product: CartProduct) => {
    //verificar se o produto já está no carrinho
    // se estiver, aumente a sua quantidade
    // se nao estiver, adicione
    const productIsAlredyOnTheCart = products.some(
      (prevProduct) => prevProduct.id === product.id,
    );

    if (!productIsAlredyOnTheCart) {
      return setProducts((prev) => [...prev, product]);
    }

    setProducts((prevProducts) => {
      return prevProducts.map((prevProduct) => {
        if (prevProduct.id === product.id) {
          return {
            ...prevProduct,
            quantity: prevProduct.quantity + product.quantity,
          };
        }
        return prevProduct;
      });
    });
  };

  const decreaseCartQuantity = (productId: string) => {
    setProducts((prevProducts) => {
      return prevProducts.map((prevProduct) => {
        if (prevProduct.id !== productId) {
          return prevProduct;
        }

        if (prevProduct.quantity === 1) {
          return prevProduct;
        }

        return { ...prevProduct, quantity: prevProduct.quantity - 1 };
      });
    });
  };

  const increaseCartQuantity = (productId: string) => {
    setProducts((prevProducts) => {
      return prevProducts.map((prevProduct) => {
        if (prevProduct.id === productId) {
          return { ...prevProduct, quantity: prevProduct.quantity + 1 };
        }
        return prevProduct;
      });
    });
  };

  const removeProduct = (productId: string) => {
    setProducts((prevProducts) =>
      prevProducts.filter((prevProduct) => prevProduct.id !== productId),
    );
  };

  return (
    <>
      <CartContext.Provider
        value={{
          isOpen,
          products,
          toggleCart,
          total,
          addProduct,
          decreaseCartQuantity,
          increaseCartQuantity,
          removeProduct,
        }}
      >
        {children}
      </CartContext.Provider>
    </>
  );
};
