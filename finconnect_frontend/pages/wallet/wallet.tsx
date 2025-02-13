import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Progress from "@/components/ui/progress";
import Sidebar from "@/components/bar/sidebar";
import Navbar from "@/components/bar/header";
import { useState } from "react";
import { Banknote, Wallet, TrendingUp, TrendingDown } from "lucide-react";

const WalletPage = () => {
  const [income] = useState(50000);
  const [expense] = useState(20000);
  const [bankBalance] = useState(150000);
  const [mpesaBalance] = useState(30000);
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => setCollapsed((prev) => !prev);

  const incomeCategories = [
    { category: "Salary", amount: 40000 },
    { category: "Freelance", amount: 7000 },
    { category: "Investments", amount: 3000 },
  ];

  const expenseCategories = [
    { category: "Rent", amount: 10000 },
    { category: "Groceries", amount: 5000 },
    { category: "Transport", amount: 3000 },
    { category: "Entertainment", amount: 2000 },
  ];

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Added `key` to force re-render when collapsed changes */}
      <Sidebar collapsed={collapsed} onToggle={toggleSidebar} />
      <div className={`p-6 bg-gray-100 min-h-screen transition-all duration-300 flex-1 flex flex-col ${collapsed ? "ml-10" : "ml-52"}`}>
        <Navbar isSidebarCollapsed={collapsed} />
        <div className="p-6 space-y-6" style={{ marginTop: '40px' }}>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-600">
                  <TrendingUp /> Income
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-gray-800">Ksh {income.toLocaleString()}</p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-600">
                  <TrendingDown /> Expense
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-gray-800">Ksh {expense.toLocaleString()}</p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-600">
                  <Banknote /> Bank Balance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-gray-800">Ksh {bankBalance.toLocaleString()}</p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-yellow-600">
                  <Wallet /> MPesa Balance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-gray-800">Ksh {mpesaBalance.toLocaleString()}</p>
              </CardContent>
            </Card>
          </div>

          {/* Income & Expense Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-green-600">Income by Category</CardTitle>
              </CardHeader>
              <CardContent>
                {incomeCategories.map((item, index) => (
                  <div key={index} className="mb-2">
                    <p className="text-gray-700">{item.category}: Ksh {item.amount.toLocaleString()}</p>
                    <Progress value={(item.amount / income) * 100} className="h-2 bg-green-500" />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-red-600">Expense by Category</CardTitle>
              </CardHeader>
              <CardContent>
                {expenseCategories.map((item, index) => (
                  <div key={index} className="mb-2">
                    <p className="text-gray-700">{item.category}: Ksh {item.amount.toLocaleString()}</p>
                    <Progress value={(item.amount / expense) * 100} className="h-2 bg-red-500" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletPage;
