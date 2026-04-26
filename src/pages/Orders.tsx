import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";

type OrderStatus = "active" | "history";

type Order = {
  id: string;
  service: string;
  date: string;
  amount: string;
  status: "Active" | "In Progress" | "Cancelled" | "Completed";
  action: string;
};

const ordersByTab: Record<OrderStatus, Order[]> = {
  active: [
    {
      id: "BK1771690653954",
      service: "TV Repair Services",
      date: "24 Feb 2026 at 10:00 AM",
      amount: "Rs 2499 - Rs 2499",
      status: "Active",
      action: "Cancel Booking",
    },
  ],
  history: [
    {
      id: "BK1771615704783",
      service: "TV Repair Services",
      date: "22 Feb 2026 at 10:00 AM",
      amount: "Rs 2499 - Rs 6499",
      status: "Cancelled",
      action: "View Receipt",
    },
    {
      id: "BK1771534078218",
      service: "SSD 512GB",
      date: "20 Feb 2026 at 10:00 AM",
      amount: "Rs 199 - Rs 699",
      status: "Cancelled",
      action: "View Receipt",
    },
    {
      id: "BK1771533066796",
      service: "Washing Machine Repair Services",
      date: "20 Feb 2026 at 09:00 AM",
      amount: "Rs 149 - Rs 749",
      status: "Cancelled",
      action: "View Receipt",
    },
  ],
};

const Orders = () => {
  const [activeTab, setActiveTab] = useState<OrderStatus>("active");
  const orders = useMemo(() => ordersByTab[activeTab], [activeTab]);

  return (
    <section className="min-h-screen bg-[#f5f6f7] p-4 md:p-8 relative">
      <Link
        to="/"
        aria-label="Close orders"
        className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-700 hover:bg-gray-100 transition"
      >
        <X className="w-5 h-5" />
      </Link>

      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-200 p-4 md:p-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">My Orders</h1>

        <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-6">
          <aside className="space-y-3">
            <button
              type="button"
              onClick={() => setActiveTab("active")}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition ${
                activeTab === "active"
                  ? "bg-[#1f8f6a] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Active Orders
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("history")}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition ${
                activeTab === "history"
                  ? "bg-[#1f8f6a] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Order History
            </button>
          </aside>

          <div className="bg-[#f8faf9] border border-gray-200 rounded-2xl p-4 md:p-6 aspect-square overflow-y-auto">
            {orders.length === 0 ? (
              <p className="text-sm text-gray-500">No orders found.</p>
            ) : (
              <div className="space-y-3">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="rounded-xl border border-gray-200 bg-white p-4"
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <span className="inline-flex items-center rounded-md px-2.5 py-1 text-[11px] font-semibold bg-[#e7f6ef] text-[#12875a]">
                        {order.status.toUpperCase()}
                      </span>
                      <p className="text-xs text-gray-500">ID: {order.id}</p>
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-gray-900">{order.service}</h3>
                      <p className="text-xs text-gray-500 mt-1">{order.date}</p>
                    </div>

                    <div className="mt-3 h-px bg-gray-200" />

                    <div className="mt-3 flex items-center justify-between gap-3">
                      <p className="text-sm font-semibold text-gray-900">{order.amount}</p>
                      <button
                        type="button"
                        className="inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium bg-[#e8f7ef] text-[#0f9d6e] border border-[#bde7d4]"
                      >
                        {order.action}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Orders;
