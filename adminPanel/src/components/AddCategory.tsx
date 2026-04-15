"use client";

import {
  SheetContent,
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
import { Button } from "./ui/button";
import { Tag } from "lucide-react";

/* ---------------- SCHEMA ---------------- */

const formSchema = z.object({
  name: z.string().min(2, { message: "Name is required" }).max(50),
});

/* ---------------- COMPONENT ---------------- */

const AddCategory = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  return (
    <SheetContent className="w-[420px] sm:w-[500px] p-0 bg-gradient-to-b from-indigo-50 via-white to-purple-50 dark:from-zinc-950 dark:via-zinc-950 dark:to-zinc-900">

      {/* HEADER */}
      <SheetHeader className="p-6 bg-blue-50 border-b border-blue-100 text-slate-900">
        <SheetTitle className="text-xl font-semibold flex items-center gap-2 text-slate-800">
          <Tag size={18} />
          Add Category
        </SheetTitle>

        {/* ✅ FIXED TEXT */}
        <p className="text-sm text-slate-500">
          Create a new product category for equipment
        </p>
      </SheetHeader>

      {/* FORM */}
      <div className="p-5 max-h-[calc(100vh-140px)] overflow-y-auto">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) => console.log(data))}
            className="space-y-6"
          >

            {/* NAME */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2 text-indigo-700">
                    <Tag size={14} />
                    Category Name
                  </FormLabel>

                  <FormControl>
                    <Input
                      {...field}
                      className="bg-white dark:bg-zinc-900 border-indigo-200 dark:border-zinc-700 focus:ring-2 focus:ring-indigo-500/40 rounded-lg transition"
                    />
                  </FormControl>

                  {/* ✅ FIXED TEXT */}
                  <FormDescription>
                    Enter a category name (e.g. Ovens, Grills, Fryers)
                  </FormDescription>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* BUTTON */}
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 text-white hover:opacity-90 rounded-lg shadow-md"
            >
              Create Category
            </Button>

          </form>
        </Form>
      </div>

    </SheetContent>
  );
};

export default AddCategory;