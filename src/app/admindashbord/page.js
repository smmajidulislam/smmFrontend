"use client";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [balanceRequests, setBalanceRequests] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);

  // Fetch Balance Requests
  useEffect(() => {
    const fetchBalanceRequests = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/blanceShow");
        const data = await response.json();

        if (Array.isArray(data)) {
          setBalanceRequests(
            data.map((item) => ({
              id: item._id,
              userId: item.user_id ? item.user_id._id : null,
              user: item.user_id
                ? `${item.user_id.firstName} ${item.user_id.lastName}`
                : "Unknown",
              amount: `$${item.amount}`,
              status: item.isApproved ? "Approved" : "Pending",
            }))
          );
        }
      } catch (error) {
        console.error("Error fetching balance requests:", error);
      }
    };

    fetchBalanceRequests();
  }, []);

  // Fetch Users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/users");
        const data = await response.json();
        if (Array.isArray(data)) {
          setUsers(
            data.map((user) => ({
              id: user._id,
              name: `${user.firstName} ${user.lastName}`,
              email: user.email,
            }))
          );
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Fetch Orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/orderShowingAdmin"
        );
        const data = await response.json();
        console.log(data);

        if (Array.isArray(data)) {
          setOrders(
            data.map((order) => ({
              id: order._id,
              service: order.service_id,
              user: order.user_id,
              status: "false",
            }))
          );
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  // Approve Balance Request
  const handleApproveBalance = async (id, userId) => {
    try {
      const response = await fetch("http://localhost:8000/api/blanced", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: userId }),
      });

      if (response.ok) {
        setBalanceRequests((prevRequests) =>
          prevRequests.map((req) =>
            req.id === id ? { ...req, status: "Approved" } : req
          )
        );
      } else {
        console.error("Failed to approve balance request.");
      }
    } catch (error) {
      console.error("Error approving balance request:", error);
    }
  };
  const handleDeleteBalance = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/rejectBlance", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: "67d5ae9111f11e4ea90aaa37" }),
      });
      const fetchBalanceRequests = async () => {
        try {
          const response = await fetch("http://localhost:8000/api/blanceShow");
          const data = await response.json();

          if (Array.isArray(data)) {
            setBalanceRequests(
              data.map((item) => ({
                id: item._id,
                userId: item.user_id ? item.user_id._id : null,
                user: item.user_id
                  ? `${item.user_id.firstName} ${item.user_id.lastName}`
                  : "Unknown",
                amount: `$${item.amount}`,
                status: item.isApproved ? "Approved" : "Pending",
              }))
            );
          }
        } catch (error) {
          console.error("Error fetching balance requests:", error);
        }
      };

      fetchBalanceRequests();
    } catch (error) {
      console.log(error);
    }
  };

  // Approve Order
  const handleApproveOrder = (id) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id ? { ...order, status: "Approved" } : order
      )
    );
  };

  // Delete Order
  const handleDeleteOrder = (id) => {
    setOrders((prevOrders) => prevOrders.filter((order) => order.id !== id));
  };

  return (
    <div className="p-4 md:p-6 lg:p-8">
      {/* Balance Requests */}
      <div className="bg-white shadow rounded p-4">
        <h2 className="text-lg font-semibold mb-3">Balance Requests</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">User</th>
              <th className="border p-2">Amount</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {balanceRequests.length > 0 ? (
              balanceRequests.map((req, index) => (
                <tr key={index} className="text-center">
                  <td className="border p-2">{req.user}</td>
                  <td className="border p-2">{req.amount}</td>
                  <td className="border p-2">{req.status}</td>
                  <td className="border p-2">
                    {req.status === "Pending" && (
                      <button
                        onClick={() => handleApproveBalance(req.id, req.userId)}
                        className="px-3 py-1 bg-green-500 text-white rounded mr-2"
                      >
                        Approve
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteBalance(req.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="border p-2 text-center" colSpan="4">
                  No Balance Requests Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Users */}
      <div className="bg-white shadow rounded p-4 mt-6">
        <h2 className="text-lg font-semibold mb-3">Users</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="text-center">
                <td className="border p-2">{user.name}</td>
                <td className="border p-2">{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Orders */}
      <div className="bg-white shadow rounded p-4 mt-6">
        <h2 className="text-lg font-semibold mb-3">Orders</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Service</th>
              <th className="border p-2">User</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="text-center">
                <td className="border p-2">{order.service}</td>
                <td className="border p-2">{order.user}</td>
                <td className="border p-2">{order.status}</td>
                <td className="border p-2">
                  {order.status !== "Approved" && (
                    <button
                      onClick={() => handleApproveOrder(order.id)}
                      className="px-3 py-1 bg-green-500 text-white rounded mr-2"
                    >
                      Approve
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteOrder(order.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
