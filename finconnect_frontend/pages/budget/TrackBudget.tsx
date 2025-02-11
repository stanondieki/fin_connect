import React, { useState } from "react";
import Sidebar from "@/components/bar/sidebar";
import Navbar from "@/components/bar/header";

const FinancialGoals = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [budgetData, setBudgetData] = useState({
    month: "",
    year: "",
    category: "",
    subcategory: "",
    amount: "",
  });

  const months = [
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
  ];
  
  const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i);
  const categories = ["Income", "Expense"];
  const subcategories = { Income: ["Salary", "Bonus"], Expense: ["Rent", "Groceries", "Entertainment"] };

  const toggleSidebar = () => setCollapsed(!collapsed);
  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const handleChange = (e) => {
    setBudgetData({ ...budgetData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!budgetData.month || !budgetData.year || !budgetData.category || !budgetData.subcategory || !budgetData.amount) {
      alert("All fields are required");
      return;
    }
  
    try {
      const response = await fetch("http://127.0.0.1:8000/api/budgets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(budgetData),
      });
  
      if (!response.ok) throw new Error("Failed to save budget");
  
      const result = await response.json();
      setSuccessMessage("Budget Created Successfully");
      setTimeout(() => setSuccessMessage(""), 3000);
      toggleModal();
    } catch (error) {
      console.error("Error:", error);
      alert("Error saving budget");
    }
  };
  

  return (
    <div className="flex">
      <Sidebar collapsed={collapsed} onToggle={toggleSidebar} />
      <div className={`p-6 bg-gray-100 min-h-screen transition-all duration-300 flex-1 flex flex-col ${collapsed ? "ml-10" : "ml-52"}`}>
        <Navbar isSidebarCollapsed={collapsed} />
        <div className="p-6" style={{ marginTop: "40px" }}>
          {/* Account List Table */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Budget List</h2>
              <button onClick={toggleModal} className="bg-blue-500 text-white px-4 py-2 rounded-md">+ Add Budget</button>
            </div>
            
            {/* Table Controls */}
            <div className="flex justify-between items-center mb-4">
              <div className="space-x-2">
                {["Copy", "CSV", "PDF", "Print"].map((action) => (
                  <button key={action} className="bg-gray-200 px-3 py-1 rounded-md text-sm">{action}</button>
                ))}
              </div>
              <input type="text" placeholder="Search:" className="border p-2 rounded-md" />
            </div>

            {/* Table */}
            <table className="w-full border rounded-md">
              <thead>
                <tr className="bg-gray-100">
                  {["Category", "Sub Category", "Amount", "Month", "Action"].map((header) => (
                    <th key={header} className="p-2 border text-left">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={5} className="text-center p-4">No data available in table</td>
                </tr>
              </tbody>
            </table>

            {/* Table Pagination */}
            <div className="flex justify-between items-center mt-4">
              <div>
                <label>Show </label>
                <select className="border p-1 rounded-md">
                  {[10, 25, 50, 100].map((num) => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
                <span> entries</span>
              </div>
              <div>
                <button className="bg-gray-200 px-3 py-1 rounded-md text-sm mr-2">Previous</button>
                <button className="bg-gray-200 px-3 py-1 rounded-md text-sm">Next</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-4">Add Budget</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-2">
                <label className="block text-sm font-medium">Month</label>
                <select name="month" value={budgetData.month} onChange={handleChange} className="border p-2 w-full rounded-md">
                  <option value="">Select Month</option>
                  {months.map((month) => <option key={month} value={month}>{month}</option>)}
                </select>
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium">Year</label>
                <select name="year" value={budgetData.year} onChange={handleChange} className="border p-2 w-full rounded-md">
                  <option value="">Select Year</option>
                  {years.map((year) => <option key={year} value={year}>{year}</option>)}
                </select>
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium">Category</label>
                <select name="category" value={budgetData.category} onChange={handleChange} className="border p-2 w-full rounded-md">
                  <option value="">Select Category</option>
                  {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
              {budgetData.category && (
                <div className="mb-2">
                  <label className="block text-sm font-medium">Subcategory</label>
                  <select name="subcategory" value={budgetData.subcategory} onChange={handleChange} className="border p-2 w-full rounded-md">
                    <option value="">Select Subcategory</option>
                    {subcategories[budgetData.category].map((sub) => <option key={sub} value={sub}>{sub}</option>)}
                  </select>
                </div>
              )}
              <div className="mb-2">
                <label className="block text-sm font-medium">Amount</label>
                <input type="number" name="amount" value={budgetData.amount} onChange={handleChange} className="border p-2 w-full rounded-md" />
              </div>
              <div className="flex justify-end mt-4">
                <button type="button" onClick={toggleModal} className="bg-gray-400 text-white px-4 py-2 rounded-md mr-2">Cancel</button>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {successMessage && (
        <div className="fixed bottom-4 left-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg">
          {successMessage}
        </div>
      )}
    </div>
  );
};

export default FinancialGoals;
