import { useState } from "react";
import { Home, BarChart, Wallet, Settings, LogOut } from "lucide-react";
import Link from "next/link";

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, onToggle }) => {
  return (
    <div className={`fixed top-0 left-0 h-full bg-gray-900 text-white ${collapsed ? "w-20" : "w-64"} transition-all duration-300 p-4 flex flex-col overflow-hidden`}>
      <button 
        className="mb-6 text-xl font-bold flex items-center justify-center"
        onClick={onToggle} // Call parent function
      >
        {collapsed ? "→" : "AI Advisor"}
      </button>
      <nav className="flex-1">
        <ul className="space-y-4">
          <SidebarItem href="/dashboard" icon={<Home />} label="Dashboard" collapsed={collapsed} />
          <SidebarItem href="/investments" icon={<BarChart />} label="Investments" collapsed={collapsed} />
          <SidebarItem href="/wallet" icon={<Wallet />} label="Wallet" collapsed={collapsed} />
          <SidebarItem href="/settings" icon={<Settings />} label="Settings" collapsed={collapsed} />
        </ul>
      </nav>
      <SidebarItem href="/logout" icon={<LogOut />} label="Logout" collapsed={collapsed} className="mt-auto text-red-400" />
    </div>
  );
};

interface SidebarItemProps {
  href: string;
  icon: JSX.Element;
  label: string;
  collapsed: boolean;
  className?: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ href, icon, label, collapsed, className = "" }) => {
  return (
    <li>
      <Link href={href} className={`flex items-center p-3 rounded-lg hover:bg-gray-700 transition ${className}`}>
        {icon}
        {!collapsed && <span className="ml-4">{label}</span>}
      </Link>
    </li>
  );
};

export default Sidebar;
