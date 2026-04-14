"use client";

import { useState } from "react";
import Link from "next/link";
import { ProductType } from "../types";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import useCartStore from "@/src/stores/cartStore";
import { toast } from "react-toastify";

const ProductCard = ({ product }: { product: ProductType }) => {
  const [productTypes, setProductTypes] = useState({
    size: product.sizes[0],
    color: product.colors[0],
  });

  const { addToCart } = useCartStore();

 
  const handleProductType = ({
    type,
    value,
  }: {
    type: "size" | "color";
    value: string;
  }) => {
    setProductTypes((prev) => ({
      ...prev,
      [type]: value,
    }));
  };
 
  const handleAddToCart = () => {
    addToCart({
      ...product,
      quantity: 1,
      selectedSize: productTypes.size,
      selectedColor: productTypes.color,
    });

    toast.success("Product added to cart");
  };

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full">

      {/* IMAGE */}
      <Link href={`/products/${product.id}`}>
        <div className="relative h-48 overflow-hidden">
          <Image
            src={product.images[productTypes.color]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
        </div>
      </Link>

      {/* CONTENT */}
      <div className="p-5 flex flex-col gap-4 flex-1">

        {/* TITLE */}
        <h1 className="font-semibold text-lg text-gray-900 line-clamp-1">
          {product.name}
        </h1>

        {/* DESCRIPTION */}
        <p className="text-sm text-gray-500 line-clamp-2">
          {product.shortDescription}
        </p>

        {/* OPTIONS */}
        <div className="flex items-start justify-between gap-4 min-h-22.5">

          {/* SIZE */}
          <div className="flex flex-col gap-1">
            <span className="text-xs text-gray-400">Size</span>

            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() =>
                    handleProductType({ type: "size", value: size })
                  }
                  className={`px-3 py-1 rounded-lg text-sm font-medium border transition-all duration-200 whitespace-nowrap hover:scale-105 active:scale-95
                  ${
                    productTypes.size === size
                      ? "bg-linear-to-r from-pink-500 to-violet-500 text-white border-transparent shadow-md"
                      : "bg-white text-gray-700 border-gray-200 hover:border-pink-300 hover:text-pink-600"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* COLORS */}
          <div className="flex flex-col gap-1">
            <span className="text-xs text-gray-400">Color</span>

            <div className="flex items-center gap-2">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() =>
                    handleProductType({ type: "color", value: color })
                  }
                  className={`w-4 h-4 rounded-full border transition-transform hover:scale-110 ${
                    productTypes.color === color
                      ? "ring-2 ring-black scale-110"
                      : "border-gray-300"
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="mt-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-2">

          {/* PRICE */}
          <p className="text-lg font-semibold text-gray-900">
            ${product.price.toFixed(2)}
          </p>

          {/* BUTTON */}
          <button
            onClick={handleAddToCart}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-blue-800 active:scale-95 transition-all duration-200 shadow-md"
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </button>

        </div>
      </div>
    </div>
  );
};

export default ProductCard;