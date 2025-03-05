import { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

interface ProductProps {
  products: Product[];
}

export const Products = ({ products }: ProductProps) => {
  const { slug } = useParams<{ slug: string }>();

  return (
    <div className="space-y-3 px-5 pt-1">
      {products.map((product) => (
        <Link
          key={product.id}
          href={`/${slug}/menu/${product.id}`}
          className="flex items-center justify-between gap-10 py-3"
        >
          {/* ESQUERDA */}
          <div>
            <h3 className="text-sm font-medium">{product.name}</h3>
            <p className="line-clamp-2 text-sm text-muted-foreground">
              {product.description}
            </p>
            <p className="text-sm-font-semibold pt-3">
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(product.price)}
            </p>
          </div>

          {/* DIREITA */}
          <div className="relative min-h-[82px] min-w-[120px]">
            <Image
              className="rounded-lg object-contain"
              src={product.imageUrl}
              alt={product.name}
              fill
            />
          </div>
        </Link>
      ))}
    </div>
  );
};
