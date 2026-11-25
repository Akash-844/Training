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
    icon: Package,
    label: ""
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

const Sidebar = () => {
  const [openMenu, setOpenMenu] = useState(null);
  return (
    <div className="transition duration-300 ease-in-out bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-r border-slate-200/50 dark:border-slate-700/50 flex flex-col relative z-10">
      <div className="p-6 border-b border-slate-200/50 dark:border-slate-700/50">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-linear-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-800 dark:text-white">
              Nexus
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Admin panel
            </p>
          </div>
        </div>
      </div>
      {/* Navigation */}

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto scrollbar-hide">
        {menuItems.map((item, index) => {
          const Icon = item.icon;

          return (
            <div key={index}>
              <button
                onClick={() =>
                  setOpenMenu(openMenu === item.name ? null : item.name)
                }
                className="w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <Icon className="w-5 h-5" />

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
              </button>

              {item.subItems && openMenu === item.name && (
                <div className="ml-8 mt-1 space-y-1">
                  {item.subItems.map((subItem, subIndex) => {
                    const SubIcon = subItem.icon;

                    return (
                      <button
                        key={subIndex}
                        className="w-full flex items-center space-x-3 p-2 rounded-lg text-sm text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200"
                      >
                        <SubIcon className="w-4 h-4" />
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

      {/* User profile */}
      <div className="p-4 border-r border-slate-200/50 dark:border-slate-700/50">
        <div className="flex items-center space-x-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
          <img
            src={Img}
            alt="user"
            className="w-10 h-10 rounded-full ring-2 ring-blue-500"
          />
          <div className="flex-1 min-w-0">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-800 dark:text-white truncate">
                Sai Akash
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                Administrator
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
