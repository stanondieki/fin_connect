import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Button from "@/components/ui/Button";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { User, DollarSign, BarChart2, ArrowLeft, Bell, CheckCircle, Lightbulb, TrendingUp } from "lucide-react";
import  Progress  from "@/components/progress/progress";
import { useRouter } from "next/router";

const Dashboard: React.FC = () => {
  const router = useRouter();

  const sampleData = [
    { month: "Jan", expenses: 400, income: 800 },
    { month: "Feb", expenses: 300, income: 900 },
    { month: "Mar", expenses: 500, income: 750 },
    { month: "Apr", expenses: 700, income: 1100 },
    { month: "May", expenses: 600, income: 850 },
    { month: "Jun", expenses: 450, income: 950 },
    { month: "Jul", expenses: 700, income: 1000 },
    { month: "Aug", expenses: 500, income: 900 },
    { month: "Sep", expenses: 650, income: 1050 },
    { month: "Oct", expenses: 800, income: 1200 },
    { month: "Nov", expenses: 550, income: 950 },
    { month: "Dec", expenses: 750, income: 1150 },
  ];
  const NotificationItem = ({ icon, text, color }: { icon: React.ReactNode, text: string, color: string }) => (
    <li className={`flex items-center space-x-3 ${color} hover:bg-gray-100 rounded-md p-2 transition duration-200 ease-in-out`}>
      <span>{icon}</span>
      <p className="text-gray-700 text-sm">{text}</p>
    </li>
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-600">Dashboard</h1>
        <button
          onClick={() => router.back()}
          className="absolute right-12 flex items-center space-x-1 text-blue-500 border border-blue-600 rounded-lg px-1 py-1"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
      </div>

      {/* Overview Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent>
            <div className="flex items-center space-x-4">
              <User className="text-blue-500 w-10 h-10" />
              <div>
                <h2 className="text-lg font-semibold text-blue-600">Profile Overview</h2>
                <p className="text-neutral-800">Anthony Makori</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div className="flex items-center space-x-4">
              <DollarSign className="text-green-500 w-10 h-10" />
              <div>
                <h2 className="text-lg font-semibold text-green-500">Monthly Budget</h2>
                <p className="text-gray-600">$2,500</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div className="flex items-center space-x-4">
              <BarChart2 className="text-purple-500 w-10 h-10" />
              <div>
                <h2 className="text-lg font-semibold text-purple-500">Savings Progress</h2>
                <p className="text-gray-600">$8,750</p>
                <Progress value={70} className="mt-2 w-full" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Notifications Section */}
      <div className="bg-white p-4 rounded-2xl shadow-lg mb-6">
      <h2 className="text-lg font-bold mb-2 text-blue-600 flex items-center">
        <Bell className="mr-2" /> Notifications
      </h2>
      <ul className="space-y-2">
        <NotificationItem 
          icon={<CheckCircle className="text-green-500 w-5 h-5" />} 
          text="🚀 You achieved a 7-day savings streak!" 
          color="bg-green-50" 
        />
        <NotificationItem 
          icon={<Lightbulb className="text-yellow-500 w-5 h-5" />} 
          text="💡 AI Suggestion: Consider reducing dining expenses to increase savings." 
          color="bg-yellow-50" 
        />
        <NotificationItem 
          icon={<TrendingUp className="text-blue-500 w-5 h-5" />} 
          text="📈 Your investment in ABC Inc. is up 10% this month." 
          color="bg-blue-50" 
        />
      </ul>
    </div>

      {/* Graph Section */}
      <div className="bg-white p-6 rounded-2xl shadow-lg mb-6">
        <h2 className="text-xl font-bold mb-4 text-black">
          <span className="text-red-500">Expense</span> vs. <span className="text-green-500">Income Analysis</span>
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={sampleData}>
            <Line type="monotone" dataKey="expenses" stroke="#FF5733" strokeWidth={2} />
            <Line type="monotone" dataKey="income" stroke="#33FF57" strokeWidth={2} />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Actionable Insights */}
      <div className="bg-white p-4 rounded-2xl shadow-lg mb-6">
        <h2 className="text-lg font-bold text-blue-600 mb-2 flex items-center">
          <TrendingUp className="mr-2" /> Actionable Insights
        </h2>
        <p className="text-gray-600">"You can save an additional $200 this month by cutting back on unnecessary subscriptions."</p>
      </div>

      {/* Call to Action Section */}
      <div className="mt-6">
        <Card>
          <CardContent className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold text-blue-600">Ready to improve your finances?</h2>
              <p className="text-gray-600">Get personalized advice and actionable insights.</p>
            </div>
            <Button className="bg-blue-500 text-white">Get Started</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
          