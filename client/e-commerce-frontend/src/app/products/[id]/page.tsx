import ProductInteraction from "@/src/components/ProductInteraction";
import { ProductType } from "@/src/types";
import Image from "next/image";



 // TEMPORARY
const product: ProductType = {
  id: 1,
  name: "Adidas CoreFit T-Shirt",
  shortDescription:
    "Premium everyday wear designed for comfort, durability, and modern style.",
  description: "Lorem ipsum dolor sit amet consect adipisicing elit.",
  price: 59.9,
  sizes: ["xs", "s", "m", "l", "xl"],
  colors: ["gray", "purple", "green"],
  images: {
    gray: "/products/1g.png",
    purple: "/products/1p.png",
    green: "/products/1gr.png",
  },
  stock: 8,
};

const colorMap: Record<string, string> = {
  gray: "#9CA3AF",
  purple: "#A855F7",
  green: "#22C55E",
};



export const generateMetadata = async ({
  params,
}: {
  params: { id: string };
}) => {
  // TODO:get the product from db
  // TEMPORARY
  return {
    title: product.name,
    describe: product.description,
  };
};



const ProductPage = async ({
  params :{id},
  searchParams,
}: {
  params: { id: string };
  searchParams: { color?: string; size?: string };
}) => {
  
  const { size, color } =  searchParams;

  const selectedSize = size || product.sizes[0];
  const selectedColor = color || product.colors[0];

  return (
    <div className="min-h-screen bg-linear-to-b from-white via-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-4 py-14">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* IMAGE SECTION */}
          <div className="lg:sticky lg:top-24">
            <div
              className="relative rounded-3xl p-10 shadow-xl border overflow-hidden"
              style={{
                background: `radial-gradient(circle at top, ${
                  colorMap[selectedColor]
                }15, white 60%)`,
              }}
            >
              <div className="relative w-full max-w-md aspect-square mx-auto">
                <Image
                  src={product.images[selectedColor]}
                  alt={product.name}
                  fill
                  className="object-contain drop-shadow-lg"
                  priority
                />
              </div>
            </div>

            {/* COLOR DOTS */}
            <div className="flex justify-center gap-3 mt-6">
              {product.colors.map((c) => (
                <div
                  key={c}
                  className="w-4 h-4 rounded-full border-2 border-white shadow-md"
                  style={{ backgroundColor: colorMap[c] }}
                />
              ))}
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex flex-col gap-7">
            {/* TITLE */}
            <div>
              <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
                {product.name}
              </h1>
              <p className="text-gray-500 mt-3 leading-relaxed">
                {product.shortDescription}
              </p>
            </div>

            {/* PRICE */}
            <div className="flex items-center gap-3">
              <span className="text-4xl font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </span>

              {product.stock > 5 ? (
                <span className="px-3 py-1 text-xs rounded-full bg-emerald-100 text-emerald-700 font-medium">
                  In Stock
                </span>
              ) : product.stock > 0 ? (
                <span className="px-3 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700 font-medium">
                  Only {product.stock} left ⚠️
                </span>
              ) : (
                <span className="px-3 py-1 text-xs rounded-full bg-red-100 text-red-600 font-medium">
                  Out of Stock ❌
                </span>
              )}
            </div>

            {/* PRODUCT ACTION */}
            <div className="bg-white border rounded-2xl p-6 shadow-sm hover:shadow-md transition">
              <ProductInteraction
                product={product}
                selectedSize={selectedSize}
                selectedColor={selectedColor}
                
              />
            </div>

            {/* FEATURES */}
            <div className="grid grid-cols-3 gap-3 text-center text-xs">
              <div className="p-3 rounded-xl bg-gray-50 border">
                🚚 Fast Shipping
              </div>
              <div className="p-3 rounded-xl bg-gray-50 border">
                🔒 Secure Pay
              </div>
              <div className="p-3 rounded-xl bg-gray-50 border">
                ↩ Easy Returns
              </div>
            </div>

            {/* PAYMENT */}
            <div className="flex gap-3">
              <div className="bg-white border rounded-lg px-3 py-2">
                <Image src="/klarna.png" alt="" width={50} height={25} />
              </div>
              <div className="bg-white border rounded-lg px-3 py-2">
                <Image src="/cards.png" alt="" width={50} height={25} />
              </div>
              <div className="bg-white border rounded-lg px-3 py-2">
                <Image src="/stripe.png" alt="" width={50} height={25} />
              </div>
            </div>

            {/* NOTE */}
            <p className="text-xs text-gray-400 leading-relaxed">
              By purchasing you agree to our Terms & Privacy Policy. Secure
              checkout enabled.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
