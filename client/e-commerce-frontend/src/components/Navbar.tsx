"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Bell } from "lucide-react";
import SearchBar from "./SearchBar";
import ShoppingCartIcon from "./ShoppingCartIcon";

type NavLink = {
  name: string;
  path: string;
};

type User = {
  name?: string;
  image?: string;
} | null;

const Navbar = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [user, setUser] = useState<User>(null);

  const pathname = usePathname();

  const navLinks: NavLink[] = [
    { name: "home", path: "/" },
    { name: "shop", path: "/shop" },
    { name: "categories", path: "/categories" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-6 py-3">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
           src="/chefworldlogo.png"
            width={200} 
            height={50} 
            alt="logo"
             priority
            />
          
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 relative">
          {navLinks.map((item) => {
            const isActive =
              item.path === "/"
                ? pathname === "/"
                : pathname.startsWith(item.path);

            return (
              <Link
                key={item.name}
                href={item.path}
                className="relative text-lg font-medium capitalize"
              >
                {item.name}

                {isActive && (
                  <motion.div
                    layoutId="underline"
                    className="absolute left-0 -bottom-1 w-full h-0.5 bg-black rounded"
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Search Desktop */}
        <div className="hidden md:flex w-95">
          <SearchBar />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">

          {/* Cart */}
          <button className="relative p-2 hover:bg-gray-100 rounded-full transition">
            <ShoppingCartIcon />
          </button>
          
          {/* Bell */}
          <button className="relative p-2 hover:bg-gray-100 rounded-full transition">
            
            <Bell size={22} />
          </button>

          {/* USER */}
          {!user ? (
            <Link
              href="/login"
              className="hidden md:block bg-black text-white px-4 py-2 rounded-full text-lg hover:scale-105 transition"
            >
              Sign in
            </Link>
          ) : (
            <div className="relative group hidden md:block">
              <Image
                src={user.image || "/user.jpg"}
                alt="user"
                width={36}
                height={36}
                className="rounded-full cursor-pointer object-cover"
              />

              <div className="absolute right-0 mt-2 w-44 bg-white border rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition">
                <Link
                  href="/profile"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Profile
                </Link>

                <Link
                  href="/orders"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Orders
                </Link>

                <button
                  onClick={() => setUser(null)}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
                >
                  Logout
                </button>
              </div>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button onClick={() => setOpen(true)} className="md:hidden p-2">
            <Menu size={26} />
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <>
            {/* overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-50"
              onClick={() => setOpen(false)}
            />

            {/* drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 120 }}
              className="fixed right-0 top-0 h-full w-[80%] max-w-sm bg-white z-50 p-5 flex flex-col gap-6"
            >
              {/* header */}
              <div className="flex justify-between items-center">
                <span className="font-bold text-lg">Menu</span>
                <button onClick={() => setOpen(false)}>
                  <X />
                </button>
              </div>

              {/* search */}
                <SearchBar />
            

              {/* links */}
              {navLinks.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  onClick={() => setOpen(false)}
                  className="text-lg font-medium py-2 hover:translate-x-1 transition capitalize"
                >
                  {item.name}
                </Link>
              ))}

              {/* mobile auth */}
              <div className="mt-auto border-t pt-4 flex flex-col gap-3">
                {!user ? (
                  <Link
                    href="/login"
                    onClick={() => setOpen(false)}
                    className="bg-black text-white py-2 rounded-full text-center"
                  >
                    Sign in
                  </Link>
                ) : (
                  <button
                    onClick={() => setUser(null)}
                    className="text-red-500 text-left"
                  >
                    Logout
                  </button>
                )}

                <div className="flex items-center justify-between pt-2">
                  <span className="text-sm">Cart</span>
                  <ShoppingCartIcon />
                </div>

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;