import { useState } from "react";
import { Input } from "@/components/ui/input";
import Button from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Sidebar from "../../components/bar/sidebar";
import Navbar from "@/components/bar/header";
import axios from "axios";
import { Trash } from "lucide-react";

// Define Types
type Expense = {
  name: string;
  cost: string;
};

const UserProfile = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const toggleSidebar = () => setIsSidebarCollapsed((prev) => !prev);

  const [formData, setFormData] = useState<{ 
    name: string;
    email: string;
    financialGoals: string[];
    income: string;
    expenses: Expense[];
  }>({
    name: "",
    email: "",
    financialGoals: [""],
    income: "",
    expenses: [{ name: "", cost: "" }]
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>, 
    index?: number, 
    field?: keyof Expense | "financialGoals"
  ) => {
    if (field === "financialGoals" && typeof index === "number") {
      setFormData((prev) => {
        const updatedGoals = [...prev.financialGoals];
        updatedGoals[index] = e.target.value;
        return { ...prev, financialGoals: updatedGoals };
      });
    } else if (typeof index === "number" && field) {
      setFormData((prev) => {
        const updatedExpenses = [...prev.expenses];
        updatedExpenses[index] = { ...updatedExpenses[index], [field]: e.target.value };
        return { ...prev, expenses: updatedExpenses };
      });
    } else {
      setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  const addExpenseField = () => {
    setFormData((prev) => ({
      ...prev,
      expenses: [...prev.expenses, { name: "", cost: "" }]
    }));
  };

  const addGoalField = () => {
    setFormData((prev) => ({
      ...prev,
      financialGoals: [...prev.financialGoals, ""]
    }));
  };

  const removeGoalField = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      financialGoals: prev.financialGoals.filter((_, i) => i !== index)
    }));
  };

  const removeExpenseField = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      expenses: prev.expenses.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("/api/user/profile", formData);
      console.log("Profile updated:", response.data);
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar collapsed={isSidebarCollapsed} onToggle={toggleSidebar} />
      <Navbar isSidebarCollapsed={isSidebarCollapsed} />
      
      <div className={`flex-1 p-6 ${isSidebarCollapsed ? "ml-20" : "ml-56"}`}>
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-4">User Profile</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label>Name</Label>
                <Input type="text" name="name" value={formData.name} onChange={handleChange} required />
              </div>
              <div>
                <Label>Email</Label>
                <Input type="email" name="email" value={formData.email} onChange={handleChange} required />
              </div>
              <div>
                <Label>Financial Goals</Label>
                {formData.financialGoals.map((goal, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input 
                      type="text" 
                      placeholder="Financial Goal" 
                      value={goal} 
                      onChange={(e) => handleChange(e, index, "financialGoals")}
                      required 
                    />
                    <button type="button" onClick={() => removeGoalField(index)}>
                      <Trash className="w-5 h-5 text-red-500" />
                    </button>
                  </div>
                ))}
                <Button type="button" onClick={addGoalField} className="mt-2">Add Goal</Button>
              </div>
              <div>
                <Label>Income</Label>
                <Input type="number" name="income" value={formData.income} onChange={handleChange} required />
              </div>
              <div>
                <Label>Expenses</Label>
                {formData.expenses.map((expense, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input 
                      type="text" 
                      placeholder="Expense Name" 
                      value={expense.name} 
                      onChange={(e) => handleChange(e, index, "name")} 
                      required 
                    />
                    <Input 
                      type="number" 
                      placeholder="Cost" 
                      value={expense.cost} 
                      onChange={(e) => handleChange(e, index, "cost")} 
                      required 
                    />
                    <button type="button" onClick={() => removeExpenseField(index)}>
                      <Trash className="w-5 h-5 text-red-500" />
                    </button>
                  </div>
                ))}
                <Button type="button" onClick={addExpenseField} className="mt-2">Add Expense</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
      <div className="absolute bottom-6 right-6">
        <Button type="submit" disabled={loading} onClick={handleSubmit}>
          {loading ? "Saving..." : "Save Profile"}
        </Button>
      </div>
    </div>
  );
};

export default UserProfile;
