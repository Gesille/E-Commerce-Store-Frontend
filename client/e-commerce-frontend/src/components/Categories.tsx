'use client'

import {
  ShoppingBasket,
  Coffee,
  Utensils,
  Flame,
  Refrigerator,
  Wind
} from "lucide-react";

import { useSearchParams, useRouter, usePathname } from "next/navigation";

const categories = [
  { name: "All", icon: <ShoppingBasket size={16} />, slug: "all" },
  { name: "Espresso & Coffee", icon: <Coffee size={16} />, slug: "coffee-machines" },
  { name: "Cooking Equipment", icon: <Flame size={16} />, slug: "cooking" },
  { name: "Refrigeration", icon: <Refrigerator size={16} />, slug: "cooling" },
  { name: "Food Prep", icon: <Utensils size={16} />, slug: "prep-tools" },
  { name: "Ventilation", icon: <Wind size={16} />, slug: "hvac" }
];

const Categories = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const selectedCategory = searchParams.get("category") ?? "all";

  const handleClick = (slug: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (slug === "all") {
      params.delete("category");
    } else {
      params.set("category", slug);
    }

    const queryString = params.toString();
    const url = queryString ? `${pathname}?${queryString}` : pathname;

    router.push(url, { scroll: false });
  };

  return (
    <div className="w-full flex justify-center mb-6">
      <div className="flex flex-wrap gap-3 p-1 rounded-xl">

        {categories.map((category) => {
          const isActive = selectedCategory === category.slug;

          return (
            <button
              key={category.slug}
              onClick={() => handleClick(category.slug)}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium
                transition-all duration-200 border

                ${
                  isActive
                    ? "bg-black text-white shadow-md scale-105"
                    : "bg-white text-gray-600 hover:bg-gray-200 hover:scale-105"
                }
              `}
            >
              {category.icon}
              {category.name}
            </button>
          );
        })}

      </div>
    </div>
  );
};

export default Categories;