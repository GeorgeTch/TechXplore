"use client";

import { useState } from "react";
import { DollarSign } from "lucide-react";

export function InvestmentForm({ projectName }) {
  const [amount, setAmount] = useState("");
  const [investmentStatus, setInvestmentStatus] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleInvest = async (e) => {
    e.preventDefault();
    setInvestmentStatus(null);

    if (!amount) {
      setInvestmentStatus({
        success: false,
        message: "Please enter an amount",
      });
      return;
    }

    try {
      const response = await fetch("/api/invest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectName,
          amount: Number(amount),
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setInvestmentStatus({
          success: true,
          message: "Investment successful!",
        });
        setAmount(""); // Reset amount after successful investment
      } else {
        setInvestmentStatus({
          success: false,
          message: result.error || "Investment failed",
        });
      }
    } catch (error) {
      console.error("Investment error:", error);
      setInvestmentStatus({ success: false, message: "An error occurred" });
    }
  };

  return (
    <div className="mt-4 w-full">
      {!isFormVisible ? (
        <button
          onClick={() => setIsFormVisible(true)}
          className="bg-primary text-white p-2 rounded-md w-full hover:opacity-90 transition-all duration-500 ease-in-out"
        >
          Invest in this project
        </button>
      ) : (
        <div className="bg-secondary p-4 rounded-md">
          <h3 className="text-lg font-semibold mb-2">
            Invest in {projectName}
          </h3>
          <form onSubmit={handleInvest} className="flex flex-col gap-2">
            <div className="flex items-center">
              <DollarSign />
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Investment amount"
                className="p-2 rounded-md border "
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-primary text-white p-2 rounded-md flex-1 hover:opacity-90 transition-all duration-500 ease-in-out"
              >
                Invest
              </button>
              <button
                type="button"
                onClick={() => setIsFormVisible(false)}
                className="bg-gray-300 text-gray-700 p-2 rounded-md flex-1 hover:opacity-90 transition-all duration-500 ease-in-out"
              >
                Cancel
              </button>
            </div>
          </form>
          {investmentStatus && (
            <p
              className={`mt-2 ${
                investmentStatus.success ? "text-green-500" : "text-red-500"
              }`}
            >
              {investmentStatus.message}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
