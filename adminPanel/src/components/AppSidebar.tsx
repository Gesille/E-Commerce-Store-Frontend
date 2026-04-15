import {
  Home,
  Inbox,
  Calendar,
  Search,
  Settings,
  User2,
  ChevronUp,
  Plus,
  Projector,
  ChevronDown,
  Package,
  User,
  ShoppingBasket,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarSeparator,
} from "./ui/sidebar";
import Link from "next/link";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { Sheet, SheetTrigger } from "./ui/sheet";
import EditUser from "./EditUser";
import AddOrder from "./AddOrder";
import AddUser from "./AddUser";
import AddCategory from "./AddCategory";
import AddProduct from "./AddProduct";

const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

const AppSidebar = () => {
  return (
<Sidebar collapsible="icon" className="border-r bg-background">

  {/* HEADER */}
  <SidebarHeader className="px-3 py-3">
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton asChild>
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/avatar.png"
              alt="logo"
              width={26}
              height={26}
              className="rounded-md"
            />
            <span className="font-semibold text-sm">
              Chef's World
            </span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarHeader>

  <SidebarSeparator />

  <SidebarContent className="px-1">

    {/* APPLICATION */}
    <SidebarGroup>
      <SidebarGroupLabel className="text-[11px] text-muted-foreground px-2 mb-1">
        Application
      </SidebarGroupLabel>

      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <Link
                  href={item.url}
                  className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-muted transition"
                >
                  <item.icon size={16} />
                  <span className="text-sm">{item.title}</span>
                </Link>
              </SidebarMenuButton>

              {item.title === "Inbox" && (
                <SidebarMenuBadge className="bg-primary text-white text-[10px] px-1.5">
                  24
                </SidebarMenuBadge>
              )}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>

    {/* PRODUCTS */}
    <SidebarGroup className="mt-2">
      <SidebarGroupLabel className="text-[11px] text-muted-foreground px-2 mb-1">
        Products
      </SidebarGroupLabel>

      <SidebarGroupContent>
        <SidebarMenu>

          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link
                href="/products"
                className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-muted transition"
              >
                <Package size={16} />
                <span className="text-sm">All Products</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <Sheet>
              <SheetTrigger asChild>
                <SidebarMenuButton className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-muted transition">
                  <Plus size={16} />
                  <span className="text-sm">Add Product</span>
                </SidebarMenuButton>
              </SheetTrigger>
              <AddProduct />
            </Sheet>
          </SidebarMenuItem>
                 <SidebarMenuItem>
            <Sheet>
              <SheetTrigger asChild>
                <SidebarMenuButton className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-muted transition">
                  <Plus size={16} />
                  <span className="text-sm">Add Category</span>
                </SidebarMenuButton>
              </SheetTrigger>
              <AddCategory />
            </Sheet>
          </SidebarMenuItem>

        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>

    {/* USERS */}
    <SidebarGroup className="mt-2">
      <SidebarGroupLabel className="text-[11px] text-muted-foreground px-2 mb-1">
        Users
      </SidebarGroupLabel>

      <SidebarGroupContent>
        <SidebarMenu>

          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link
                href="/users"
                className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-muted transition"
              >
                <User size={16} />
                <span className="text-sm">All Users</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <Sheet>
              <SheetTrigger asChild>
                <SidebarMenuButton className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-muted transition">
                  <Plus size={16} />
                  <span className="text-sm">Add User</span>
                </SidebarMenuButton>
              </SheetTrigger>
              <AddUser />
            </Sheet>
          </SidebarMenuItem>

        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>

    {/* ORDERS */}
    <SidebarGroup className="mt-2">
      <SidebarGroupLabel className="text-[11px] text-muted-foreground px-2 mb-1">
        Orders
      </SidebarGroupLabel>

      <SidebarGroupContent>
        <SidebarMenu>

          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link
                href="/orders"
                className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-muted transition"
              >
                <ShoppingBasket size={16} />
                <span className="text-sm">Transactions</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <Sheet>
              <SheetTrigger asChild>
                <SidebarMenuButton className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-muted transition">
                  <Plus size={16} />
                  <span className="text-sm">Add Order</span>
                </SidebarMenuButton>
              </SheetTrigger>
              <AddOrder />
            </Sheet>
          </SidebarMenuItem>

        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>

  </SidebarContent>

  {/* FOOTER */}
  <SidebarFooter className="p-2 border-t">
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton className="flex items-center gap-2 w-full px-2 py-1.5 rounded-md hover:bg-muted">
          <User2 size={16} />
          <span className="text-sm">Giselle Georges</span>
          <ChevronUp className="ml-auto" size={14} />
        </SidebarMenuButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-36">
        <DropdownMenuItem>Account</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem className="text-red-500">
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </SidebarFooter>

</Sidebar>
  );
};

export default AppSidebar;
