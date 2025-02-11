"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Bell, Settings, User, LogOut, Globe } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button2";
import { fetchSession } from "@/utils/fetchSession";
import { useTranslation } from "react-i18next";
import i18n from "../../utils/language/i18n";

const countries = [
  { code: "af", name: "Afrikaans", flag: "https://flagcdn.com/w40/za.png" },
  { code: "sq", name: "Shqip", flag: "https://flagcdn.com/w40/al.png" },
  { code: "ar", name: "العربية", flag: "https://flagcdn.com/w40/sa.png" },
  { code: "hy", name: "Հայերեն", flag: "https://flagcdn.com/w40/am.png" },
  { code: "az", name: "Azərbaycan", flag: "https://flagcdn.com/w40/az.png" },
  { code: "bn", name: "বাংলা", flag: "https://flagcdn.com/w40/bd.png" },
  { code: "bg", name: "Български", flag: "https://flagcdn.com/w40/bg.png" },
  { code: "ca", name: "Català", flag: "https://flagcdn.com/w40/es.png" },
  { code: "zh", name: "中文", flag: "https://flagcdn.com/w40/cn.png" },
  { code: "hr", name: "Hrvatski", flag: "https://flagcdn.com/w40/hr.png" },
  { code: "cs", name: "Čeština", flag: "https://flagcdn.com/w40/cz.png" },
  { code: "da", name: "Dansk", flag: "https://flagcdn.com/w40/dk.png" },
  { code: "nl", name: "Nederlands", flag: "https://flagcdn.com/w40/nl.png" },
  { code: "en", name: "English", flag: "https://flagcdn.com/w40/us.png" },
  { code: "et", name: "Eesti", flag: "https://flagcdn.com/w40/ee.png" },
  { code: "fi", name: "Suomi", flag: "https://flagcdn.com/w40/fi.png" },
  { code: "fr", name: "Français", flag: "https://flagcdn.com/w40/fr.png" },
  { code: "ka", name: "ქართული", flag: "https://flagcdn.com/w40/ge.png" },
  { code: "de", name: "Deutsch", flag: "https://flagcdn.com/w40/de.png" },
  { code: "el", name: "Ελληνικά", flag: "https://flagcdn.com/w40/gr.png" },
  { code: "he", name: "עברית", flag: "https://flagcdn.com/w40/il.png" },
  { code: "hi", name: "हिन्दी", flag: "https://flagcdn.com/w40/in.png" },
  { code: "hu", name: "Magyar", flag: "https://flagcdn.com/w40/hu.png" },
  { code: "is", name: "Íslenska", flag: "https://flagcdn.com/w40/is.png" },
  { code: "id", name: "Bahasa Indonesia", flag: "https://flagcdn.com/w40/id.png" },
  { code: "it", name: "Italiano", flag: "https://flagcdn.com/w40/it.png" },
  { code: "ja", name: "日本語", flag: "https://flagcdn.com/w40/jp.png" },
  { code: "ko", name: "한국어", flag: "https://flagcdn.com/w40/kr.png" },
  { code: "lv", name: "Latviešu", flag: "https://flagcdn.com/w40/lv.png" },
  { code: "lt", name: "Lietuvių", flag: "https://flagcdn.com/w40/lt.png" },
  { code: "ms", name: "Bahasa Melayu", flag: "https://flagcdn.com/w40/my.png" },
  { code: "no", name: "Norsk", flag: "https://flagcdn.com/w40/no.png" },
  { code: "fa", name: "فارسی", flag: "https://flagcdn.com/w40/ir.png" },
  { code: "pl", name: "Polski", flag: "https://flagcdn.com/w40/pl.png" },
  { code: "pt", name: "Português", flag: "https://flagcdn.com/w40/pt.png" },
  { code: "ro", name: "Română", flag: "https://flagcdn.com/w40/ro.png" },
  { code: "ru", name: "Русский", flag: "https://flagcdn.com/w40/ru.png" },
  { code: "sr", name: "Српски", flag: "https://flagcdn.com/w40/rs.png" },
  { code: "sk", name: "Slovenčina", flag: "https://flagcdn.com/w40/sk.png" },
  { code: "sl", name: "Slovenščina", flag: "https://flagcdn.com/w40/si.png" },
  { code: "es", name: "Español", flag: "https://flagcdn.com/w40/es.png" },
  { code: "sv", name: "Svenska", flag: "https://flagcdn.com/w40/se.png" },
  { code: "th", name: "ไทย", flag: "https://flagcdn.com/w40/th.png" },
  { code: "tr", name: "Türkçe", flag: "https://flagcdn.com/w40/tr.png" },
  { code: "uk", name: "Українська", flag: "https://flagcdn.com/w40/ua.png" },
  { code: "vi", name: "Tiếng Việt", flag: "https://flagcdn.com/w40/vn.png" }
];


export default function Navbar({ isSidebarCollapsed }: { isSidebarCollapsed: boolean }) {
  const { t } = useTranslation();
  const [user, setUser] = useState<{ name: string; image?: string } | null>(null);
  const [notifications, setNotifications] = useState(3);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(countries[0]);
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

  const changeLanguage = (languageCode: string) => {
    const selected = countries.find((c) => c.code === languageCode) || countries[0]; // Fallback to default
    setSelectedLanguage(selected);
    i18n.changeLanguage(languageCode);
  };

  return (
    <nav
      className={`bg-gray-900 py-3 flex items-center justify-between fixed top-0 z-30 transition-all duration-300 ${
        isSidebarCollapsed ? "w-[calc(100%-5rem)] ml-[-0.5rem]" : "w-[calc(100%-17rem)]"
      }`}
    >
      {/* Welcome Message */}
      <div className="text-xl font-bold text-white">
        {t("Hi, Welcome Back")},<span className="text-blue-600"> {user?.name || t("Guest")}</span>
      </div>

      {/* Icons Section */}
      <div className="flex items-center gap-4">
        {/* Language Selector */}
        <div className="relative">
          <Button variant="ghost" className="p-0 rounded-full" onClick={() => setLanguageDropdownOpen((prev) => !prev)}>
            <Avatar className="w-8 h-8">
              <AvatarImage src={selectedLanguage.flag} alt={selectedLanguage.name} />
              <AvatarFallback>
                <Globe className="w-5 h-5" />
              </AvatarFallback>
            </Avatar>
          </Button>
          {languageDropdownOpen && (
            <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-lg max-h-60 overflow-y-auto">
              {countries.map((country) => (
                <div
                  key={country.code}
                  className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => changeLanguage(country.code)}
                >
                  <img src={country.flag} alt={country.name} className="w-5 h-5 rounded-full" />
                  {country.name}
                </div>
              ))}
            </div>
          )}
        </div>

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
              <AvatarFallback>{user?.name ? user.name[0] : "U"}</AvatarFallback>
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
                  {t("Settings")}
                </div>
                <div
                  className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => router.push("/profile/profile")}
                >
                  <User className="w-4 h-4" />
                  {t("Profile")}
                </div>
                <div
                  className="flex items-center gap-2 px-4 py-2 text-red-600 cursor-pointer hover:bg-gray-100"
                  onClick={() => {
                    localStorage.removeItem("token");
                    router.push("/login");
                  }}
                >
                  <LogOut className="w-4 h-4" />
                  {t("Log Out")}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
