import Image from "next/image";
import { notFound } from "next/navigation";

import { getRestaurantBySlug } from "@/data/get-restaurant-by-slug";

import { ConsumptionMethodOption } from "./components/sonsumption-method-option";

interface RestaurantPageProps {
  params: Promise<{ slug: string }>;
}
const RestaurantPage = async ({ params }: RestaurantPageProps) => {
  const { slug } = await params;
  const restaurant = await getRestaurantBySlug(slug);
  if (!restaurant) {
    return notFound();
  }

  return (
    <div className="px-21 flex h-screen flex-col items-center justify-center px-6 pt-24">
      {/* LOGO E TIPO */}
      <div className="flex flex-col items-center gap-2">
        <Image
          src={restaurant?.avatarImageUrl}
          alt={restaurant?.name}
          width={82}
          height={82}
        />
        <h2 className="font-semibold">{restaurant?.name}</h2>
      </div>

      {/* BEM VINDO */}
      <div className="space-y-2 pt-24 text-center">
        <h3 className="text-2xl font-semibold">Seja bem vindo!</h3>
        <p className="opacity-55">
          Escolha como prefere aproveitar sua refeição. Estamos oferecer
          praticidade e sabor em cada detalhe!
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-14">
        <ConsumptionMethodOption
          slug={slug}
          buttonText="Para comer aqui"
          altImg="Comer aqui"
          imgUrl="/dine_in.png"
          option="DINE_IN"
        />
        <ConsumptionMethodOption
          slug={slug}
          buttonText="Para levar"
          altImg="Para  levar"
          imgUrl="/take_away.png"
          option="TAKEAWAY"
        />
      </div>
    </div>
  );
};

export default RestaurantPage;
