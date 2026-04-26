import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

type Influencer = {
  id: number;
  user_id: string;
  handle: string;
  niche: string;
  followers: number;
  total_sales: number;
  total_views: number;
  total_link_clicks: number;
  roas: number;
  created_at: string;
};

const Orders = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [influencers, setInfluencers] = useState<Influencer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadUserInfluencers = useCallback(async () => {
    setLoading(true);
    setError(null);

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError) {
      setError(userError.message);
      setInfluencers([]);
      setUserId(null);
      setLoading(false);
      return;
    }

    if (!user) {
      setInfluencers([]);
      setUserId(null);
      setLoading(false);
      return;
    }

    setUserId(user.id);

    const { data, error: queryError } = await (supabase as any)
      .from("influencers")
      .select(
        "id,user_id,handle,niche,followers,total_sales,total_views,total_link_clicks,roas,created_at",
      )
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (queryError) {
      setError(queryError.message);
      setInfluencers([]);
      setLoading(false);
      return;
    }

    setInfluencers((data ?? []) as Influencer[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadUserInfluencers();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      loadUserInfluencers();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [loadUserInfluencers]);

  const formatDate = (isoDate: string) =>
    new Date(isoDate).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

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
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">My Influencers</h1>
        <p className="text-sm text-gray-500 mb-6">
          Only your records are shown. Data is filtered by your authenticated user id.
        </p>

        <div className="bg-[#f8faf9] border border-gray-200 rounded-2xl p-4 md:p-6 min-h-[340px]">
          {loading ? (
            <p className="text-sm text-gray-500">Loading your data...</p>
          ) : error ? (
            <p className="text-sm text-[#d93025]">{error}</p>
          ) : !userId ? (
            <div className="space-y-3">
              <p className="text-sm text-gray-600">Please sign in to view your data.</p>
              <Link
                to="/auth"
                className="inline-flex items-center rounded-lg bg-[#1f8f6a] px-4 py-2 text-sm font-semibold text-white"
              >
                Go to Login
              </Link>
            </div>
          ) : influencers.length === 0 ? (
            <p className="text-sm text-gray-500">No influencer records found for your account.</p>
          ) : (
            <div className="space-y-3">
              {influencers.map((item) => (
                <div key={item.id} className="rounded-xl border border-gray-200 bg-white p-4">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <span className="inline-flex items-center rounded-md px-2.5 py-1 text-[11px] font-semibold bg-[#e7f6ef] text-[#12875a]">
                      PRIVATE
                    </span>
                    <p className="text-xs text-gray-500">ID: {item.id}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">{item.handle}</h3>
                    <p className="text-xs text-gray-500 mt-1">
                      {item.niche} | Followers: {item.followers.toLocaleString("en-IN")}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Created: {formatDate(item.created_at)}</p>
                  </div>

                  <div className="mt-3 h-px bg-gray-200" />

                  <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                    <p className="rounded-md bg-gray-50 px-2 py-1">Sales: {item.total_sales.toLocaleString("en-IN")}</p>
                    <p className="rounded-md bg-gray-50 px-2 py-1">Views: {item.total_views.toLocaleString("en-IN")}</p>
                    <p className="rounded-md bg-gray-50 px-2 py-1">Clicks: {item.total_link_clicks.toLocaleString("en-IN")}</p>
                    <p className="rounded-md bg-gray-50 px-2 py-1">ROAS: {item.roas}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Orders;
