import React, { useState } from "react";

interface BudgetTrackerProps {}

const BudgetTracker: React.FC<BudgetTrackerProps> = () => {
  const [income, setIncome] = useState<number | "">("");
  const [expenses, setExpenses] = useState<number | "">("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (income === "" || expenses === "") {
      alert("Please fill out both fields.");
      return;
    }

    const remainingBudget = (income as number) - (expenses as number);
    alert(`Your remaining budget is: ${remainingBudget}`);
  };

  return (
    <section id="budget" className="bg-white p-8 shadow-xl rounded-2xl mb-12">
      <h3 className="text-2xl font-bold text-indigo-600 mb-4">
        📊 Budget Tracker
      </h3>
      <p className="text-gray-700 mb-6 leading-relaxed">
        Keep track of your income and expenses. Get real-time insights into your spending habits.
      </p>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Income:
          </label>
          <input
            type="number"
            placeholder="Enter your monthly income"
            value={income}
            onChange={(e) => setIncome(e.target.value === "" ? "" : +e.target.value)}
            className="w-full text-black p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Expenses:
          </label>
          <input
            type="number"
            placeholder="Enter your monthly expenses"
            value={expenses}
            onChange={(e) => setExpenses(e.target.value === "" ? "" : +e.target.value)}
            className="w-full text-black p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-indigo-700 transition duration-300"
        >
          Update Budget
        </button>
      </form>
    </section>
  );
};

export default BudgetTracker;
