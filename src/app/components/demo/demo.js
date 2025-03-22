{
  orders.map((order) => (
    <li key={order.id} className="p-3 border rounded bg-white">
      <p className="font-semibold">{order.service}</p>
      <p>
        Status:{" "}
        <span
          className={`font-bold ${
            order.status === "Completed"
              ? "text-green-500"
              : order.status === "Processing"
              ? "text-yellow-500"
              : "text-red-500"
          }`}
        >
          {order.status}
        </span>
      </p>
      <p>Price: {order.price}</p>
    </li>
  ));
}
