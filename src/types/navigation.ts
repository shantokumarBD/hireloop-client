import { LucideIcon } from "lucide-react";

export interface NavItem {
  name: string;
  href: string;
}

export interface DashboardMenuItem {
  name: string;
  url: string;
  icon: LucideIcon;
}
