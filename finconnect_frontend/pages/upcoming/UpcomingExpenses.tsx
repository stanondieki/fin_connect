import React, { useState } from "react";
import { TrendingDown, X } from "lucide-react";
import Navbar from "@/components/bar/header";
import Sidebar from "@/components/bar/sidebar";

const UpcomingExpenses = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    reference: "",
    date: "",
    category: "",
    subCategory: "",
    note: "",
    receipt: null,
  });

  const toggleSidebar = () => setCollapsed(!collapsed);
  const toggleModal = () => setShowModal(!showModal);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, receipt: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);
    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) formDataToSend.append(key, value);
    });
    
    try {
      const response = await fetch("http://127.0.0.1:8000/api/expense-upcoming", {
        method: "POST",
        body: formDataToSend,
      });
      
      const result = await response.json();
      if (response.ok) {
        setSuccessMessage("Expense added successfully!");
        setTimeout(() => setSuccessMessage(""), 3000);
        toggleModal();
      } else {
        alert(result.message || "Failed to add expense");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="flex h-screen">
      <Sidebar collapsed={collapsed} onToggle={toggleSidebar} />
      <div className={`p-6 bg-gray-100 min-h-screen flex-1 flex flex-col ${collapsed ? "ml-10" : "ml-52"}`}>
        <Navbar isSidebarCollapsed={collapsed} />
        <div className="p-6 mt-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {["Due this month", "Due this week", "Due today"].map((text, index) => (
              <div key={index} className="bg-white shadow-md rounded-none p-4 flex items-center relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 flex items-center justify-center w-16 bg-red-600">
                  <TrendingDown className="text-white text-3xl" />
                </div>
                <div className="ml-20">
                  <p className="text-lg font-semibold text-black">Ksh 0.00</p>
                  <p className="text-gray-600 text-sm">{text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-red-600">Upcoming Expenses</h2>
              <button onClick={toggleModal} className="bg-red-600 text-white px-4 py-2 rounded-md">+ Add Upcoming Expense</button>
            </div>
            {/* Expense Table */}
            <div className="overflow-x-auto">
              <table className="w-full border rounded-md text-black">
                <thead>
                  <tr className="bg-gray-100">
                    {["Name", "Amount", "Date", "Category", "Action"].map((header) => (
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
            </div>
          </div>
        </div>
      </div>
      {/* Modal for Adding Expense */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Add Upcoming Expense</h2>
              <button onClick={toggleModal} className="text-gray-500 hover:text-red-500"><X size={24} /></button>
            </div>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <input type="text" name="name" placeholder="Name" onChange={handleChange} className="w-full border p-2 rounded-md" required />
              <input type="number" name="amount" placeholder="Amount" onChange={handleChange} className="w-full border p-2 rounded-md" required />
              <input type="text" name="reference" placeholder="Reference (Optional)" onChange={handleChange} className="w-full border p-2 rounded-md" />
              <input type="date" name="date" onChange={handleChange} className="w-full border p-2 rounded-md" required />
              <input type="text" name="category" placeholder="Expense Category" onChange={handleChange} className="w-full border p-2 rounded-md" required />
              <input type="text" name="subCategory" placeholder="Expense Sub Category" onChange={handleChange} className="w-full border p-2 rounded-md" required />
              <textarea name="note" placeholder="Note (Optional)" onChange={handleChange} className="w-full border p-2 rounded-md"></textarea>
              <input type="file" name="receipt" onChange={handleFileChange} className="w-full border p-2 rounded-md" />
              <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded-md w-full" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Expense"}
              </button>
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

export default UpcomingExpenses;
