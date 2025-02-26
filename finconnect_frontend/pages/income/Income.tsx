import { useState } from "react";
import Sidebar from "@/components/bar/sidebar";
import Navbar from "@/components/bar/header";
import { Card, CardContent } from "@/components/ui/card";
import Button from "@/components/ui/Button";
import { Table, TableHead, TableRow, TableCell, TableBody } from "@/components/ui/table";
import { TrendingUp } from "lucide-react";

const IncomePage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const toggleSidebar = () => setCollapsed(!collapsed);

  const handleAddIncomeClick = () => {
    window.location.href = "/transaction/Transactions";
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar collapsed={collapsed} onToggle={toggleSidebar} />

      <div className={`p-6 bg-gray-100 min-h-screen transition-all duration-300 flex-1 flex flex-col ${collapsed ? "ml-10" : "ml-52"}`}>
        {/* Navbar */}
        <Navbar isSidebarCollapsed={collapsed} />

        <main className="p-6 space-y-6" style={{ marginTop: "40px" }}>
          {/* Overview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {["Overall", "This Month", "This Week", "Today"].map((label, index) => (
              <Card key={index} className="relative flex items-center p-2 overflow-hidden rounded-none h-24">
                {/* Icon Section (Left Side, Full Height) */}
                <div className="absolute left-0 top-0 h-full w-1/3 bg-cyan-400 flex items-center justify-center">
                  <TrendingUp size={32} color="white" />
                </div>

                {/* Text Content (Right Side) */}
                <CardContent className="flex flex-col pl-24">
                  <p className="text-xl text-black font-bold">Ksh 0.00</p>
                  <p className="text-sm text-gray-500">{label}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Income List Table */}
          <div className="bg-white shadow-md p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-blue-600">Income List</h2>
              <Button className="bg-blue-500 text-white" onClick={handleAddIncomeClick}>
                + Add New Income
              </Button>
            </div>

            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Account</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-black">
                    No data available in table
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default IncomePage;
