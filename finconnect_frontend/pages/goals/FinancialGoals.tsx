import React, { useState } from "react";
import Sidebar from "@/components/bar/sidebar";
import Navbar from "@/components/bar/header";

type FinancialGoal = {
  name: string;
  opening: number;
  target: number;
  targetDate: string;
  createdAt: Date;
};

const FinancialGoals = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [goals, setGoals] = useState<FinancialGoal[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editGoal, setEditGoal] = useState<FinancialGoal | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [goalData, setGoalData] = useState<Partial<FinancialGoal>>({
    name: "",
    opening: 0,
    target: 0,
    targetDate: "",
  });
  const [successMessage, setSuccessMessage] = useState("");

  const toggleSidebar = () => setCollapsed(!collapsed);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setGoalData((prev) => ({
      ...prev,
      [name]: name === "opening" || name === "target" ? Number(value) : value,
    }));
  };

  // Handle add/update goal
  const handleSave = async () => {
    if (!goalData.name || !goalData.opening || !goalData.target || !goalData.targetDate) {
      alert("All fields are required!");
      return;
    }
    setIsSaving(true);
  
    try {
      // Format the target date as "YYYY-MM-DD"
      const formattedDate = new Date(goalData.targetDate).toISOString().split("T")[0];
  
      // Prepare the data payload
      const requestData = {
        name: goalData.name,
        opening: goalData.opening,
        target: goalData.target,
        target_date: formattedDate, // Change to match API requirement
      };
  
      // Send POST request to save the financial goal
      const response = await fetch("http://127.0.0.1:8000/api/financial-goals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });
  
      const data = await response.json();
      if (response.ok) {
        setGoals((prev) => [...prev, { ...data.goal, createdAt: new Date() } as FinancialGoal]);
        setShowModal(false);
        setGoalData({ name: "", opening: 0, target: 0, targetDate: "" });
        setSuccessMessage("Financial goal added successfully!");
        setTimeout(() => setSuccessMessage(""), 5000);
      } else {
        alert(data.message || "Failed to add goal");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while saving the goal.");
    }
    setIsSaving(false);
  };
  
  

  // Handle edit goal
  const handleEdit = (goal: FinancialGoal) => {
    setEditGoal(goal);
    setGoalData(goal);
    setShowModal(true);
  };

  // Handle delete goal
  const handleDelete = (goalName: string) => {
    setGoals((prev) => prev.filter((goal) => goal.name !== goalName));
  };

  // Calculate progress
  const calculateProgress = (goal: FinancialGoal) => {
    const opening = goal.opening;
    const target = goal.target;
    const createdAt = new Date(goal.createdAt).getTime();
    const targetDate = new Date(goal.targetDate).getTime();
    const today = new Date().getTime();

    const elapsed = today - createdAt;
    const totalDuration = targetDate - createdAt;

    if (totalDuration <= 0) return 100; // If the target date has passed

    const progress = Math.min(((elapsed / totalDuration) * (target - opening)) + opening, target);
    return Math.max(0, ((progress - opening) / (target - opening)) * 100);
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
              <h2 className="text-lg font-semibold text-blue-600">Financial Goals List</h2>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={() => setShowModal(true)}>
                + Add New Goal
              </button>
            </div>

            {/* Table Controls */}
            <div className="flex justify-between items-center mb-4">
              <div className="space-x-2 text-black bg-gray-600">
                {["Copy", "CSV", "PDF", "Print"].map((action) => (
                  <button key={action} className="bg-gray-200 px-3 py-1 rounded-md text-sm">{action}</button>
                ))}
              </div>
              <input type="text" placeholder="Search:" className="border p-2 rounded-md" />
            </div>

            {/* Table */}
            <table className="w-full border rounded-md">
              <thead>
                <tr className="bg-gray-100 text-gray-900">
                  {["Name", "Opening", "Target", "Remaining", "Date", "Action"].map((header) => (
                    <th key={header} className="p-2 border text-left">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {goals.length > 0 ? (
                  goals.map((goal, index) => (
                    <tr key={index}>
                      <td className="p-2 border">{goal.name}</td>
                      <td className="p-2 border">{goal.opening}</td>
                      <td className="p-2 border">{goal.target}</td>
                      <td className="p-2 border">
                        <div className="w-full bg-gray-200 rounded">
                          <div
                            className="bg-green-500 text-xs text-center p-1 leading-none rounded"
                            style={{ width: `${calculateProgress(goal)}%` }}
                          >
                            {calculateProgress(goal).toFixed(2)}%
                          </div>
                        </div>
                      </td>
                      <td className="p-2 border">{goal.targetDate}</td>
                      <td className="p-2 border flex space-x-2">
                        <button className="bg-yellow-500 text-white px-3 py-1 rounded-md text-sm" onClick={() => handleEdit(goal)}>Edit</button>
                        <button className="bg-red-500 text-white px-3 py-1 rounded-md text-sm" onClick={() => handleDelete(goal.name)}>Delete</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center text-black p-4">No data available in table</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
       <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
       <div className="bg-white p-6 rounded-md w-96">
         <h2 className="text-lg font-semibold mb-4">{editGoal ? "Edit Goal" : "Add New Goal"}</h2>
         
         <label className="block text-sm font-medium text-gray-700">Goal Name <span className="text-red-500">*</span></label>
         <input 
           type="text" 
           name="name" 
           placeholder="Enter goal name" 
           value={goalData.name} 
           onChange={handleChange} 
           className="border p-2 rounded-md w-full mb-2" 
           required
         />
     
         <label className="block text-sm font-medium text-gray-700">Opening Balance <span className="text-red-500">*</span></label>
         <input 
           type="number" 
           name="opening" 
           placeholder="Enter opening balance" 
           value={goalData.opening} 
           onChange={handleChange} 
           className="border p-2 rounded-md w-full mb-2" 
           required
         />
     
         <label className="block text-sm font-medium text-gray-700">Target Amount <span className="text-red-500">*</span></label>
         <input 
           type="number" 
           name="target" 
           placeholder="Enter target amount" 
           value={goalData.target} 
           onChange={handleChange} 
           className="border p-2 rounded-md w-full mb-2" 
           required
         />
     
         <label className="block text-sm font-medium text-gray-700">Target Date <span className="text-red-500">*</span></label>
         <input 
           type="date" 
           name="targetDate" 
           value={goalData.targetDate} 
           onChange={handleChange} 
           className="border p-2 rounded-md w-full mb-2" 
           required
         />
     
         <div className="flex justify-end space-x-2">
           <button className="bg-gray-400 px-4 py-2 rounded-md" onClick={() => setShowModal(false)}>Cancel</button>
           <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={handleSave}>
             {editGoal ? "Update" : "Add"}
           </button>
         </div>
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
