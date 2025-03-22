"use client";
import { useEffect, useState } from "react";

export default function UserDashboard() {
  const [balance, setBalance] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [amount, setAmount] = useState("");
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const userId = "67d5ae9111f11e4ea90aaa37"; // আপনার নির্দিষ্ট user_id

  // ✅ Balance Fetch Function
  const fetchBalance = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/singleBlance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId }),
      });

      const data = await response.json();
      if (data?.totalBlance) {
        setBalance(data.totalBlance);
      }
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };

  // ✅ Order Fetch Function
  const fetchOrders = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/orderShowingUser",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_id: userId }),
        }
      );

      const data = await response.json();
      setOrders(data);
      setOrderCount(data.length);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchBalance();
    fetchOrders();
  }, []);

  // ✅ Balance Add Function
  const handleAddBalance = async () => {
    const addAmount = parseFloat(amount);
    if (isNaN(addAmount) || addAmount <= 0) {
      alert("Please enter a valid amount!");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:8000/api/blance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId, amount: addAmount }),
      });

      if (response.ok) {
        alert("Balance added successfully!");
        setAmount("");
        await fetchBalance();
      } else {
        const errorData = await response.json();
        alert(`Failed to add balance: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error adding balance:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md md:max-w-lg lg:max-w-2xl mx-auto space-y-4 bg-white text-gray-900 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 border rounded-lg shadow-md text-center bg-gray-100">
          <h2 className="text-lg font-semibold">Total Balance</h2>
          <p className="text-2xl font-bold">${balance.toFixed(2)}</p>
        </div>

        <div className="p-4 border rounded-lg shadow-md text-center bg-gray-100">
          <h2 className="text-lg font-semibold">Total Orders</h2>
          <p className="text-2xl font-bold">{orderCount}</p>
        </div>
      </div>

      {/* ✅ Add Balance Section */}
      <div className="p-4 border rounded-lg shadow-md bg-gray-100">
        <h2 className="text-lg font-semibold mb-2">Add Balance</h2>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border rounded px-3 py-2 w-full bg-white text-gray-900"
            disabled={isLoading}
          />
          <button
            onClick={handleAddBalance}
            className={`px-4 py-2 rounded w-full md:w-auto text-white ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Adding..." : "Add"}
          </button>
        </div>
      </div>

      {/* ✅ Order List */}
      <div className="p-4 border rounded-lg shadow-md bg-gray-100">
        <h2 className="text-lg font-semibold mb-2">Order List</h2>
        <ul className="space-y-2">
          {orders.map((order, index) => (
            <li key={index} className="p-3 border rounded bg-white">
              {/* ✅ সার্ভিস আইডির পরিবর্তে সার্ভিসের নাম দেখানো হচ্ছে */}
              <p className="font-semibold">
                {order.service_id?.name || "Unknown Service"}
              </p>
              <p>
                Status:{" "}
                <span
                  className={`font-bold ${
                    order.isApproved === true
                      ? "text-green-500"
                      : order.isApproved === false
                      ? "text-yellow-500"
                      : "text-red-500"
                  }`}
                >
                  {order.isApproved ? "Approved" : "Pending"}
                </span>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
