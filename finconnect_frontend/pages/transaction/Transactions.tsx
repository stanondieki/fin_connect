import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import Textarea from "@/components/ui/textarea";
import { Select, SelectItem } from "@/components/ui/select";
import { Check, Paperclip } from "lucide-react";
import Sidebar from "@/components/bar/sidebar";
import Navbar from "@/components/bar/header";

const handleSubmit = async (type: "income" | "expense", formData: FormData, setLoading: (loading: boolean) => void) => {
  try {
    setLoading(true);
    const endpoint = type === "income" ? "/api/income" : "/api/expense";
    const response = await fetch(`http://127.0.0.1:8000${endpoint}`, {
      method: "POST",
      body: formData,
    });

    const result = await response.json();
    alert(result.message);
  } catch (error) {
    console.error("Error saving transaction:", error);
  } finally {
    setLoading(false);
  }
};

const TransactionForm = ({ type }: { type: "income" | "expense" }) => {
  const [date] = useState(new Date().toISOString().split("T")[0]);
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    await handleSubmit(type, formData, setLoading);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{type === "income" ? "Income Transaction" : "Expense Transaction"}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label htmlFor={`${type}-name`} className="block text-sm font-medium">Name*</label>
            <Input id={`${type}-name`} name="name" placeholder="Enter name" required />
          </div>
          <div>
            <label htmlFor={`${type}-amount`} className="block text-sm font-medium">Amount*</label>
            <Input id={`${type}-amount`} name="amount" type="number" placeholder="Enter amount" required />
          </div>
          <div>
            <label htmlFor={`${type}-reference`} className="block text-sm font-medium">Reference</label>
            <Input id={`${type}-reference`} name="reference" placeholder="Enter reference" />
          </div>
          <div>
            <label htmlFor={`${type}-date`} className="block text-sm font-medium">Date</label>
            <Input id={`${type}-date`} name="date" type="date" defaultValue={date} readOnly />
          </div>
          <div>
            <label htmlFor={`${type}-account`} className="block text-sm font-medium">Account*</label>
            <Select id={`${type}-account`} name="account">
              <SelectItem value="bank">Bank</SelectItem>
              <SelectItem value="cash">Cash</SelectItem>
            </Select>
          </div>
          <div>
            <label htmlFor={`${type}-category`} className="block text-sm font-medium">
              {type === "income" ? "Income Category*" : "Expense Category*"}
            </label>
            <Select id={`${type}-category`} name="category">
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
            <label htmlFor={`${type}-sub-category`} className="block text-sm font-medium">
              {type === "income" ? "Income Sub Category*" : "Expense Sub Category*"}
            </label>
            <Select id={`${type}-sub-category`} name="sub_category">
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
            <label htmlFor={`${type}-note`} className="block text-sm font-medium">Note</label>
            <Textarea id={`${type}-note`} name="note" placeholder="Add a note" />
          </div>
          <div>
            <label htmlFor={`${type}-receipt`} className="block text-sm font-medium">Attach Receipt</label>
            <div className="relative border-dotted border-2 border-gray-400 hover:border-blue-500 transition-all p-3 rounded-lg cursor-pointer flex items-center justify-center">
              <Paperclip className="mr-2" />
              <span className="text-gray-500">Choose file to upload</span>
              <Input id={`${type}-receipt`} name="receipt" type="file" className="absolute inset-0 opacity-0 cursor-pointer" />
            </div>
          </div>
          <Button type="submit" className="w-full" variant={type === "income" ? "success" : "danger"} disabled={loading}>
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
    <div className="flex">
      <Sidebar collapsed={collapsed} onToggle={toggleSidebar} />
      <div className={`p-6 bg-gray-100 min-h-screen transition-all duration-300 flex-1 flex flex-col ${collapsed ? "ml-10" : "ml-52"}`}>
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
