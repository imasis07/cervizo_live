import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Code2, Store } from "lucide-react";
import { useNavigate } from "react-router-dom";

type OnboardingStep = "home" | "connect-store" | "install-pixel" | "completed";

type Seller = {
  id: string;
  email: string;
  store_name: string;
  setup_step: string;
  onboarding_completed: boolean;
};

const SellerOnboarding = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string | null>(null);
  const [seller, setSeller] = useState<Seller | null>(null);
  const [currentStep, setCurrentStep] = useState<OnboardingStep>("home");
  const [loading, setLoading] = useState(true);
  const [showStoreModal, setShowStoreModal] = useState(false);
  const [pixelCode, setPixelCode] = useState<string>("");

  useEffect(() => {
    loadSellerData();
  }, []);

  const loadSellerData = async () => {
    setLoading(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      navigate("/auth");
      return;
    }

    setUserId(user.id);

    const { data: sellerData, error } = await (supabase as any)
      .from("sellers")
      .select("*")
      .eq("id", user.id)
      .single();

    if (error || !sellerData) {
      setCurrentStep("home");
      setSeller(null);
    } else {
      setSeller(sellerData);
      setCurrentStep((sellerData.setup_step as OnboardingStep) || "home");
      
      if (sellerData.setup_step === "install-pixel") {
        const pixelId = user.id.split("-")[0];
        setPixelCode(
          `<script src="https://track.roastrack.com/pixel.js" data-key="${user.id}" async></script>`,
        );
      }
    }

    setLoading(false);
  };

  const handleStoreConnect = async (platform: string) => {
    if (!userId) return;

    const { error: storeError } = await (supabase as any)
      .from("stores")
      .insert({
        seller_id: userId,
        platform: platform,
        store_url: "https://cervizo.in/",
      });

    if (!storeError) {
      const { error: updateError } = await (supabase as any)
        .from("sellers")
        .update({ setup_step: "install-pixel" })
        .eq("id", userId);

      if (!updateError) {
        setCurrentStep("install-pixel");
        setShowStoreModal(false);
        await loadSellerData();
      }
    }
  };

  const handlePixelVerify = async () => {
    if (!userId) return;

    const { error } = await (supabase as any)
      .from("sellers")
      .update({
        setup_step: "completed",
        onboarding_completed: true,
      })
      .eq("id", userId);

    if (!error) {
      setCurrentStep("completed");
      await loadSellerData();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(pixelCode);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  // HOME SCREEN
  if (currentStep === "home") {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
        <div className="max-w-2xl w-full">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="w-10 h-10 bg-cyan-500 rounded flex items-center justify-center">
                <span className="text-white font-bold">📊</span>
              </div>
              <span className="text-white font-bold text-xl">ROASTrack</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">Welcome to ROASTrack!</h1>
            <p className="text-gray-400">Get set up in 2 simple steps.</p>
          </div>

          <div className="space-y-4">
            {/* Step 1 */}
            <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 flex items-center justify-between hover:border-slate-700 transition">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-cyan-500/20 rounded flex items-center justify-center flex-shrink-0 mt-1">
                  <Store className="w-5 h-5 text-cyan-400" />
                </div>
                <div className="text-left">
                  <p className="text-cyan-400 text-sm font-medium">Step 1</p>
                  <h3 className="text-white font-semibold">Connect your store</h3>
                  <p className="text-gray-400 text-sm">Shopify, Wix, WooCommerce, or Custom</p>
                </div>
              </div>
              <Button
                onClick={() => setShowStoreModal(true)}
                className="bg-cyan-500 hover:bg-cyan-600 text-white"
              >
                Connect
              </Button>
            </div>

            {/* Step 2 */}
            <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 flex items-center justify-between opacity-50">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-cyan-500/20 rounded flex items-center justify-center flex-shrink-0 mt-1">
                  <Code2 className="w-5 h-5 text-cyan-400" />
                </div>
                <div className="text-left">
                  <p className="text-cyan-400 text-sm font-medium">Step 2</p>
                  <h3 className="text-white font-semibold">Install tracking pixel</h3>
                  <p className="text-gray-400 text-sm">Copy-paste 1 line of code to your website</p>
                </div>
              </div>
              <Button disabled className="bg-slate-700 text-gray-400">
                Install
              </Button>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Button
              onClick={() => setCurrentStep("home")}
              className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-2 rounded-full font-semibold"
            >
              Get Started
            </Button>
          </div>
        </div>

        {/* Store Connection Modal */}
        {showStoreModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-slate-900 rounded-lg p-8 max-w-md w-full border border-slate-800">
              <h2 className="text-white text-2xl font-bold mb-6">Select Platform</h2>
              <div className="space-y-3">
                {["Shopify", "WooCommerce", "Wix", "Custom"].map((platform) => (
                  <button
                    key={platform}
                    onClick={() => handleStoreConnect(platform.toLowerCase())}
                    className="w-full bg-slate-800 hover:bg-slate-700 text-white py-3 rounded-lg transition font-medium"
                  >
                    {platform}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setShowStoreModal(false)}
                className="w-full mt-4 text-gray-400 hover:text-white transition"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // STORE CONNECTED
  if (currentStep === "install-pixel") {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
        <div className="max-w-2xl w-full">
          <button className="text-cyan-400 hover:text-cyan-300 mb-6 flex items-center gap-2">
            ← Back
          </button>

          <div className="text-center mb-8">
            <p className="text-cyan-400 text-sm font-medium mb-2">STEP 2 OF 2</p>
            <h1 className="text-4xl font-bold text-white mb-2">Install Tracking Pixel</h1>
            <p className="text-gray-400">
              Copy this code and paste it into the <code className="bg-slate-800 px-2 py-1 rounded">&lt;head&gt;</code> section of your
              connected store.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-cyan-500/20 rounded flex items-center justify-center">
                  <span className="text-cyan-400">🔗</span>
                </div>
                <div>
                  <p className="text-white font-medium">Store ID</p>
                  <p className="text-gray-400 text-sm">https://cervizo.in/</p>
                </div>
              </div>
              <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded text-sm font-medium">
                custom
              </span>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-white font-semibold">HTML &lt;head&gt; tag</span>
            </div>
            <pre className="bg-slate-950 text-cyan-400 p-4 rounded overflow-x-auto text-sm">
              {`<script
  src="https://track.roastrack.com/pixel.js"
  data-key="${userId}"
  async>
</script>`}
            </pre>
            <Button
              onClick={copyToClipboard}
              className="w-full mt-4 bg-cyan-500 hover:bg-cyan-600 text-white"
            >
              📋 Copy Code
            </Button>
          </div>

          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6">
            <p className="text-red-400 text-sm">
              🔴 Pixel Status: <span className="font-semibold">Not yet detected</span>
            </p>
            <p className="text-gray-400 text-sm mt-2">Refresh after installing the pixel on your site.</p>
            <Button className="mt-3 w-full bg-slate-800 hover:bg-slate-700 text-white">
              🔄 Refresh
            </Button>
          </div>

          <p className="text-gray-400 text-sm mb-6">Verify the pixel to continue</p>

          <Button
            onClick={handlePixelVerify}
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-full font-semibold text-lg"
          >
            Verify & Continue →
          </Button>
        </div>
      </div>
    );
  }

  // COMPLETED
  if (currentStep === "completed") {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
        <div className="max-w-2xl w-full text-center">
          <div className="mb-8">
            <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-white mb-2">Setup Complete!</h1>
            <p className="text-gray-400">Your store is now connected and tracking is active.</p>
          </div>

          <Button
            onClick={() => navigate("/dashboard")}
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-lg font-semibold text-lg"
          >
            Go to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return null;
};

export default SellerOnboarding;
