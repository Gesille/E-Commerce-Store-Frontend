"use client";

import { useState } from "react";
import CardList from "@/components/CardList";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Progress } from "@/components/ui/progress";
import { BadgeCheck, Candy, Citrus, Shield } from "lucide-react";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import EditUser from "@/components/EditUser";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AppLineChart from "@/components/AppLineChart";

const SingleUserPage = () => {
  const [expanded, setExpanded] = useState(false);

  const shortText =
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vel voluptas distinctio ab ipsa commodi fugiat labore quos veritatis...";

  const fullText =
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vel voluptas distinctio ab ipsa commodi fugiat labore quos veritatis cum corrupti sed repudiandae ipsum, harum recusandae ratione ipsam in, quis quia.";

  return (
    <div className="p-4 space-y-6 bg-gradient-to-br from-slate-50 to-gray-100 min-h-screen">

      {/* 🔹 Breadcrumb */}
      <div className="bg-white/80 backdrop-blur border rounded-xl px-4 py-3 shadow-sm">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/" className="text-indigo-600 hover:text-indigo-800 font-medium">
                Dashboard
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/users" className="text-indigo-600 hover:text-indigo-800 font-medium">
                Users
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="font-semibold text-gray-800">
                Giselle Georges
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* 🔹 MAIN */}
      <div className="flex flex-col xl:flex-row gap-8">

        {/* LEFT */}
        <div className="w-full xl:w-1/3 space-y-6">

          {/* ✅ USER BADGES (same content, better design) */}
          <div className="bg-white rounded-xl border shadow-sm p-5 hover:shadow-md transition">
            <h1 className="text-lg font-semibold text-gray-800">
              User Badges
            </h1>

            <div className="flex gap-4 mt-5">

              {/* Verified */}
              <HoverCard>
                <HoverCardTrigger>
                  <div className="p-2 rounded-full bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 hover:scale-110 transition cursor-pointer">
                    <BadgeCheck size={22} className="text-blue-600" />
                  </div>
                </HoverCardTrigger>
                <HoverCardContent>
                  <h1 className="font-semibold mb-2 text-blue-600">Verified User</h1>
                  <p className="text-sm text-muted-foreground">
                    This user has been verified by the admin.
                  </p>
                </HoverCardContent>
              </HoverCard>

              {/* Admin */}
              <HoverCard>
                <HoverCardTrigger>
                  <div className="p-2 rounded-full bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 hover:scale-110 transition cursor-pointer">
                    <Shield size={22} className="text-emerald-600" />
                  </div>
                </HoverCardTrigger>
                <HoverCardContent>
                  <h1 className="font-semibold mb-2 text-emerald-600">Admin</h1>
                  <p className="text-sm text-muted-foreground">
                    Admin users have full access.
                  </p>
                </HoverCardContent>
              </HoverCard>

              {/* Awarded */}
              <HoverCard>
                <HoverCardTrigger>
                  <div className="p-2 rounded-full bg-gradient-to-br from-amber-50 to-yellow-100 border border-yellow-200 hover:scale-110 transition cursor-pointer">
                    <Candy size={22} className="text-yellow-600" />
                  </div>
                </HoverCardTrigger>
                <HoverCardContent>
                  <h1 className="font-semibold mb-2 text-yellow-600">Awarded</h1>
                  <p className="text-sm text-muted-foreground">
                    This user has been awarded.
                  </p>
                </HoverCardContent>
              </HoverCard>

              {/* Popular */}
              <HoverCard>
                <HoverCardTrigger>
                  <div className="p-2 rounded-full bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 hover:scale-110 transition cursor-pointer">
                    <Citrus size={22} className="text-orange-600" />
                  </div>
                </HoverCardTrigger>
                <HoverCardContent>
                  <h1 className="font-semibold mb-2 text-orange-600">Popular</h1>
                  <p className="text-sm text-muted-foreground">
                    Popular in the community.
                  </p>
                </HoverCardContent>
              </HoverCard>

            </div>
          </div>

          {/* 🔸 USER CARD */}
          <div className="bg-white rounded-xl border shadow-sm p-5 hover:shadow-md transition">
            <div className="flex items-center gap-4">
              <Avatar className="size-16 ring-2 ring-indigo-300 shadow-sm">
                <AvatarImage src="/avatar.png" />
                <AvatarFallback>GG</AvatarFallback>
              </Avatar>

              <div>
                <h1 className="text-lg font-semibold text-gray-800">
                  Giselle
                </h1>
                <p className="text-xs text-indigo-500 font-medium">
                  Admin User
                </p>
              </div>
            </div>

            {/* ✅ READ MORE FIXED */}
            <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
              {expanded ? fullText : shortText}
            </p>

            <button
              onClick={() => setExpanded((prev) => !prev)}
              className="mt-2 text-indigo-600 hover:text-indigo-800 text-xs font-semibold"
            >
              {expanded ? "Read less" : "Read more"}
            </button>
          </div>

          {/* 🔸 USER INFO */}
          <div className="bg-white rounded-xl border shadow-sm p-5 hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <h1 className="text-lg font-semibold text-emerald-600">
                User Information
              </h1>

              <Sheet>
                <SheetTrigger asChild>
                  <Button className="bg-emerald-600 hover:bg-emerald-700 shadow-sm">
                    Edit User
                  </Button>
                </SheetTrigger>
                <EditUser />
              </Sheet>
            </div>

            <div className="mt-5 space-y-4 text-sm">

              <div>
                <p className="text-xs text-muted-foreground">
                  Profile completion
                </p>
                <Progress value={66} className="mt-1 h-2" />
              </div>

              <p><span className="font-semibold text-gray-700">Full Name:</span> Giselle Georges</p>
              <p><span className="font-semibold text-gray-700">Email:</span> gezelgeorges@gmail.com</p>
              <p><span className="font-semibold text-gray-700">Phone:</span> +1(268)778-5517</p>
              <p><span className="font-semibold text-gray-700">Address:</span> All Saints</p>
              <p><span className="font-semibold text-gray-700">City:</span> Antigua And Barbuda</p>

            

              <p className="text-xs text-muted-foreground pt-2 border-t">
                Joined on: 14/04/2026
              </p>
            </div>
          </div>

        </div>

        {/* RIGHT */}
        <div className="w-full xl:w-2/3 space-y-6">

          <div className="bg-white rounded-xl border shadow-sm p-5 hover:shadow-md transition">
            <h1 className="text-lg font-semibold text-indigo-600 mb-3">
              User Activity
            </h1>
            <AppLineChart />
          </div>

        </div>
      </div>
    </div>
  );
};

export default SingleUserPage;