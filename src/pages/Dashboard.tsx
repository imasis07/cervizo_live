import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { BarChart3, TrendingUp, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

type DailySale = {
  id: string;
  seller_id: string;
  date: string;
  revenue: number;
  orders: number;
  impressions: number;
  clicks: number;
};

type Campaign = {
  id: string;
  user_id: string | null;
  name: string;
  status: string;
  budget: number;
  spent: number;
  total_sales: number;
  roas: number | null;
  influencer_count: number;
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string | null>(null);
  const [sales, setSales] = useState<DailySale[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      navigate("/auth");
      return;
    }

    setUserId(user.id);

    // Load daily sales
    const { data: salesData } = await (supabase as any)
      .from("daily_sales")
      .select("*")
      .eq("seller_id", user.id)
      .order("date", { ascending: false })
      .limit(30);

    if (salesData) {
      setSales(salesData);
      const totalRev = salesData.reduce((sum: number, s: DailySale) => sum + s.revenue, 0);
      const totalOrds = salesData.reduce((sum: number, s: DailySale) => sum + s.orders, 0);
      setTotalRevenue(totalRev);
      setTotalOrders(totalOrds);
    }

    // Load campaigns
    const { data: campaignsData } = await (supabase as any)
      .from("campaigns")
      .select("*")
      .order("created_at", { ascending: false });

    if (campaignsData) {
      setCampaigns(campaignsData);
    }

    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <p className="text-white">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <div className="bg-slate-900 border-b border-slate-800 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-cyan-500 rounded flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-white text-2xl font-bold">ROASTrack Dashboard</h1>
              <p className="text-gray-400 text-sm">Your ROAS tracking & analytics</p>
            </div>
          </div>
          <Link
            to="/orders"
            className="text-cyan-400 hover:text-cyan-300 text-sm font-medium"
          >
            Influencers →
          </Link>
        </div>
      </div>

      <div className="p-6 max-w-7xl mx-auto">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Total Revenue</p>
                <p className="text-white text-3xl font-bold">
                  ₹{totalRevenue.toLocaleString("en-IN")}
                </p>
                <p className="text-green-400 text-xs mt-2">+12% from last month</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-500" />
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Total Orders</p>
                <p className="text-white text-3xl font-bold">{totalOrders}</p>
                <p className="text-cyan-400 text-xs mt-2">Active tracking</p>
              </div>
              <Users className="w-8 h-8 text-cyan-500" />
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Avg ROAS</p>
                <p className="text-white text-3xl font-bold">
                  {campaigns.length > 0
                    ? (campaigns.reduce((sum, c) => sum + (c.roas || 0), 0) / campaigns.length).toFixed(2)
                    : "0.00"}
                </p>
                <p className="text-yellow-400 text-xs mt-2">{campaigns.length} campaigns</p>
              </div>
              <BarChart3 className="w-8 h-8 text-yellow-500" />
            </div>
          </div>
        </div>

        {/* Recent Sales */}
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 mb-8">
          <h2 className="text-white text-xl font-bold mb-4">Recent Sales</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-gray-400 text-sm border-b border-slate-800">
                  <th className="text-left py-3 px-4">Date</th>
                  <th className="text-left py-3 px-4">Revenue</th>
                  <th className="text-left py-3 px-4">Orders</th>
                  <th className="text-left py-3 px-4">Impressions</th>
                  <th className="text-left py-3 px-4">Clicks</th>
                </tr>
              </thead>
              <tbody>
                {sales.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-8 text-gray-400">
                      No sales data yet
                    </td>
                  </tr>
                ) : (
                  sales.slice(0, 10).map((sale) => (
                    <tr key={sale.id} className="text-white border-b border-slate-800 hover:bg-slate-800/50">
                      <td className="py-3 px-4">
                        {new Date(sale.date).toLocaleDateString("en-IN")}
                      </td>
                      <td className="py-3 px-4 font-semibold">
                        ₹{sale.revenue.toLocaleString("en-IN")}
                      </td>
                      <td className="py-3 px-4">{sale.orders}</td>
                      <td className="py-3 px-4">{sale.impressions.toLocaleString("en-IN")}</td>
                      <td className="py-3 px-4">{sale.clicks.toLocaleString("en-IN")}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Campaigns */}
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
          <h2 className="text-white text-xl font-bold mb-4">Active Campaigns</h2>
          <div className="space-y-3">
            {campaigns.length === 0 ? (
              <p className="text-gray-400 text-center py-8">No campaigns created yet</p>
            ) : (
              campaigns.map((campaign) => (
                <div key={campaign.id} className="bg-slate-800 rounded-lg p-4 hover:bg-slate-700 transition">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-white font-semibold flex items-center gap-2">
                        {campaign.emoji} {campaign.name}
                      </h3>
                      <p className="text-gray-400 text-sm mt-1">
                        {campaign.influencer_count} influencers • Budget: ₹{campaign.budget.toLocaleString("en-IN")}
                      </p>
                    </div>
                    <div className="text-right">
                      <span
                        className={`px-3 py-1 rounded text-sm font-medium ${
                          campaign.status === "Active"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-gray-500/20 text-gray-400"
                        }`}
                      >
                        {campaign.status}
                      </span>
                      {campaign.roas && (
                        <p className="text-cyan-400 text-sm mt-2">ROAS: {campaign.roas.toFixed(2)}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
