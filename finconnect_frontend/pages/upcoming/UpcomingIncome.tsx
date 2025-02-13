import React, { useState } from "react";
import { TrendingUp } from "lucide-react";
import Navbar from "@/components/bar/header";
import Sidebar from "@/components/bar/sidebar";

const UpcomingIncome = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    reference: "",
    date: "",
    category: "",
    sub_Category: "",
    note: "",
    receipt: null,
  });

  const toggleSidebar = () => setCollapsed(!collapsed);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, receipt: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccessMessage("");

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    try {
      const response = await fetch("http://127.0.0.1:8000/api/income-upcoming", {
        method: "POST",
        body: formDataToSend,
      });

      const result = await response.json();
      if (response.ok) {
        setSuccessMessage("Income saved successfully!");
        closeModal();
        setFormData({
          name: "",
          amount: "",
          reference: "",
          date: "",
          category: "",
          sub_Category: "",
          note: "",
          receipt: null,
        });
      } else {
        setSuccessMessage("Error: " + result.message);
      }
    } catch (error) {
      setSuccessMessage("Error saving income. Please try again.");
    } finally {
      setIsLoading(false);
      setTimeout(() => setSuccessMessage(""), 3000);
    }
  };


  return (
    <div className="flex h-screen">
      <Sidebar collapsed={collapsed} onToggle={toggleSidebar} />
      <div
        className={`p-6 bg-gray-100 min-h-screen transition-all duration-300 flex-1 flex flex-col ${
          collapsed ? "ml-10" : "ml-52"
        }`}
      >
        <Navbar isSidebarCollapsed={collapsed} />

        <div className="p-6 mt-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {["Due this month", "Due this week", "Due today"].map((text, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-none p-4 flex items-center relative overflow-hidden"
              >
                <div className="absolute left-0 top-0 bottom-0 flex items-center justify-center w-16 bg-cyan-400">
                  <TrendingUp className="text-white text-3xl" />
                </div>
                <div className="ml-20">
                  <p className="text-lg font-semibold text-black">Ksh 0.00</p>
                  <p className="text-gray-600 text-sm">{text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="flex flex-col md:flex-row justify-between items-center mb-4">
              <h2 className="text-lg font-semibold mb-2 md:mb-0 text-blue-600">Upcoming Income</h2>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={openModal}>
                + Add Upcoming Income
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border rounded-md text-black">
                <thead>
                  <tr className="bg-gray-100">
                    {["Name", "Amount", "Date", "Category", "Action"].map((header) => (
                      <th key={header} className="p-2 border text-left">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={5} className="text-center p-4">
                      No data available in table
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Adding Income */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-h-[80vh] overflow-y-auto">
            <h2 className="text-lg font-semibold mb-4">Add Upcoming Income</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              {[
                { label: "Name", name: "name", type: "text" },
                { label: "Amount", name: "amount", type: "number" },
                { label: "Reference", name: "reference", type: "text" },
                { label: "Date", name: "date", type: "date" },
                { label: "Income Category", name: "category", type: "text" },
                { label: "Income Sub Category", name: "subCategory", type: "text" },
              ].map(({ label, name, type }) => (
                <div key={name} className="mb-3">
                  <label className="block text-sm font-medium">{label}</label>
                  <input
                    type={type}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    required
                    className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ))}

              <div className="mb-3">
                <label className="block text-sm font-medium">Note</label>
                <textarea
                  name="note"
                  value={formData.note}
                  onChange={handleChange}
                  className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-3">
                <label className="block text-sm font-medium">Attach Receipt</label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex justify-end space-x-3 mt-4">
                <button
                  type="button"
                  className="bg-gray-400 text-white px-4 py-2 rounded-md"
                  onClick={closeModal}
                >
                  Close
                </button>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md" disabled={isLoading}>
                  {isLoading ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {successMessage && (
              <div className="fixed bottom-5 left-5 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg">
                {successMessage}
              </div>
            )}
    </div>
  );
};

export default UpcomingIncome;
