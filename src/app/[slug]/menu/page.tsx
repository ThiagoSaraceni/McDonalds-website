import { ConsumptionMethod } from "@prisma/client";
import Image from "next/image";
import { notFound } from "next/navigation";

import { getRestaurantBySlug } from "@/data/get-restaurant-by-slug";

interface RestaurantMenuPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ consumptionMethod: string }>;
}

const inConsumptionMethodValid = (ConsumptionMethod: string) => {
  return ["DINE_IN", "TAKEAWAY"].includes(ConsumptionMethod);
};

const RestaurantMenuPage = async ({
  params,
  searchParams,
}: RestaurantMenuPageProps) => {
  const { slug } = await params;
  const { consumptionMethod } = await searchParams;

  const restaurant = await getRestaurantBySlug(slug);
  if (!restaurant) {
    return notFound();
  }

  if (!inConsumptionMethodValid(consumptionMethod)) {
    return notFound();
  }

  return (
    <>
      <div className="relative h-[250px] w-full">
        <Image
          src={restaurant?.coverImageUrl}
          fill
          alt={restaurant?.name}
          className="object-cover"
        />
      </div>
      <h1>oi</h1>
    </>
  );
};

export default RestaurantMenuPage;
