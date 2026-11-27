"use client";

import { useState } from "react";
import type { LucideIcon } from "lucide-react";

import {
  LayoutDashboard,
  ChartNoAxesCombined,
  Users,
  Package,
  ChevronDown,
  ChevronLeft,
  FileText,
  Settings,
  Activity,
  DollarSign,
  UserRound,
  ShieldCheck,
  ClipboardList
} from "lucide-react";

type SubMenuItem = {
  name: string;
  icon: LucideIcon;
};

type MenuItem = {
  name: string;
  icon: LucideIcon;
  subItems?: SubMenuItem[];
};

type SidebarProps = {
  collapsed: boolean;
  onToggle: () => void;
  currentPage: string;
  onPageChange: (page: string) => void;
};

const menuItems: MenuItem[] = [
  {
    name: "Dashboard",
    icon: LayoutDashboard
  },
  {
    name: "Analytics",
    icon: ChartNoAxesCombined,
    subItems: [
      { name: "Price Trends", icon: Activity },
      { name: "Metal Comparison", icon: DollarSign },
      { name: "Market Overview", icon: ChartNoAxesCombined }
    ]
  },
  {
    name: "Metals",
    icon: Package,
    subItems: [
      { name: "Metal List", icon: Package },
      { name: "Price History", icon: ClipboardList },
      { name: "Price Records", icon: DollarSign }
    ]
  },
  {
    name: "Users",
    icon: Users,
    subItems: [
      { name: "User List", icon: UserRound },
      { name: "User Roles", icon: ShieldCheck }
    ]
  },
  {
    name: "Reports",
    icon: FileText
  },
  {
    name: "Settings",
    icon: Settings
  }
];

export default function Sidebar({
  collapsed,
  onToggle,
  currentPage,
  onPageChange
}: SidebarProps) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  // Handle sidebar menu selection
  function handleMenuClick(item: MenuItem) {
    if (item.subItems) {
      if (collapsed) {
        onToggle();
        setOpenMenu(item.name);
      } else {
        setOpenMenu(openMenu === item.name ? null : item.name);
      }
    } else {
      onPageChange(item.name);
    }
  }

  return (
    <aside
      className={`flex h-full shrink-0 flex-col border-r border-slate-200 bg-white transition-all duration-300 dark:border-slate-800 dark:bg-slate-900 ${
        collapsed ? "w-16" : "w-60"
      }`}
    >
      {/* Sidebar Header */}
      <div
        className={`flex items-center border-b border-slate-200 p-4 dark:border-slate-800 ${
          collapsed ? "justify-center" : "justify-between"
        }`}
      >
        {!collapsed && (
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Admin Panel
          </h2>
        )}

        <button
          type="button"
          onClick={onToggle}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
        >
          <ChevronLeft
            className={`h-5 w-5 transition-transform ${
              collapsed ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      {/* Sidebar Navigation */}
      <nav className="flex-1 space-y-2 overflow-y-auto p-3">
        {menuItems.map((item) => {
          const Icon = item.icon;

          const isActive = currentPage === item.name;

          const hasActiveSubItem = item.subItems?.some(
            (subItem) => subItem.name === currentPage
          );

          return (
            <div key={item.name}>
              {/* Main Menu */}
              <button
                type="button"
                title={collapsed ? item.name : undefined}
                aria-label={item.name}
                aria-expanded={
                  item.subItems
                    ? openMenu === item.name && !collapsed
                    : undefined
                }
                onClick={() => handleMenuClick(item)}
                className={`flex w-full items-center rounded-xl p-3 transition-colors ${
                  collapsed ? "justify-center" : "gap-3"
                } ${
                  isActive
                    ? "bg-linear-to-r from-blue-500 to-purple-500 text-white shadow-sm"
                    : hasActiveSubItem
                      ? "bg-blue-50 text-blue-700 dark:bg-slate-800 dark:text-blue-300"
                      : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                }`}
              >
                <Icon className="h-5 w-5 shrink-0" />

                {!collapsed && (
                  <>
                    <span className="flex-1 text-left text-sm font-medium">
                      {item.name}
                    </span>

                    {item.subItems && (
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${
                          openMenu === item.name ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </>
                )}
              </button>

              {/* Sub Menu */}
              {item.subItems && openMenu === item.name && !collapsed && (
                <div className="ml-5 mt-2 space-y-1 border-l border-slate-200 pl-3 dark:border-slate-700">
                  {item.subItems.map((subItem) => {
                    const SubIcon = subItem.icon;

                    const isSubActive = currentPage === subItem.name;

                    return (
                      <button
                        type="button"
                        key={subItem.name}
                        onClick={() => onPageChange(subItem.name)}
                        className={`flex w-full items-center gap-2 rounded-lg p-2 text-left text-sm transition-colors ${
                          isSubActive
                            ? "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300"
                            : "text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
                        }`}
                      >
                        <SubIcon className="h-4 w-4 shrink-0" />

                        <span>{subItem.name}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Sidebar Footer */}
      {!collapsed && (
        <div className="border-t border-slate-200 p-4 dark:border-slate-800">
          <p className="text-center text-xs text-slate-400">
            PriceMarket Admin Panel
          </p>
        </div>
      )}
    </aside>
  );
}
