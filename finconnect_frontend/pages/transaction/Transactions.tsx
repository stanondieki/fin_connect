import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import Textarea from "@/components/ui/textarea";
import { Select, SelectItem } from "@/components/ui/select";
import { Check, Paperclip } from "lucide-react";
import Sidebar from "@/components/bar/sidebar";
import Navbar from "@/components/bar/header";

const TransactionPage = () => {
  const [date] = useState(new Date().toISOString().split("T")[0]);
    const [collapsed, setCollapsed] = useState(false);
    const toggleSidebar = () => setCollapsed(!collapsed);

  return (
    <div className="flex">
      <Sidebar collapsed={collapsed} onToggle={toggleSidebar} />
      <div className={`p-6 bg-gray-100 min-h-screen transition-all duration-300 flex-1 flex flex-col ${collapsed ? "ml-10" : "ml-52"}`}>
        <Navbar isSidebarCollapsed={collapsed} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          {/* Income Transaction Card */}
          <Card>
            <CardHeader>
              <CardTitle>Income Transaction</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input label="Name*" placeholder="Enter name" required />
              <Input label="Amount*" type="number" placeholder="Enter amount" required />
              <Input label="Reference" placeholder="Enter reference" />
              <Input label="Date" type="date" defaultValue={date} disabled />
              <Select label="Account*">
                <SelectItem value="bank">Bank</SelectItem>
                <SelectItem value="cash">Cash</SelectItem>
              </Select>
              <Select label="Income Category*">
                <SelectItem value="salary">Salary</SelectItem>
                <SelectItem value="investment">Investment</SelectItem>
              </Select>
              <Select label="Income Sub Category*">
                <SelectItem value="bonus">Bonus</SelectItem>
                <SelectItem value="dividends">Dividends</SelectItem>
              </Select>
              <Textarea label="Note" placeholder="Add a note" />
              <label className="block text-sm font-medium">Attach Receipt</label>
              <div className="relative border-dotted border-2 border-gray-400 hover:border-blue-500 transition-all p-3 rounded-lg cursor-pointer flex items-center justify-center">
                <Paperclip className="mr-2" />
                <span className="text-gray-500">Choose file to upload</span>
                <Input type="file" className="absolute inset-0 opacity-0 cursor-pointer" />
              </div>
              <Button className="w-full" variant="success">
                <Check className="mr-2" /> Save Income
              </Button>
            </CardContent>
          </Card>

          {/* Expense Transaction Card */}
          <Card>
            <CardHeader>
              <CardTitle>Expense Transaction</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input label="Name*" placeholder="Enter name" required />
              <Input label="Amount*" type="number" placeholder="Enter amount" required />
              <Input label="Reference" placeholder="Enter reference" />
              <Input label="Date" type="date" defaultValue={date} disabled />
              <Select label="Account*">
                <SelectItem value="bank">Bank</SelectItem>
                <SelectItem value="cash">Cash</SelectItem>
              </Select>
              <Select label="Expense Category*">
                <SelectItem value="food">Food</SelectItem>
                <SelectItem value="rent">Rent</SelectItem>
              </Select>
              <Select label="Expense Sub Category*">
                <SelectItem value="groceries">Groceries</SelectItem>
                <SelectItem value="utilities">Utilities</SelectItem>
              </Select>
              <Textarea label="Note" placeholder="Add a note" />
              <label className="block text-sm font-medium">Attach Receipt</label>
              <div className="relative border-dotted border-2 border-gray-400 hover:border-blue-500 transition-all p-3 rounded-lg cursor-pointer flex items-center justify-center">
                <Paperclip className="mr-2" />
                <span className="text-gray-500">Choose file to upload</span>
                <Input type="file" className="absolute inset-0 opacity-0 cursor-pointer" />
              </div>
              <Button className="w-full" variant="danger">
                <Check className="mr-2" /> Save Expense
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TransactionPage;
