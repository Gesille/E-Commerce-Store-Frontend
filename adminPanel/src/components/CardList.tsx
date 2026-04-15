import Image from "next/image";
import { Card, CardContent, CardFooter, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { object } from "zod";

const popularProducts = [
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
];

const latestTransactions = [
  {
    id: 1,
    title: "Order Payment",
    badge: "John Doe",
    image:
      "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=800",
    count: 1400,
  },
  {
    id: 2,
    title: "Order Payment",
    badge: "Jane Smith",
    image:
      "https://images.pexels.com/photos/4969918/pexels-photo-4969918.jpeg?auto=compress&cs=tinysrgb&w=800",
    count: 2100,
  },
  {
    id: 3,
    title: "Order Payment",
    badge: "Michael Johnson",
    image:
      "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=800",
    count: 1300,
  },
  {
    id: 4,
    title: "Order Payment",
    badge: "Lily Adams",
    image:
      "https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=800",
    count: 2500,
  },
  {
    id: 5,
    title: "Order Payment",
    badge: "Sam Brown",
    image:
      "https://images.pexels.com/photos/1680175/pexels-photo-1680175.jpeg?auto=compress&cs=tinysrgb&w=800",
    count: 1400,
  },
    {
    id: 6,
    title: "Order Payment",
    badge: "Lily Adams",
    image:
      "https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=800",
    count: 2500,
  },
  {
    id: 7,
    title: "Order Payment",
    badge: "Sam Brown",
    image:
      "https://images.pexels.com/photos/1680175/pexels-photo-1680175.jpeg?auto=compress&cs=tinysrgb&w=800",
    count: 1400,
  },
  
];


const colors = [
  "from-blue-500 to-indigo-500",
  "from-green-500 to-emerald-500",
  "from-pink-500 to-rose-500",
  "from-yellow-500 to-orange-500",
  "from-purple-500 to-violet-500",
];

const CardList = ({ title }: { title: string }) => {
  const data =
    title === "Popular Products" ? popularProducts : latestTransactions;

  return (
    <div>
      <h1 className="text-lg font-medium mb-6">{title}</h1>

      <div className="max-h-[50vh] overflow-y-auto space-y-2 pr-1">
        {data.map((item: any, index: number) => (
          <div
            key={item.id}
            className="flex items-center gap-3 p-3 rounded-xl border bg-gradient-to-r from-white to-gray-50 hover:shadow-md transition-all hover:-translate-y-[1px]"
          >
            {/* colored indicator */}
            <div
              className={`w-1.5 h-10 rounded-full bg-gradient-to-b ${
                colors[index % colors.length]
              }`}
            />

            {/* image */}
            <div className="w-11 h-11 relative rounded-lg overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
              <Image
                src={item.image || Object.values(item.images || {})[0]}
                alt=""
                fill
                className="object-cover"
              />
            </div>

            {/* text */}
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-800">
                {item.name || item.title}
              </p>

              {"badge" in item && (
                <p className="text-xs text-gray-500">{item.badge}</p>
              )}
            </div>

            {/* right value */}
            <div className="text-sm font-bold text-gray-700">
              {"price" in item
                ? `$${item.price}`
                : `${item.count / 1000}K`}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardList;
