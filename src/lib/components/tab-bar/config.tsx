import { Home, Wallet } from "lucide-react";
import { BsPersonFillGear } from "react-icons/bs";

interface TabBarConfig {
  href: string;
  title: string;
  icon: React.ReactNode;
}
export const configTabBar: TabBarConfig[] = [
  { href: "/dashboard", title: "Dashboard", icon: <Home /> },
  { href: "/wallet", title: "Wallet", icon: <Wallet /> },
  { href: "/profile", title: "Profile", icon: <BsPersonFillGear /> },
];
