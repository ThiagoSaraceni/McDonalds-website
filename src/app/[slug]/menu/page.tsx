import { notFound } from "next/navigation";

import { getRestaurantBySlug } from "@/data/get-restaurant-by-slug";

import { RestaurantCategories } from "./components/categories";
import { RestaurantHeader } from "./components/header";

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
      <RestaurantHeader restaurant={restaurant} />
      <RestaurantCategories restaurant={restaurant} />
    </>
  );
};

export default RestaurantMenuPage;
