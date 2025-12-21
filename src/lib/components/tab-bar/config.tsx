import { cn } from "@/lib/utils";
import { Home, Wallet } from "lucide-react";
import { BsFillGrid1X2Fill, BsPersonFillGear } from "react-icons/bs";
import { CiGrid41 } from "react-icons/ci";
import { IoGridOutline } from "react-icons/io5";
import { RiDashboard2Fill } from "react-icons/ri";
import { TbLayoutGrid } from "react-icons/tb";

interface TabBarConfig {
  href: string;
  title: string;
  icon: (isActive: boolean) => React.ReactNode;
}
export const configTabBar: TabBarConfig[] = [
  {
    href: "/dashboard",
    title: "Dashboard",
    icon: (isActive) => (
      <TbLayoutGrid
        className={cn("size-6", isActive ? "text-white" : "text-gray-400")}
      />
    ),
  },
  {
    href: "/wallet",
    title: "Wallet",
    icon: (isActive) => (
      <Wallet
        className={cn("size-5", isActive ? "text-white" : "text-gray-400")}
      />
    ),
  },
  {
    href: "/profile",
    title: "Profile",
    icon: (isActive) => (
      <BsPersonFillGear
        className={cn("size-5", isActive ? "text-white" : "text-gray-400")}
      />
    ),
  },
];
