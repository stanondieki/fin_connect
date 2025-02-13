import { useState } from "react";
import {
  Home,
  BarChart,
  Wallet,
  Activity,
  Database,
  CreditCard,
  TrendingUp,
  TrendingDown,
  Folder,
  Calendar,
  FileText,
  Settings,
  LogOut,
  User,
  Layers,
  ChevronDown,
  ChevronRight,
  Clock,
  AlarmCheck
} from "lucide-react";
import Link from "next/link";

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, onToggle }) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (menu: string) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  return (
    <div className={`fixed top-0 left-0 h-full bg-gray-900 text-white ${collapsed ? "w-20" : "w-64"} transition-all duration-300 p-4 flex flex-col overflow-hidden`}>
      <button className="mb-4 text-xl font-bold flex items-center justify-center" onClick={onToggle}>
        {collapsed ? "→" : "AI Advisor"}
      </button>
      <nav className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
        <ul className="space-y-2">
          <SidebarItem href="/dash/dashboard" icon={<Home />} label="Dashboard" collapsed={collapsed} />
          <SidebarItem href="/invest/investment" icon={<BarChart />} label="Investments" collapsed={collapsed} />
          <SidebarItem href="/wallet/wallet" icon={<Wallet />} label="Wallet" collapsed={collapsed} />
          <SidebarItem href="/insights/AiInsights" icon={<Activity />} label="AI Insights" collapsed={collapsed} />
          <SidebarItem href="/goals/FinancialGoals" icon={<Database />} label="Financial Goals" collapsed={collapsed} />
          <SidebarItem href="/transaction/Transactions" icon={<CreditCard />} label="Transactions" collapsed={collapsed} />
          <SidebarItem href="/income/Income" icon={<TrendingUp />} label="Income" collapsed={collapsed} />
          <SidebarItem href="/upcoming/UpcomingIncome" icon={<Clock />} label="Upcoming Income" collapsed={collapsed}  />
          <SidebarItem href="/expense/expense" icon={<TrendingDown />} label="Expense" collapsed={collapsed} />
          <SidebarItem href="/upcoming/UpcomingExpenses" icon={<AlarmCheck />} label="Upcoming Expense" collapsed={collapsed}  />
          
          <SidebarItem href="/Account/Account" icon={<User />} label="Accounts" collapsed={collapsed} />
          
          <SidebarItem href="/budget/TrackBudget" icon={<Layers />} label="Track Budget" collapsed={collapsed} />
          <SidebarItem href="/debt/debt/" icon={<Layers />} label="Track Debt" collapsed={collapsed} />

          <SidebarItem href="/calendar/calendar" icon={<Calendar />} label="Calendar" collapsed={collapsed} />
          <SidebarItem href="/report/reports" icon={<FileText />} label="Reports" collapsed={collapsed} />
          
          <DropdownItem label="Category" icon={<Folder />} collapsed={collapsed} open={openDropdown === "category"} onClick={() => toggleDropdown("category")}>            
            <SidebarItem href="/category/income" icon={<ChevronRight />} label="Income Category" collapsed={collapsed} nested />
            <SidebarItem href="/category/expense" icon={<ChevronRight />} label="Expense Category" collapsed={collapsed} nested />
          </DropdownItem>
          
          <DropdownItem label="Settings" icon={<Settings />} collapsed={collapsed} open={openDropdown === "settings"} onClick={() => toggleDropdown("settings")}>            
            <SidebarItem href="/settings/profile" icon={<ChevronRight />} label="Profile Settings" collapsed={collapsed} nested />
            <SidebarItem href="/settings/user" icon={<ChevronRight />} label="User Settings" collapsed={collapsed} nested />
            <SidebarItem href="/settings/application" icon={<ChevronRight />} label="Application Settings" collapsed={collapsed} nested />
          </DropdownItem>
        </ul>
      </nav>
      <SidebarItem href="/Auth/signin" icon={<LogOut />} label="Logout" collapsed={collapsed} className="text-red-400" />
    </div>
  );
};

interface SidebarItemProps {
  href: string;
  icon: JSX.Element;
  label: string;
  collapsed: boolean;
  className?: string;
  nested?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ href, icon, label, collapsed, className = "", nested = false }) => {
  return (
    <li className={nested ? "ml-4" : ""}>
      <Link href={href} className={`flex items-center p-2 rounded-lg hover:bg-gray-700 transition ${className}`}>
        {icon}
        {!collapsed && <span className="ml-3">{label}</span>}
      </Link>
    </li>
  );
};

interface DropdownItemProps {
  label: string;
  icon: JSX.Element;
  collapsed: boolean;
  open: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const DropdownItem: React.FC<DropdownItemProps> = ({ label, icon, collapsed, open, onClick, children }) => {
  return (
    <>
      <li onClick={onClick} className="cursor-pointer">
        <div className="flex items-center p-2 rounded-lg hover:bg-gray-700 transition">
          {icon}
          {!collapsed && <span className="ml-3">{label}</span>}
          {!collapsed && (open ? <ChevronDown className="ml-auto" /> : <ChevronRight className="ml-auto" />)}
        </div>
      </li>
      {open && !collapsed && <ul className="pl-4 space-y-1">{children}</ul>}
    </>
  );
};

export default Sidebar;
