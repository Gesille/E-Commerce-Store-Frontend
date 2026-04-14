"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
import { PaymentFormInputs, paymentFormSchema } from "../types";

const PaymentForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentFormInputs>({
    resolver: zodResolver(paymentFormSchema),
  });

  const handlePaymentForm: SubmitHandler<PaymentFormInputs> = (data) => {
    console.log(data);
  };

  const inputStyle =
    "w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition";

  return (
    <form onSubmit={handleSubmit(handlePaymentForm)} className="flex flex-col gap-5">

      <div>
        <label className="text-xs text-gray-500">Name on card</label>
        <input {...register("cardHolder")} className={inputStyle} placeholder="John Doe" />
        {errors.cardHolder && (
          <p className="text-xs text-red-500">{errors.cardHolder.message}</p>
        )}
      </div>

      <div>
        <label className="text-xs text-gray-500">Card Number</label>
        <input {...register("cardNumber")} className={inputStyle} placeholder="1234 5678 9012 3456" />
        {errors.cardNumber && (
          <p className="text-xs text-red-500">{errors.cardNumber.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-gray-500">Expiry</label>
          <input {...register("expirationDate")} className={inputStyle} placeholder="MM/YY" />
          {errors.expirationDate && (
            <p className="text-xs text-red-500">{errors.expirationDate.message}</p>
          )}
        </div>

        <div>
          <label className="text-xs text-gray-500">CVV</label>
          <input {...register("cvv")} className={inputStyle} placeholder="123" />
          {errors.cvv && (
            <p className="text-xs text-red-500">{errors.cvv.message}</p>
          )}
        </div>
      </div>

      {/* Payment badges */}
      <div className="flex items-center gap-3 mt-2 opacity-80">
        <Image src="/stripe.png" alt="stripe" width={60} height={30} />
        <Image src="/cards.png" alt="cards" width={60} height={30} />
        <Image src="/klarna.png" alt="klarna" width={60} height={30} />
      </div>

      <button
        type="submit"
        className="w-fullbg-linear-to-r from-indigo-500 to-violet-500 text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2 hover:opacity-95 active:scale-95 transition"
      >
        Checkout
        <ShoppingCart className="w-4 h-4" />
      </button>
    </form>
  );
};

export default PaymentForm;