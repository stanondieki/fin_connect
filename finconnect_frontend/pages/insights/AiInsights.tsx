import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import Sidebar from "@/components/bar/sidebar";
import Navbar from "@/components/bar/header";

const AIInsights = () => {
    const [collapsed, setCollapsed] = useState(false);
    const toggleSidebar = () => setCollapsed(!collapsed);
  
    const [data] = useState({
        expenseCategorization: [
            { category: "Food", amount: 500 },
            { category: "Transport", amount: 200 },
            { category: "Entertainment", amount: 150 },
        ],
        budgetingAnalysis: {
            trends: "You spent 20% more on food this month.",
            recommendations: "Consider setting a budget limit for dining out."
        },
        investmentRecommendations: {
            stocks: "Tech stocks are projected to grow by 15% this year.",
            crypto: "Bitcoin remains volatile, consider diversifying.",
            realEstate: "Real estate investments in urban areas show steady growth."
        },
        savingsPlan: "Based on your income, saving 15% monthly is optimal for retirement.",
        debtManagement: {
            strategies: "Focus on high-interest debt first.",
            creditScore: "Your credit score is 720. Maintain timely payments to improve further."
        },
        goalTracking: {
            goals: "You're 60% towards your emergency fund goal.",
            healthScore: "Your financial health score is 75/100."
        }
    });

    return (
        <div className="flex h-screen bg-gray-50 text-gray-900">
            <Sidebar collapsed={collapsed} onToggle={toggleSidebar} />
            <div className={`p-6 transition-all duration-300 flex-1 flex flex-col ${collapsed ? "ml-10" : "ml-52"}`}>
                <Navbar isSidebarCollapsed={collapsed} />
                <div className="p-6 space-y-8">
                    <h1 className="text-3xl font-extrabold text-center text-gray-800">AI Financial Insights</h1>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <Card className="bg-white shadow-lg rounded-xl">
                            <CardContent>
                                <h2 className="text-lg font-bold text-gray-800 mb-3">Expense Categorization</h2>
                                <ResponsiveContainer width="100%" height={250}>
                                    <BarChart data={data.expenseCategorization}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                                        <XAxis dataKey="category" stroke="#4B5563" />
                                        <YAxis stroke="#4B5563" />
                                        <Tooltip contentStyle={{ backgroundColor: "#fff", borderColor: "#ddd" }} />
                                        <Bar dataKey="amount" fill="#6366F1" barSize={50} radius={[6, 6, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>

                        <Card className="bg-white shadow-lg rounded-xl">
                            <CardContent>
                                <h2 className="text-lg font-bold text-gray-800 mb-3">Budgeting & Analysis</h2>
                                <p className="text-gray-700">{data.budgetingAnalysis.trends}</p>
                                <p className="text-sm text-gray-500 mt-2">{data.budgetingAnalysis.recommendations}</p>
                            </CardContent>
                        </Card>

                        <Card className="bg-white shadow-lg rounded-xl">
                            <CardContent>
                                <h2 className="text-lg font-bold text-gray-800 mb-3">Investment Recommendations</h2>
                                <p><strong className="text-indigo-600">Stocks:</strong> {data.investmentRecommendations.stocks}</p>
                                <p><strong className="text-indigo-600">Crypto:</strong> {data.investmentRecommendations.crypto}</p>
                                <p><strong className="text-indigo-600">Real Estate:</strong> {data.investmentRecommendations.realEstate}</p>
                            </CardContent>
                        </Card>

                        <Card className="bg-white shadow-lg rounded-xl">
                            <CardContent>
                                <h2 className="text-lg font-bold text-gray-800 mb-3">Savings & Retirement</h2>
                                <p className="text-gray-700">{data.savingsPlan}</p>
                            </CardContent>
                        </Card>

                        <Card className="bg-white shadow-lg rounded-xl">
                            <CardContent>
                                <h2 className="text-lg font-bold text-gray-800 mb-3">Debt Management</h2>
                                <p><strong className="text-red-600">Strategy:</strong> {data.debtManagement.strategies}</p>
                                <p><strong className="text-green-600">Credit Score:</strong> {data.debtManagement.creditScore}</p>
                            </CardContent>
                        </Card>

                        <Card className="bg-white shadow-lg rounded-xl">
                            <CardContent>
                                <h2 className="text-lg font-bold text-gray-800 mb-3">Goal Tracking & Health Score</h2>
                                <p><strong className="text-green-600">Goals:</strong> {data.goalTracking.goals}</p>
                                <p><strong className="text-blue-600">Financial Health Score:</strong> {data.goalTracking.healthScore}</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AIInsights;
