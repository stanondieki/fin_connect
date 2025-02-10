import { useState } from "react";
import { format } from "date-fns";
import { PlusCircle, Search, Trash2 } from "lucide-react";
import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/bar/header";
import Sidebar from "@/components/bar/sidebar";

interface Investment {
  id: number;
  name: string;
  amount: number;
  interest: number;
  date: string;
  maturityDate: string;
}

const InvestmentPage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newInvestment, setNewInvestment] = useState({
    name: "",
    amount: "",
    interest: "",
    date: "",
    maturityDate: "",
  });
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const toggleSidebar = () => setCollapsed(!collapsed);

  const filteredInvestments = investments.filter((inv) =>
    inv.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredInvestments.length / entriesPerPage);
  const paginatedInvestments = filteredInvestments.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  const handleAddInvestment = async () => {
    if (!newInvestment.name || !newInvestment.amount || !newInvestment.interest || !newInvestment.date || !newInvestment.maturityDate) return;
  
    try {
      const formattedDate = format(new Date(newInvestment.date), "yyyy-MM-dd");
      const formattedMaturityDate = format(new Date(newInvestment.maturityDate), "yyyy-MM-dd");
  
      const response = await fetch("http://127.0.0.1:8000/api/investments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newInvestment.name,
          amount: parseFloat(newInvestment.amount),
          interest: parseFloat(newInvestment.interest),
          date: formattedDate,
          maturity_date: formattedMaturityDate,
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        setInvestments([...investments, data.investment]);
        setShowModal(false);
        setNewInvestment({ name: "", amount: "", interest: "", date: "", maturityDate: "" });
      } else {
        console.error("Failed to save investment");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  
  

  return (
    <div className="flex">
      <Sidebar collapsed={collapsed} onToggle={toggleSidebar} />
      <div className={`p-6 bg-gray-100 min-h-screen flex-1 transition-all duration-300 ${collapsed ? "ml-10" : "ml-52"}`}>
        <Navbar isSidebarCollapsed={collapsed} />
        <div className="p-6 bg-white shadow-md" style={{ marginTop: "40px" }}>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Investments</h2>
            <Button onClick={() => setShowModal(true)} className="bg-blue-500 text-white flex items-center gap-2">
              <PlusCircle size={20} /> Add Investment
            </Button>
          </div>
          <Input placeholder="Search:" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="border px-4 py-2 mb-4 w-auto" />
          <table className="w-full border-collapse border bg-white shadow-md">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-3">Name</th>
                <th className="border p-3">Amount (KSH)</th>
                <th className="border p-3">Interest (%)</th>
                <th className="border p-3">Investment Date</th>
                <th className="border p-3">Maturity Date</th>
                <th className="border p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedInvestments.map((investment) => (
                <tr key={investment.id} className="text-center border">
                  <td className="p-3 border">{investment.name}</td>
                  <td className="p-3 border">KSH {investment.amount.toFixed(2)}</td>
                  <td className="p-3 border">{investment.interest.toFixed(2)}%</td>
                  <td className="p-3 border">
                    {investment.date ? format(new Date(investment.date), "dd MMM yyyy") : "N/A"}
                    </td>
                    <td className="p-3 border">
                    {investment.maturityDate ? format(new Date(investment.maturityDate), "dd MMM yyyy") : "N/A"}
                    </td>

                  <td className="p-3 border">
                  <Button
                    onClick={async () => {
                        try {
                        const response = await fetch(`http://127.0.0.1:8000/api/investments/${investment.id}`, {
                            method: "DELETE",
                        });

                        if (response.ok) {
                            setInvestments(investments.filter((inv) => inv.id !== investment.id));
                        } else {
                            console.error("Failed to delete investment");
                        }
                        } catch (error) {
                        console.error("Error:", error);
                        }
                    }}
                    className="text-red-500 flex items-center gap-1"
                    >
                    <Trash2 size={16} /> Delete
                    </Button>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {showModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-lg font-semibold mb-4 text-center">Add Investment</h2>
                
                <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Investment Name</label>
                    <Input
                    placeholder="Enter investment name"
                    value={newInvestment.name}
                    onChange={(e) => setNewInvestment({ ...newInvestment, name: e.target.value })}
                    className="border px-4 py-2 w-full"
                    />
                </div>

                <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Amount (KSH)</label>
                    <Input
                    placeholder="Enter amount"
                    type="number"
                    value={newInvestment.amount}
                    onChange={(e) => setNewInvestment({ ...newInvestment, amount: e.target.value })}
                    className="border px-4 py-2 w-full"
                    />
                </div>

                <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Interest (%)</label>
                    <Input
                    placeholder="Enter interest rate"
                    type="number"
                    value={newInvestment.interest}
                    onChange={(e) => setNewInvestment({ ...newInvestment, interest: e.target.value })}
                    className="border px-4 py-2 w-full"
                    />
                </div>

                <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Investment Date</label>
                    <Input
                    type="date"
                    value={newInvestment.date}
                    onChange={(e) => setNewInvestment({ ...newInvestment, date: e.target.value })}
                    className="border px-4 py-2 w-full"
                    />
                </div>

                <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Maturity Date</label>
                    <Input
                    type="date"
                    value={newInvestment.maturityDate}
                    onChange={(e) => setNewInvestment({ ...newInvestment, maturityDate: e.target.value })}
                    className="border px-4 py-2 w-full"
                    />
                </div>

                <div className="flex justify-end gap-3 mt-4">
                    <Button onClick={() => setShowModal(false)} className="bg-gray-500 text-white px-4 py-2 rounded">
                    Cancel
                    </Button>
                    <Button onClick={handleAddInvestment} className="bg-green-500 text-white px-4 py-2 rounded">
                    Save Investment
                    </Button>
                </div>
                </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InvestmentPage;