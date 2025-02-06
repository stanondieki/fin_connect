import React, { useState } from "react";

interface BudgetTrackerProps {}

const BudgetTracker: React.FC<BudgetTrackerProps> = () => {
  const [income, setIncome] = useState<number | "">("");
  const [expenses, setExpenses] = useState<number | "">("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showBreakdownButton, setShowBreakdownButton] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Clear previous messages
    setError(null);
    setSuccess(null);
    setShowBreakdownButton(false);

    if (income === "" || expenses === "") {
      setError("Please fill out both fields.");
      return;
    }

    const incomeNumber = income as number;
    const expensesNumber = expenses as number;

    if (incomeNumber < expensesNumber) {
      setError("Expenses cannot exceed income.");
      return;
    }

    const remainingBudget = incomeNumber - expensesNumber;
    setSuccess(`Your remaining budget is: ${remainingBudget}`);
    setShowBreakdownButton(true);
  };

  return (
    <section id="budget" className="bg-white p-8 shadow-xl rounded-2xl mb-12 w-full">
      <h3 className="text-2xl font-bold text-indigo-600 mb-4 text-center">
        📊 Budget Tracker
      </h3>
      <p className="text-gray-700 mb-6 leading-relaxed text-center">
        Keep track of your income and expenses. Get real-time insights into your spending habits.
      </p>

      {/* Display Error or Success */}
      {error && (
        <div className="mb-4 text-red-600 bg-red-100 p-3 rounded-lg text-center">
          {error}
        </div>
      )}
      {success && (
        <div className="mb-4 text-green-600 bg-green-100 p-3 rounded-lg text-center">
          {success}
        </div>
      )}

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="income" className="block text-gray-700 font-medium mb-2">
            Income:
          </label>
          <input
            id="income"
            type="number"
            placeholder="Enter your monthly income"
            value={income}
            onChange={(e) => setIncome(e.target.value === "" ? "" : +e.target.value)}
            className="w-full text-black p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
            aria-label="Income"
            min="0"
          />
        </div>

        <div>
          <label htmlFor="expenses" className="block text-gray-700 font-medium mb-2">
            Expenses:
          </label>
          <input
            id="expenses"
            type="number"
            placeholder="Enter your monthly expenses"
            value={expenses}
            onChange={(e) => setExpenses(e.target.value === "" ? "" : +e.target.value)}
            className="w-full text-black p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
            aria-label="Expenses"
            min="0"
          />
        </div>

        <div className="flex space-x-2">
          <button
            type="submit"
            className="w-1/2 bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-indigo-700 transition duration-300"
          >
            Update Budget
          </button>
          <button
            type="button"
            className="w-1/2 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-700 transition duration-300"
            onClick={() => (window.location.href = '/Auth/signin')}
          >
            Your Dashboard
          </button>
        </div>
      </form>

      {/* Conditional Breakdown Button */}
      {showBreakdownButton && (
        <div className="mt-6">
          <button
            type="button"
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
            onClick={() => (window.location.href = '/expenditure/breakdown')}
         >
            Define Expenditure Breakdown
          </button>
        </div>
      )}
    </section>
  );
};

export default BudgetTracker;
