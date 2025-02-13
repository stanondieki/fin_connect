import { useState } from "react";
import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import Sidebar from "@/components/bar/sidebar";
import Navbar from "@/components/bar/header";
import { Pencil, Trash2, Eye, X } from "lucide-react";

const DebtTracking = () => {
  const [search, setSearch] = useState("");
  const [collapsed, setCollapsed] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newDebt, setNewDebt] = useState({ name: "", amount: "", interest: "", investmentDate: "", maturityDate: "" });
  
  const toggleSidebar = () => setCollapsed(!collapsed);

  const [debts, setDebts] = useState([
    { id: 1, name: "Car Loan", amount: "15000", interest: "5", investmentDate: "2024-01-15", maturityDate: "2025-06-10" },
    { id: 2, name: "Credit Card", amount: "3500", interest: "3", investmentDate: "2024-02-20", maturityDate: "2025-04-20" },
  ]);

  const handleDelete = (id) => {
    setDebts(debts.filter(debt => debt.id !== id));
  };

  const handleAddDebt = () => {
    if (newDebt.name && newDebt.amount && newDebt.interest && newDebt.investmentDate && newDebt.maturityDate) {
      setDebts([...debts, { id: debts.length + 1, ...newDebt }]);
      setNewDebt({ name: "", amount: "", interest: "", investmentDate: "", maturityDate: "" });
      setIsFormOpen(false);
    }
  };

  const filteredDebts = debts.filter(debt =>
    debt.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex">
      <Sidebar collapsed={collapsed} onToggle={toggleSidebar} />
      <div className={`p-6 bg-gray-100 min-h-screen transition-all duration-300 flex-1 flex flex-col ${collapsed ? "ml-10" : "ml-52"}`}>
        <Navbar isSidebarCollapsed={collapsed} />
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4 text-blue-600">Debt Tracker</h1>
          <div className="mb-4">
            <Button className="bg-blue-500 text-white" onClick={() => setIsFormOpen(true)}>Add Debt</Button>
          </div>
          <div className="mb-4">
            <Input 
              placeholder="Search for a debt..." 
              value={search} 
              onChange={(e) => setSearch(e.target.value)}
              className="w-2/3 text-black"
            />
          </div>
          {isFormOpen && (
            <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Debt Name</label>
              <Input placeholder="Enter Debt Name" value={newDebt.name} onChange={(e) => setNewDebt({ ...newDebt, name: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Amount (KSH)</label>
              <Input placeholder="Enter Amount" type="number" value={newDebt.amount} onChange={(e) => setNewDebt({ ...newDebt, amount: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Interest (%)</label>
              <Input placeholder="Enter Interest Rate" type="number" value={newDebt.interest} onChange={(e) => setNewDebt({ ...newDebt, interest: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Investment Date</label>
              <Input placeholder="Select Investment Date" type="date" value={newDebt.investmentDate} onChange={(e) => setNewDebt({ ...newDebt, investmentDate: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Maturity Date</label>
              <Input placeholder="Select Maturity Date" type="date" value={newDebt.maturityDate} onChange={(e) => setNewDebt({ ...newDebt, maturityDate: e.target.value })} />
            </div>
          </div>
          
          )}
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200 text-black">
                  <th className="border p-3">Name</th>
                  <th className="border p-3">Amount (KSH)</th>
                  <th className="border p-3">Interest (%)</th>
                  <th className="border p-3">Investment Date</th>
                  <th className="border p-3">Maturity Date</th>
                  <th className="border p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredDebts.map((debt) => (
                  <tr key={debt.id} className="border-b hover:bg-gray-100">
                    <td className="border p-3">{debt.name}</td>
                    <td className="border p-3">{debt.amount}</td>
                    <td className="border p-3">{debt.interest}</td>
                    <td className="border p-3">{debt.investmentDate}</td>
                    <td className="border p-3">{debt.maturityDate}</td>
                    <td className="border p-3 text-right space-x-2">
                      <Button variant="ghost" size="icon"><Eye className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="icon"><Pencil className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(debt.id)}><Trash2 className="w-4 h-4 text-red-500" /></Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DebtTracking;
