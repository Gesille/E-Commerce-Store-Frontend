//Temporary
'use client'

import Link from "next/link";
import { ProductsType } from "../types";
import Categories from "./Categories";
import ProductCard from "./ProductCard";
import Filter from "./Filter";

// TEMPORARY
const products: ProductsType = [
  {
    id: 5,
    name: "Commercial Grade Espresso Machine",
    shortDescription: "High-performance dual boiler system for busy cafes.",
    description:
      "Built for high-volume service, this machine features PID temperature control, volumetric dosing, and independent steam boilers for consistent performance.",
    price: 4299.99,
    sizes: ["1-Group", "2-Group", "3-Group"],
    colors: ["chrome", "red"],
    images: {
      chrome: "/products/1g.png",
      red: "/products/1gr.png",
    },
     stock: 8,
  },
  {
    id: 6,
    name: "Industrial Countertop Air Fryer",
    shortDescription:
      "Fast-circulating heat for crispy textures without excess oil.",
    description:
      "A heavy-duty countertop solution for small kitchens. Features a 10L capacity and digital timer settings perfect for rapid service.",
    price: 249.5,
    sizes: ["10L", "15L"],
    colors: ["silver", "black"],
    images: {
      silver: "/products/2g.png",
      black: "/products/2gr.png",
    },
     stock: 10,
  },
  {
    id: 7,
    name: "Stainless Steel Prep Table",
    shortDescription:
      "Durable 18-gauge steel workspace with adjustable undershelf.",
    description:
      "NSF certified for food safety. This heavy-duty table is designed to withstand rigorous daily use in commercial environments.",
    price: 185.0,
    sizes: ["36-inch", "48-inch", "60-inch", "72-inch"],
    colors: ["silver", "black"],
    images: {
      silver: "/products/3b.png",
      black: "/products/3bl.png",
    },
     stock: 20,
  },
  {
    id: 8,
    name: "High-Speed Commercial Blender",
    shortDescription: "3.5 peak HP motor for seamless smoothies and soups.",
    description:
      "Equipped with stainless steel blades and variable speed control. Designed to handle frozen ingredients and thick purees in seconds.",
    price: 580.0,
    sizes: ["64oz", "82oz"],
    colors: ["white", "gray"],
    images: {
      white: "/products/4p.png",
      gray: "/products/4w.png",
    },
     stock: 2,
  },
  {
    id: 9,
    name: "Commercial Grade Espresso Machine",
    shortDescription: "High-performance dual boiler system for busy cafes.",
    description:
      "Built for high-volume service, this machine features PID temperature control, volumetric dosing, and independent steam boilers for consistent performance.",
    price: 4299.99,
    sizes: ["1-Group", "2-Group", "3-Group"],
    colors: ["chrome", "red"],
    images: {
      chrome: "/products/5bl.png",

      red: "/products/5o.png",
    },
     stock: 30,
  },
  {
    id: 2,
    name: "Industrial Countertop Air Fryer",
    shortDescription:
      "Fast-circulating heat for crispy textures without excess oil.",
    description:
      "A heavy-duty countertop solution for small kitchens. Features a 10L capacity and digital timer settings perfect for rapid service.",
    price: 249.5,
    sizes: ["10L", "15L"],
    colors: ["silver", "black"],
    images: {
      silver: "/products/6g.png",
      black: "/products/6w.png",
    },
     stock: 5,
  },
  {
    id: 3,
    name: "Stainless Steel Prep Table",
    shortDescription:
      "Durable 18-gauge steel workspace with adjustable undershelf.",
    description:
      "NSF certified for food safety. This heavy-duty table is designed to withstand rigorous daily use in commercial environments.",
    price: 185.0,
    sizes: ["36-inch", "48-inch", "60-inch", "72-inch"],
    colors: ["silver", "black"],
    images: {
      silver: "/products/7g.png",
      black: "/products/7p.png",
    },
     stock: 80,
  },
  {
    id: 4,
    name: "High-Speed Commercial Blender",
    shortDescription: "3.5 peak HP motor for seamless smoothies and soups.",
    description:
      "Equipped with stainless steel blades and variable speed control. Designed to handle frozen ingredients and thick purees in seconds.",
    price: 580.0,
    sizes: ["64oz", "82oz"],
    colors: ["white", "gray"],
    images: {
      white: "/products/8b.png",
      gray: "/products/8gr.png",
    },
     stock: 15,
  },
];

const ProductList = ({ category,params }: { category: string, params:"homepage" | "products" }) => {
  return (
    <div className="w-full">
      <Categories />
      {params === "products" && <Filter/>
      }
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <Link
        href={category ? `/products/?category=${category}` : "/products"}
        className="flex justify-end mt-4 underline text-sm text-gray-500"
      >
        View all products
      </Link>
    </div>
  );
};

export default ProductList;
