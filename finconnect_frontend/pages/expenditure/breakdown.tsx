import React, { useState } from "react";
import { useRouter } from "next/router";
import { ArrowLeft, Trash } from "lucide-react";

interface ExpenditureBreakdownProps {
  totalExpenses: number;
}

const ExpenditureBreakdown: React.FC<ExpenditureBreakdownProps> = ({ totalExpenses }) => {
  const [categories, setCategories] = useState<string[]>([""]);
  const [amounts, setAmounts] = useState<number[]>([0]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleCategoryChange = (index: number, value: string) => {
    const updatedCategories = [...categories];
    updatedCategories[index] = value;
    setCategories(updatedCategories);
  };

  const handleAmountChange = (index: number, value: number) => {
    const updatedAmounts = [...amounts];
    updatedAmounts[index] = value;
    setAmounts(updatedAmounts);
  };

  const handleAddRow = () => {
    setCategories([...categories, ""]);
    setAmounts([...amounts, 0]);
  };

  const handleRemoveRow = (index: number) => {
    if (categories.length > 1) {
      const updatedCategories = categories.filter((_, i) => i !== index);
      const updatedAmounts = amounts.filter((_, i) => i !== index);
      setCategories(updatedCategories);
      setAmounts(updatedAmounts);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const totalDefined = amounts.reduce((acc, amount) => acc + amount, 0);

    if (totalDefined > totalExpenses) {
      setError("The total expenditure exceeds the amount allocated in expenses.");
      return;
    }

    if (totalDefined < totalExpenses) {
      setError("The total expenditure does not match the amount allocated in expenses.");
      return;
    }

    alert("Expenditure breakdown saved successfully!");
  };

  return (
    <section className="bg-white p-6 sm:p-8 shadow-xl rounded-2xl mb-12 w-full max-w-full relative">
      <button
        onClick={() => router.back()}
        className="absolute right-4 sm:right-8 top-4 flex items-center space-x-2 text-blue-500 border border-blue-600 rounded-lg px-2 py-1 sm:px-3 sm:py-2"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="hidden sm:block">Back</span>
      </button>
      <h3 className="text-lg sm:text-2xl font-bold text-indigo-600 mb-4 text-center">
        📝 Define Expenditure Breakdown
      </h3>
      <p className="text-gray-700 text-sm sm:text-base mb-6 leading-relaxed text-center">
        Break down your total expenses of <strong>${totalExpenses}</strong> to ensure every cent is accounted for.
      </p>

      {error && (
        <div className="mb-4 text-red-600 bg-red-100 p-2 sm:p-3 rounded-lg text-center text-sm sm:text-base">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {categories.map((category, index) => (
          <div key={index} className="flex flex-wrap items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <input
              type="text"
              placeholder="Category"
              value={category}
              onChange={(e) => handleCategoryChange(index, e.target.value)}
              className="flex-grow text-black p-2 sm:p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
            />
            <input
              type="number"
              placeholder="Amount"
              value={amounts[index]}
              onChange={(e) => handleAmountChange(index, +e.target.value)}
              className="w-full sm:w-32 text-black p-2 sm:p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
              min="0"
            />
            <button
              type="button"
              onClick={() => handleRemoveRow(index)}
              className="bg-red-600 text-white px-3 sm:px-4 py-2 rounded-lg shadow-lg hover:bg-red-700 transition duration-300 flex items-center justify-center md:w-auto"
            >
              <Trash className="w-5 h-5 md:hidden" />
              <span className="hidden md:block">Remove</span>
            </button>
          </div>
        ))}

        <div className="flex flex-wrap justify-between space-y-4 sm:space-y-0">
          <button
            type="button"
            onClick={handleAddRow}
            className="w-full sm:w-auto bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-700 transition duration-300"
          >
            Add Category
          </button>
          <button
            type="submit"
            className="w-full sm:w-auto bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-indigo-700 transition duration-300"
          >
            Save Breakdown
          </button>
        </div>
      </form>
    </section>
  );
};

export default ExpenditureBreakdown;
