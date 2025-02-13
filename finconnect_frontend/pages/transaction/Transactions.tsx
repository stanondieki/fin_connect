import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import Textarea from "@/components/ui/textarea";
import { Select, SelectItem } from "@/components/ui/select";
import { Check, Paperclip } from "lucide-react";
import Sidebar from "@/components/bar/sidebar";
import Navbar from "@/components/bar/header";

const handleSubmit = async (type, formData, setLoading, setSuccessMessage) => {
  try {
    setLoading(true);
    setSuccessMessage(""); // Clear previous messages

    const endpoint = type === "income" ? "/api/income" : "/api/expense";
    const response = await fetch(`http://127.0.0.1:8000${endpoint}`, {
      method: "POST",
      body: formData,
    });

    const result = await response.json();
    if (response.ok) {
      setSuccessMessage(result.message || `${type === "income" ? "Income" : "Expense"} saved successfully!`);
    } else {
      alert(result.message || "Something went wrong!");
    }
  } catch (error) {
    console.error("Error saving transaction:", error);
    alert("Failed to save transaction. Please try again.");
  } finally {
    setLoading(false);
  }
};

const TransactionForm = ({ type }) => {
  const [date] = useState(new Date().toISOString().split("T")[0]);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    await handleSubmit(type, formData, setLoading, setSuccessMessage);
  };

  return (
    <Card className="bg-white shadow-lg rounded-xl border border-gray-200">
      <CardHeader className={type === "income" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
        <CardTitle>{type === "income" ? "Income Transaction" : "Expense Transaction"}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 p-6">
        {successMessage && (
          <div className="p-3 bg-green-200 text-green-800 rounded-md text-sm">
            {successMessage}
          </div>
        )}
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name*</label>
            <Input name="name" placeholder="Enter name" required className="border-gray-300 focus:border-blue-500 w-full" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Amount*</label>
            <Input name="amount" type="number" placeholder="Enter amount" required className="border-gray-300 focus:border-blue-500 w-full" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Reference</label>
            <Input name="reference" placeholder="Enter reference" className="border-gray-300 focus:border-blue-500 w-full" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Date</label>
            <Input name="date" type="date" defaultValue={date} readOnly className="border-gray-300 bg-gray-100 text-gray-600 w-full" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Account*</label>
            <Select name="account" className="border-gray-300 focus:border-blue-500 w-full">
              <SelectItem value="bank">Bank</SelectItem>
              <SelectItem value="cash">Cash</SelectItem>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {type === "income" ? "Income Category*" : "Expense Category*"}
            </label>
            <Select name="category" className="border-gray-300 focus:border-blue-500 w-full">
              {type === "income" ? (
                <>
                  <SelectItem value="salary">Salary</SelectItem>
                  <SelectItem value="investment">Investment</SelectItem>
                </>
              ) : (
                <>
                  <SelectItem value="food">Food</SelectItem>
                  <SelectItem value="rent">Rent</SelectItem>
                </>
              )}
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {type === "income" ? "Income Sub Category*" : "Expense Sub Category*"}
            </label>
            <Select name="sub_category" className="border-gray-300 focus:border-blue-500 w-full">
              {type === "income" ? (
                <>
                  <SelectItem value="bonus">Bonus</SelectItem>
                  <SelectItem value="dividends">Dividends</SelectItem>
                </>
              ) : (
                <>
                  <SelectItem value="groceries">Groceries</SelectItem>
                  <SelectItem value="utilities">Utilities</SelectItem>
                </>
              )}
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Note</label>
            <Textarea name="note" placeholder="Add a note" className="border-gray-300 focus:border-blue-500 w-full" />
          </div>
          <div>
            <div className="relative border-dotted border-2 border-gray-400 hover:border-blue-500 transition-all p-3 rounded-lg cursor-pointer flex items-center justify-center bg-gray-50">
              <Paperclip className="mr-2 text-gray-500" />
              <Input name="receipt" type="file" className="absolute inset-0 opacity-0 cursor-pointer" />
            </div>
          </div>
          <Button type="submit" className={`w-full ${type === "income" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}`} disabled={loading}>
            {loading ? "Processing..." : <><Check className="mr-2" /> {type === "income" ? "Save Income" : "Save Expense"}</>}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

const TransactionPage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const toggleSidebar = () => setCollapsed(!collapsed);

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar collapsed={collapsed} onToggle={toggleSidebar} />
      <div className={`p-6 transition-all duration-300 flex-1 flex flex-col ${collapsed ? "ml-10" : "ml-52"}`}>
        <Navbar isSidebarCollapsed={collapsed} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          <TransactionForm type="income" />
          <TransactionForm type="expense" />
        </div>
      </div>
    </div>
  );
};

export default TransactionPage;
