"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Bell, Settings, User, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button2";
import { fetchSession } from "@/utils/fetchSession";

export default function Navbar({ isSidebarCollapsed }: { isSidebarCollapsed: boolean }) {
  const [user, setUser] = useState<{ name: string; image?: string } | null>(null);
  const [notifications, setNotifications] = useState(3);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const getSession = async () => {
      const sessionUser = await fetchSession();
      if (sessionUser) {
        setUser(sessionUser);
      }
    };

    getSession();
  }, []);

  return (
    <nav
      className={`bg-gray-900 py-3 flex items-center justify-between 
       fixed top-0 z-30 transition-all duration-300 
      ${isSidebarCollapsed ? "w-[calc(100%-5rem)] ml-[-0.5rem]" : "w-[calc(100%-17rem)]"}`}
    >
      {/* Welcome Message */}
      <div className="text-xl font-bold text-white">
        Hi, Welcome Back,<span className="text-blue-600"> {user?.name || "Guest"}</span>
      </div>

      {/* Icons Section */}
      <div className="flex items-center gap-4">
        {/* Notification Icon */}
        <div className="relative">
          <Bell className="w-6 h-6 text-gray-400 cursor-pointer" />
          {notifications > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-semibold w-5 h-5 flex items-center justify-center rounded-full">
              {notifications}
            </span>
          )}
        </div>

        {/* Profile Dropdown */}
        <div className="relative">
          <Button
            variant="ghost"
            className="p-0 rounded-full"
            onClick={() => setDropdownOpen((prev) => !prev)}
          >
            <Avatar>
              <AvatarImage src={user?.image || "/pro.jpg"} alt="User" />
              <AvatarFallback>
                {user?.name ? user.name[0] : "U"}
              </AvatarFallback>
            </Avatar>
          </Button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg">
              <div className="py-1">
                <div
                  className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => router.push("/settings/settings")}
                >
                  <Settings className="w-4 h-4" />
                  Settings
                </div>
                <div
                  className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => router.push("/profile/profile")}
                >
                  <User className="w-4 h-4" />
                  Profile
                </div>
                <div
                  className="flex items-center gap-2 px-4 py-2 text-red-600 cursor-pointer hover:bg-gray-100"
                  onClick={() => {
                    localStorage.removeItem("token"); 
                    router.push("/login");
                  }}
                >
                  <LogOut className="w-4 h-4" />
                  Log Out
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
