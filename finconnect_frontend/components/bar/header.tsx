"use client";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Bell, Settings, User, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button2";

export default function Navbar({ isSidebarCollapsed }: { isSidebarCollapsed: boolean }) {
  const { data: session } = useSession();
  const [notifications, setNotifications] = useState(3);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();

  return (
    <nav
      className={`bg-gray-900 py-3 flex items-center justify-between 
       fixed top-0 z-30 transition-all duration-300 
      ${isSidebarCollapsed ? "w-[calc(100%-5rem)] ml-[-0.5rem]" : "w-[calc(100%-17rem)]"}`}
    >
      {/* Welcome Message */}
      <div className="text-xl font-bold text-white">
        Hi, Welcome Back, {session?.user?.name || "Guest"}
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
              <AvatarImage src={session?.user?.image || "/profile.jpg"} alt="User" />
              <AvatarFallback>
                {session?.user?.name ? session.user.name[0] : "U"}
              </AvatarFallback>
            </Avatar>
          </Button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg">
              <div className="py-1">
                <div
                  className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => router.push("/settings")}
                >
                  <Settings className="w-4 h-4" />
                  Settings
                </div>
                <div
                  className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => router.push("/profile")}
                >
                  <User className="w-4 h-4" />
                  Profile
                </div>
                <div
                  className="flex items-center gap-2 px-4 py-2 text-red-600 cursor-pointer hover:bg-gray-100"
                  onClick={() => signOut()}
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
