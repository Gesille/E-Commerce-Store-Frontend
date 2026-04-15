"use client";

import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "./ui/button";
import {
  DollarSign,
  Edit3,
  Grid3X3,
  Layers,
  Mail,
  MapPin,
  Package,
  Palette,
  Phone,
  Shield,
  User,
} from "lucide-react";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { useState } from "react";

const categories = [
  "Ovens",
  "Stoves",
  "Grills",
  "Fryers",
  "Steamers",
  "Microwaves",
  "Freezers",
] as const;
const colors = [
  "red",
  "orange",
  "amber",
  "yellow",
  "blue",
  "purple",
  "cyan",
] as const;
const sizes = ["Small", "Medium", "Large", "Industrial"] as const;

const formSchema = z.object({
  name: z.string().min(1, { message: "Product name is required!" }),
  shortDescription: z
    .string()
    .min(1, { message: "Short description is required!" })
    .max(60),
  description: z.string().min(1, { message: "Description is required!" }),
  price: z.number().min(1, { message: "Price is required" }),
  category: z.enum(categories),
  sizes: z.array(z.enum(sizes)),
  colors: z.array(z.enum(colors)),
  images: z.record(z.enum(colors), z.string()),
  quantity: z.number().min(0),
});

const AddProduct = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const [imagePreviews, setImagePreviews] = useState<Record<string, string>>(
    {},
  );

  return (
    <SheetContent className="w-[420px] sm:w-[500px] p-0 bg-gradient-to-b from-indigo-50 via-white to-purple-50 dark:from-zinc-950 dark:via-zinc-950 dark:to-zinc-900">
      {/* HEADER */}
      <SheetHeader className="p-6 bg-blue-50 border-b border-blue-100 text-slate-900">
        <SheetTitle className="text-xl font-semibold flex items-center gap-2 text-slate-800">
          <User size={18} />
          Add Product
        </SheetTitle>

        <p className="text-sm text-slate-500">
          Create a new product for your store
        </p>
      </SheetHeader>

      {/* FORM */}
      <div className="p-5 max-h-[calc(100vh-140px)] overflow-y-auto">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) => console.log(data))}
            className="space-y-6"
          >
            {/* PERSONAL */}
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-indigo-700">
                      <User size={14} /> Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="bg-white dark:bg-zinc-900 border-indigo-200 dark:border-zinc-700 focus:ring-2 focus:ring-indigo-500/40 rounded-lg transition"
                      />
                    </FormControl>
                    <FormDescription>
                      Enter the name of the product.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="shortDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-indigo-700">
                      <Mail size={14} /> Short Description
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="bg-white dark:bg-zinc-900 border-indigo-200 dark:border-zinc-700 focus:ring-2 focus:ring-indigo-500/40 rounded-lg transition"
                      />
                    </FormControl>
                    <FormDescription>
                      Enter the short description of the product.
                    </FormDescription>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* CONTACT */}
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-emerald-700">
                      <Edit3 size={14} /> Description
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        className="bg-white dark:bg-zinc-900 border-emerald-200 dark:border-zinc-700 focus:ring-2 focus:ring-emerald-500/40 rounded-lg transition"
                      />
                    </FormControl>
                    <FormDescription>
                      Enter the description of the product.
                    </FormDescription>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-emerald-700">
                      <DollarSign size={14} /> Price
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        className="bg-white dark:bg-zinc-900 border-emerald-200 dark:border-zinc-700 focus:ring-2 focus:ring-emerald-500/40 rounded-lg transition"
                      />
                    </FormControl>
                    <FormDescription>
                      Enter the price of the product.
                    </FormDescription>

                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Quantity */}
              <FormField
  control={form.control}
  name="quantity"
  render={({ field }) => (
    <FormItem>
      <FormLabel className="flex items-center gap-2 text-purple-700">
        <Package size={14} /> Quantity
      </FormLabel>

      <FormControl>
        <Input
          type="number"
          min={0}
          {...field}
          onChange={(e) => field.onChange(Number(e.target.value))}
          className="bg-white dark:bg-zinc-900 border-purple-200 dark:border-zinc-700 focus:ring-2 focus:ring-purple-500/40 rounded-lg transition"
        />
      </FormControl>

      <FormDescription>
        Set how many items are available in stock
      </FormDescription>

      <FormMessage />
    </FormItem>
  )}
/>
              {/* CATEGORY */}
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-pink-600">
                      <Layers size={14} /> Categories
                    </FormLabel>

                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        {categories.map((c) => (
                          <SelectItem key={c} value={c}>
                            {c}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sizes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-emerald-700">
                      <Grid3X3 size={14} /> Sizes
                    </FormLabel>

                    <FormControl>
                      <div className="grid grid-cols-2 gap-3 mt-2">
                        {sizes.map((size) => (
                          <label
                            key={size}
                            className="flex items-center gap-2 p-2 rounded-md border bg-white dark:bg-zinc-900 border-emerald-100 dark:border-zinc-700 cursor-pointer hover:bg-emerald-50 transition"
                          >
                            <Checkbox
                              checked={field.value?.includes(size)}
                              onCheckedChange={(checked) => {
                                const currentValue = field.value || [];

                                if (checked) {
                                  field.onChange([...currentValue, size]);
                                } else {
                                  field.onChange(
                                    currentValue.filter((v) => v !== size),
                                  );
                                }
                              }}
                            />

                            {/* Size badge */}
                            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                              {size}
                            </span>
                          </label>
                        ))}
                      </div>
                    </FormControl>

                    <FormDescription>
                      Select available product sizes
                    </FormDescription>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="colors"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-indigo-700">
                      <Palette size={14} /> Colors
                    </FormLabel>

                    <FormControl>
                      <div className="space-y-4">
                        {/* COLORS SELECT */}
                        <div className="grid grid-cols-2 gap-3 mt-2">
                          {colors.map((color) => (
                            <label
                              key={color}
                              className="flex items-center gap-2 p-2 rounded-md border bg-white dark:bg-zinc-900 border-indigo-100 dark:border-zinc-700 cursor-pointer hover:bg-indigo-50 transition"
                            >
                              <Checkbox
                                checked={field.value?.includes(color)}
                                onCheckedChange={(checked) => {
                                  const currentValue = field.value || [];

                                  if (checked) {
                                    field.onChange([...currentValue, color]);
                                  } else {
                                    field.onChange(
                                      currentValue.filter((v) => v !== color),
                                    );
                                  }
                                }}
                              />

                              {/* Color circle */}
                              <div
                                className="w-4 h-4 rounded-full border"
                                style={{ backgroundColor: color }}
                              />

                              {/* Color name */}
                              <span className="text-sm capitalize text-slate-700 dark:text-slate-300">
                                {color}
                              </span>
                            </label>
                          ))}
                        </div>

                        {/* SELECTED COLORS + IMAGE UPLOAD */}
                        {field.value && field.value.length > 0 && (
                          <div className="space-y-3 pt-2 border-t border-indigo-100">
                            <p className="text-sm font-medium text-slate-600">
                              Upload images for selected colors
                            </p>

                            {field.value.map((color) => (
                              <div
                                key={color}
                                className="flex items-center gap-3 p-2 rounded-md border border-indigo-100 bg-white dark:bg-zinc-900 dark:border-zinc-700"
                              >
                                {/* Color indicator */}
                                <div
                                  className="w-4 h-4 rounded-full border"
                                  style={{ backgroundColor: color }}
                                />

                                {/* Name */}
                                <span className="text-sm capitalize text-slate-700 dark:text-slate-300 w-20">
                                  {color}
                                </span>

                                {/* Upload input */}
                                <div className="flex flex-col gap-2 w-full">
                                  <Input
                                    type="file"
                                    accept="image/*"
                                    className="flex-1 text-sm"
                                    onChange={(e) => {
                                      const file = e.target.files?.[0];
                                      if (!file) return;

                                      const currentImages =
                                        form.getValues("images") || {};
                                      form.setValue("images", {
                                        ...currentImages,
                                        [color]: file,
                                      });

                                      // ✅ ADD PREVIEW
                                      const previewUrl =
                                        URL.createObjectURL(file);
                                      setImagePreviews((prev) => ({
                                        ...prev,
                                        [color]: previewUrl,
                                      }));
                                    }}
                                  />

                                  {/* ✅ IMAGE PREVIEW */}
                                  {imagePreviews[color] && (
                                    <img
                                      src={imagePreviews[color]}
                                      alt={`${color} product preview`}
                                      className="w-14 h-14 object-cover rounded-md border shadow-sm"
                                    />
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </FormControl>

                    <FormDescription>
                      Select available product colors
                    </FormDescription>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* BUTTON */}
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 text-white hover:opacity-90 rounded-lg shadow-md"
            >
              Save Product
            </Button>
          </form>
        </Form>
      </div>
    </SheetContent>
  );
};

export default AddProduct;
