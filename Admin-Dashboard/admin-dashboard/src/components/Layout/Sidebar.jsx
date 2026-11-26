import {
  Zap,
  LayoutDashboard,
  ChartNoAxesCombined,
  Users,
  ShoppingCart,
  Package,
  ArrowLeftRight,
  MessageSquare,
  Calendar,
  ChevronDown,
  ChevronLeft,
  FileText,
  Settings,
  Activity,
  DollarSign,
  UserRound,
  ShieldCheck,
  Tag,
  ClipboardList
} from "lucide-react";

import Img from "../../assets/img.jpg";
import { useState } from "react";

const menuItems = [
  {
    name: "Dashboard",
    icon: LayoutDashboard
  },
  {
    name: "Analytics",
    icon: ChartNoAxesCombined,
    subItems: [
      { name: "Traffic", icon: Activity },
      { name: "Sales", icon: DollarSign },
      { name: "User Behavior", icon: Users }
    ]
  },
  {
    name: "Users",
    icon: Users,
    subItems: [
      { name: "User List", icon: UserRound },
      { name: "User Roles", icon: ShieldCheck },
      { name: "User Permissions", icon: ShieldCheck }
    ]
  },
  {
    name: "E-commerce",
    icon: ShoppingCart,
    subItems: [
      { name: "Products", icon: Package },
      { name: "Orders", icon: ClipboardList },
      { name: "Discounts", icon: Tag }
    ]
  },
  {
    name: "Inventory",
    icon: Package
  },
  {
    name: "Transactions",
    icon: ArrowLeftRight
  },
  {
    name: "Messages",
    icon: MessageSquare
  },
  {
    name: "Calendar",
    icon: Calendar
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

const Sidebar = ({ collapsed, onToggle, currentPage, onPageChange }) => {
  const [openMenu, setOpenMenu] = useState(null);

  return (
    <div
      className={`${collapsed ? "w-20" : "w-65"} shrink-0 transition-[width] duration-300 ease-in-out bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-r border-slate-200/50 dark:border-slate-700/50 flex flex-col relative z-10`}
    >
      {/* Sidebar Header */}
      <div
        className={`${collapsed ? "p-4" : "p-6"} border-b border-slate-200/50 dark:border-slate-700/50`}
      >
        <div
          className={`flex ${
            collapsed
              ? "flex-col items-center gap-3"
              : "items-center justify-between"
          }`}
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 shrink-0 bg-linear-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Zap className="w-6 h-6 text-white" />
            </div>

            {!collapsed && (
              <div>
                <h1 className="text-xl font-bold text-slate-800 dark:text-white">
                  Nexus
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Admin panel
                </p>
              </div>
            )}
          </div>

          {/* Collapse / Expand Button */}
          <button
            type="button"
            onClick={onToggle}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <ChevronLeft
              className={`w-5 h-5 transition-transform duration-300 ${
                collapsed ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto scrollbar-hide">
        {menuItems.map((item) => {
          const Icon = item.icon;

          const isActive = currentPage === item.name;

          const hasActiveSubItem = item.subItems?.some(
            (subItem) => subItem.name === currentPage
          );

          return (
            <div key={item.name}>
              {/* Parent Menu */}
              <button
                type="button"
                title={collapsed ? item.name : ""}
                onClick={() => {
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
                }}
                className={`w-full flex items-center ${
                  collapsed ? "justify-center" : "space-x-3"
                } p-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-linear-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                    : hasActiveSubItem
                      ? "bg-blue-50 text-blue-700 dark:bg-slate-800 dark:text-blue-300"
                      : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                <Icon className="w-5 h-5 shrink-0" />

                {!collapsed && (
                  <>
                    <span className="font-medium flex-1 text-left">
                      {item.name}
                    </span>

                    {item.subItems && (
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          openMenu === item.name ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </>
                )}
              </button>

              {/* Submenu */}
              {item.subItems && openMenu === item.name && !collapsed && (
                <div className="ml-8 mt-1 space-y-1">
                  {item.subItems.map((subItem) => {
                    const SubIcon = subItem.icon;
                    const isSubActive = currentPage === subItem.name;

                    return (
                      <button
                        type="button"
                        key={subItem.name}
                        onClick={() => onPageChange(subItem.name)}
                        className={`w-full flex items-center space-x-3 p-2 rounded-lg text-sm transition-all duration-200 ${
                          isSubActive
                            ? "bg-linear-to-r from-blue-500 to-purple-500 text-white shadow-md"
                            : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                        }`}
                      >
                        <SubIcon className="w-4 h-4 shrink-0" />
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

      {/* User Profile */}
      <div className="p-4 border-t border-slate-200/50 dark:border-slate-700/50">
        <div
          className={`flex items-center ${
            collapsed ? "justify-center" : "space-x-3"
          } p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50`}
        >
          <img
            src={Img}
            alt="user"
            className="w-10 h-10 shrink-0 rounded-full ring-2 ring-blue-500"
          />

          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-800 dark:text-white truncate">
                Sai Akash
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                Administrator
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
