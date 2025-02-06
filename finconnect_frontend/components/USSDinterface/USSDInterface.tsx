import React, { useState } from 'react';

const USSDInterface: React.FC = () => {
    const [screen, setScreen] = useState(0);
    const [input, setInput] = useState('');
    const [history, setHistory] = useState<string[]>([]);

    const menus = [
        {
            id: 0,
            title: "Welcome to Financial Advisor",
            options: [
                { label: "1. Check Budget Summary", next: 1 },
                { label: "2. Get Financial Advice", next: 2 },
                { label: "3. Exit", next: -1 },
            ],
        },
        {
            id: 1,
            title: "Your Budget Summary",
            content: "Income: $5000\nExpenses: $3000\nSavings: $2000",
            options: [{ label: "0. Back", next: 0 }],
        },
        {
            id: 2,
            title: "Enter your question for financial advice:",
            isInput: true,
            options: [{ label: "0. Back", next: 0 }],
        },
    ];

    const handleInput = (value: string) => {
        if (value === "0") {
            setScreen(0); 
        } else if (menus[screen]?.isInput) {
            const question = input;
            setHistory([...history, `You: ${question}`, "Advice: This is a placeholder advice."]);
            setInput('');
            setScreen(0); 
        } else {
            const option = menus[screen]?.options.find((opt) => opt.label.startsWith(value));
            if (option) {
                if (option.next === -1) {
                    setHistory([...history, "You exited the USSD menu."]);
                    setScreen(-1); 
                } else {
                    setHistory([...history, `Selected: ${option.label}`]);
                    setScreen(option.next);
                }
            }
        }
    };

    return (
        <div className="ussd-interface p-4 bg-gray-100 rounded shadow-md max-w-md mx-auto">
            {screen !== -1 ? (
                <div>
                    <h2 className="text-xl font-bold">{menus[screen]?.title}</h2>
                    {menus[screen]?.content && (
                        <pre className="bg-gray-200 p-2 rounded">{menus[screen].content}</pre>
                    )}
                    {!menus[screen]?.isInput && (
                        <ul className="mt-4">
                            {menus[screen]?.options.map((option, idx) => (
                                <li key={idx}>{option.label}</li>
                            ))}
                        </ul>
                    )}
                    {menus[screen]?.isInput ? (
                        <div className="mt-4">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Type your question..."
                                className="border p-2 w-full rounded"
                            />
                            <button
                                onClick={() => handleInput(input)}
                                className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
                            >
                                Submit
                            </button>
                        </div>
                    ) : (
                        <div className="mt-4">
                            <input
                                type="text"
                                placeholder="Enter option..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                className="border p-2 w-full rounded"
                            />
                            <button
                                onClick={() => handleInput(input)}
                                className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
                            >
                                Select
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <p className="text-center text-red-500">You have exited the USSD session.</p>
            )}
            <div className="history mt-6 p-2 bg-white border rounded">
                <h3 className="font-bold">Session History:</h3>
                <ul>
                    {history.map((entry, idx) => (
                        <li key={idx}>{entry}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default USSDInterface;
