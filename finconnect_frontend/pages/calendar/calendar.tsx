import { useState } from "react";
import { startOfMonth, endOfMonth, eachDayOfInterval, format, isToday, getDay } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUp, ArrowDown, CreditCard } from "lucide-react";
import Button from "@/components/ui/Button";
import Navbar from "@/components/bar/header";
import Sidebar from "@/components/bar/sidebar";

const CalendarPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [collapsed, setCollapsed] = useState(false);
  const toggleSidebar = () => setCollapsed(!collapsed);

  const startDay = startOfMonth(currentDate);
  const days = eachDayOfInterval({ start: startDay, end: endOfMonth(currentDate) });
  const firstDayOfWeek = getDay(startDay); // Get the weekday index of the first day

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar collapsed={collapsed} onToggle={toggleSidebar} />

      {/* Main Content */}
      <div className={`p-6 bg-gray-100 min-h-screen transition-all duration-300 flex-1 flex flex-col ${collapsed ? "ml-10" : "ml-52"}`}>
        {/* Navbar */}
        <Navbar isSidebarCollapsed={collapsed} />

        {/* Page Content */}
        <div className="p-6 bg-gray-100 min-h-screen" style={{ marginTop: "40px" }}>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {[
              { label: "This Month (February)", value: "KSH0.00", icon: <ArrowUp size={40} />, bgColor: "bg-cyan-400" },
              { label: "This Month (February)", value: "KSH0.00", icon: <ArrowDown size={40} />, bgColor: "bg-red-400" },
              { label: "Balance This Month (February)", value: "KSH0.00", icon: <CreditCard size={40} />, bgColor: "bg-green-500" },
            ].map((item, index) => (
              <Card key={index} className="relative flex items-center p-4 bg-white shadow-md overflow-hidden">
                {/* Left-side Icon Section */}
                <div className={`${item.bgColor} absolute left-0 top-0 bottom-0 w-1/3 flex items-center justify-center text-white`}>
                  {item.icon}
                </div>
                {/* Right-side Content Section */}
                <CardContent className="ml-auto w-2/3 pl-4">
                  <p className="text-xl font-bold">{item.value}</p>
                  <p className="text-sm text-gray-500">{item.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Calendar Section */}
          <div className="bg-white p-4 shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Income / Expense</h2>
              <div className="flex items-center space-x-2">
                <Button onClick={previousMonth} className="bg-blue-500 text-white">{"<"}</Button>
                <span className="text-lg font-semibold">{format(currentDate, "MMMM yyyy")}</span>
                <Button onClick={nextMonth} className="bg-blue-600 text-white">{">"}</Button>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2 border-t pt-4">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="text-center font-semibold">{day}</div>
              ))}

              {/* Empty placeholders for alignment */}
              {Array(firstDayOfWeek).fill(null).map((_, index) => (
                <div key={`empty-${index}`} className="p-2 text-center"></div>
              ))}

              {days.map((day) => (
                <div
                  key={day.toString()}
                  className={`p-2 text-center border ${
                    isToday(day) ? "bg-blue-600 text-white font-bold" : "bg-white"
                  }`}
                >
                  {format(day, "d")}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
