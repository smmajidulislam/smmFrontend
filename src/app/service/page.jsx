"use client";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { useSession } from "next-auth/react";

export default function OrderPage() {
  const { category } = useAuth("/api/category");
  const [getServiceName, setServiceName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [link, setLink] = useState("");
  const [message, setMessage] = useState("");
  const [detaa, setdetaa] = useState("");

  const { data: session } = useSession();
  const userId = session?.user?._id;
  const handleOrderSubmit = async (e) => {
    e.preventDefault();

    const orderData = {
      user_id: userId,
      quantity,
      service_id: detaa,
      link,
    };

    try {
      const response = await fetch(
        "https://smmbackend-tgnc.onrender.com/api/orderPlacement",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        }
      );

      const result = await response.json();
      if (response.ok) {
        setMessage(result.message);
      } else {
        setMessage(result.message);
      }
    } catch (error) {
      setMessage("এপিআই ত্রুটি, দয়া করে পরে চেষ্টা করুন।");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 dark:bg-gray-900 dark:text-white">
      <h3 className="text-2xl md:text-4xl font-bold text-center mb-8 text-white">
        Order Your Service
      </h3>
      <form
        onSubmit={handleOrderSubmit}
        className="space-y-6 max-w-lg mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
      >
        {/* Category Selection */}
        <div>
          <label htmlFor="category" className="block text-lg font-medium">
            Select Category
          </label>
          <select
            onChange={(e) => setServiceName(e.target.value)}
            className="w-full p-3 mt-2 border rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600"
            required
          >
            <option value="" disabled>
              Select Category
            </option>
            {category.map((item) => (
              <option key={item._id} value={item.category}>
                {item.category}
              </option>
            ))}
          </select>
        </div>

        {/* Service Names based on Category */}
        <div>
          <label htmlFor="serviceName" className="block text-lg font-medium">
            Select Service Name
          </label>
          <select
            className="w-full p-3 mt-2 border rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600"
            disabled={!getServiceName}
            onChange={(e) => {
              setdetaa(e.target.value); // এখানে _id সেট করা হচ্ছে
            }}
            required
          >
            <option value="" disabled>
              Select Service Name
            </option>
            {category.map((item) => {
              if (item.category === getServiceName) {
                return item.names.map((n, index) => (
                  <option key={index} value={n.service}>
                    {n.name}
                  </option>
                ));
              }
              return null;
            })}
          </select>
        </div>

        {/* Link part*/}
        <div>
          <label htmlFor="link" className="block text-lg font-medium">
            Link
          </label>
          <input
            type="text"
            id="link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="w-full p-3 mt-2 border rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600"
            required
          />
        </div>
        {/* Service price based on Category */}
        {category.map((item) => {
          if (item.category === getServiceName) {
            return item.names.map((n, index) => {
              if (n.name === detaa) {
                return (
                  <div key={index} className="text-lg font-medium">
                    Service Price: {n.rate}
                  </div>
                );
              }
              return null;
            });
          }
          return null;
        })}

        {/* Quantity */}
        <div>
          <label htmlFor="quantity" className="block text-lg font-medium">
            Quantity
          </label>
          <input
            type="number"
            id="quantity"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full p-3 mt-2 border rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600 "
            required
          />
        </div>

        {/* Place Order Button */}
        {message && <div className="text-red-500">{message}</div>}
        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white rounded-lg mt-6 hover:bg-blue-700 transition"
        >
          Place Order
        </button>
      </form>
    </div>
  );
}
