import React, { useState } from "react";
import Sidebar from "@/components/bar/sidebar";
import Navbar from "@/components/bar/header";

const AccountList = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    opening_balance: "",
    account_number: "",
    description: "",
  });

  const toggleSidebar = () => setCollapsed(!collapsed);
  const toggleForm = () => setShowForm(!showForm);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/api/accounts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Account Created:", result);
        
        setShowForm(false);
        setFormData({ 
          name: "", 
          opening_balance: "", 
          account_number: "", 
          description: "" 
        });

        // Show success message
        setSuccessMessage("Account Added Successfully");
        
        // Hide message after 3 seconds
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      } else {
        console.error("Failed to create account");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex">
      <Sidebar collapsed={collapsed} onToggle={toggleSidebar} />
      <div className={`p-6 bg-gray-100 min-h-screen transition-all duration-300 flex-1 flex flex-col ${collapsed ? "ml-10" : "ml-52"}`}>
        <Navbar isSidebarCollapsed={collapsed} />
        <div className="p-6" style={{ marginTop: "40px" }}>
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Account List</h2>
              <button onClick={toggleForm} className="bg-blue-500 text-white px-4 py-2 rounded-md">+ Add New Account</button>
            </div>
            <div className="flex justify-between items-center mb-4">
              <div className="space-x-2">
                {["Copy", "CSV", "PDF", "Print"].map((action) => (
                  <button key={action} className="bg-gray-200 px-3 py-1 rounded-md text-sm">{action}</button>
                ))}
              </div>
              <input type="text" placeholder="Search:" className="border p-2 rounded-md" />
            </div>
            <table className="w-full border rounded-md">
              <thead>
                <tr className="bg-gray-100">
                  {["Account ID", "Name", "Opening Balance", "Description", "Action"].map((header) => (
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
            {showForm && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                  <h2 className="text-lg font-semibold mb-4">Add New Account</h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="text" name="name" placeholder="Name" required className="w-full p-2 border rounded-md" value={formData.name} onChange={handleChange} />
                    <input type="number" name="opening_balance" placeholder="Opening Balance" required className="w-full p-2 border rounded-md" value={formData.opening_balance} onChange={handleChange} />
                    <input type="text" name="account_number" placeholder="Account Number" required className="w-full p-2 border rounded-md" value={formData.account_number} onChange={handleChange} />
                    <input type="text" name="description" placeholder="Description (Optional)" className="w-full p-2 border rounded-md" value={formData.description} onChange={handleChange} />
                    <div className="flex justify-end space-x-2">
                      <button type="button" onClick={toggleForm} className="bg-gray-400 text-white px-4 py-2 rounded-md">Cancel</button>
                      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Save</button>
                    </div>
                  </form>
                </div>
              </div>
            )}
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

      {/* Success Message Card */}
      {successMessage && (
        <div className="fixed bottom-6 left-6 bg-green-500 text-white p-4 rounded-lg shadow-lg">
          {successMessage}
        </div>
      )}
    </div>
  );
};

export default AccountList;
