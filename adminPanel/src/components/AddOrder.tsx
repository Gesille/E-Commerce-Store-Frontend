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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "./ui/button";

import { DollarSign, User, Activity } from "lucide-react";

// ✅ FIXED SCHEMA
const formSchema = z.object({
  amount: z.coerce.number().min(1, {
    message: "Amount must be at least 1",
  }),
  userId: z.string().min(1, {
    message: "User ID is required",
  }),
  status: z.enum(["pending", "processing", "success", "failed"]),
});

const AddOrder = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 0,
      userId: "",
      status: "pending",
    },
  });

  return (
    <SheetContent className="w-[420px] sm:w-[500px] p-0 bg-background">

      {/* 🌈 HEADER */}
      <SheetHeader className="p-6 bg-blue-50 border-b border-blue-100 text-slate-900">
        <SheetTitle className="text-xl font-semibold flex items-center gap-2">
          <Activity size={18} />
          Create Order
        </SheetTitle>
        <p className="text-sm opacity-80">
          Add a new transaction to the system
        </p>
      </SheetHeader>

      {/* 🧊 FORM */}
      <div className="p-6 max-h-[calc(100vh-160px)] overflow-y-auto">

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) => console.log(data))}
            className="space-y-6"
          >

            {/* 💰 AMOUNT */}
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <DollarSign size={14} /> Amount
                  </FormLabel>

                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter amount..."
                      {...field}
                      className="bg-muted/50 focus:bg-background transition rounded-lg"
                    />
                  </FormControl>

                  <FormDescription>
                    The total price of the order.
                  </FormDescription>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 👤 USER ID */}
            <FormField
              control={form.control}
              name="userId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <User size={14} /> User ID
                  </FormLabel>

                  <FormControl>
                    <Input
                      placeholder="Enter user ID..."
                      {...field}
                      className="bg-muted/50 focus:bg-background transition rounded-lg"
                    />
                  </FormControl>

                  <FormDescription>
                    The ID of the customer.
                  </FormDescription>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 📊 STATUS */}
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Activity size={14} /> Status
                  </FormLabel>

                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-muted/50 rounded-lg">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      <SelectItem value="pending">🟡 Pending</SelectItem>
                      <SelectItem value="processing">🔵 Processing</SelectItem>
                      <SelectItem value="success">🟢 Success</SelectItem>
                      <SelectItem value="failed">🔴 Failed</SelectItem>
                    </SelectContent>
                  </Select>

                  <FormDescription>
                    Choose the current order status.
                  </FormDescription>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 🚀 BUTTON */}
            <Button
              type="submit"
              className="w-full mt-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 transition-all rounded-lg shadow-md"
            >
              Create Order
            </Button>

          </form>
        </Form>
      </div>
    </SheetContent>
  );
};

export default AddOrder;