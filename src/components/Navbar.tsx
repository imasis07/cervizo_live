import { useState, useEffect } from "react";
import { Search, ShoppingCart, User, MapPin, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../assets/app_logo.jpg";

const Navbar = () => {
  const [isSearchSticky, setIsSearchSticky] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const placeholders = [
    "Search for services...",
    "Find the best deals...",
    "What are you looking for?",
    "Explore top offers...",
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsSearchSticky(scrollTop > 50); // Adjust the value as needed
    };

    const placeholderInterval = setInterval(() => {
      setPlaceholderIndex((prevIndex) => (prevIndex + 1) % placeholders.length);
    }, 3000); // Change placeholder every 3 seconds

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(placeholderInterval);
    };
  }, []);

  return (
    <header className="z-50 bg-white border-b border-gray-200">
      {/* DESKTOP NAVBAR */}
      <div className="hidden md:flex max-w-7xl mx-auto items-center justify-between h-16 px-4 md:px-8">
        {/* LEFT */}
        <div className="flex items-center gap-8">
          <img
            src={logo}
            alt="Cervizo Logo"
            className="h-10 w-auto object-contain"
          />

          <nav className="flex items-center gap-8">
            <a className="text-sm font-medium text-gray-700 hover:text-orange-500">
              Support
            </a>
            <a className="text-sm font-medium text-gray-700 hover:text-orange-500">
              About
            </a>
            <a className="text-sm font-medium text-gray-700 hover:text-orange-500">
              Get App
            </a>
          </nav>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>Barasat, Kolkata</span>
            <ChevronDown className="w-4 h-4" />
          </div>

          <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-500 w-52">
            <Search className="w-4 h-4" />
            <input
              type="text"
              placeholder={placeholders[placeholderIndex]}
              className="bg-transparent outline-none w-full text-sm"
            />
          </div>

          <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-sm border">
            <ShoppingCart className="w-5 h-5 text-gray-800" />
          </button>

          <Link
            to="/auth"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-sm border"
          >
            <User className="w-5 h-5 text-gray-800" />
          </Link>
        </div>
      </div>

      {/* MOBILE NAVBAR */}
      <div className="md:hidden bg-gradient-to-b from-pink-500 to-pink-700 text-white">
        {/* Top Row */}
        <div className="px-4 pt-3 pb-4 space-y-4">
          <div className="flex items-center justify-between">
            {/* Location */}
            <div className="flex items-center gap-1 text-sm font-medium">
              <MapPin className="w-4 h-4 text-white" />
              <span>Uttar Seethi, Kolkata</span>
              <ChevronDown className="w-4 h-4" />
            </div>

            {/* Right Icons */}
            <div className="flex items-center gap-3">
              <button className="w-9 h-9 flex items-center justify-center rounded-full bg-pink-600">
                <ShoppingCart className="w-5 h-5 text-white" />
              </button>

              <Link
                to="/auth"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-pink-600"
              >
                <User className="w-5 h-5 text-white" />
              </Link>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div
          className={`flex items-center gap-2 bg-white rounded-xl px-6 py-4 mx-4 transition-all duration-300 ${
            isSearchSticky ? "fixed top-4 left-0 w-[calc(100%-32px)] z-50 shadow-lg" : "relative"
          }`}
        >
          <Search className="w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder={placeholders[placeholderIndex]}
            className="bg-transparent outline-none w-full text-sm text-gray-800 placeholder-gray-500"
          />
        </div>

        {/* Daily Offers Section */}
        <div className="px-4 pt-3 pb-6 space-y-6">
          <div className="bg-pink-500 rounded-lg p-4">
            <h2 className="text-lg font-bold">Daily Offers</h2>
            <div className="grid grid-cols-2 gap-4 mt-3">
              <div className="bg-white text-pink-700 p-3 rounded-lg text-center">
                <p className="text-sm font-medium">Flat ₹200 OFF</p>
                <p className="text-xs">On orders above ₹500</p>
              </div>
              <div className="bg-white text-pink-700 p-3 rounded-lg text-center">
                <p className="text-sm font-medium">New Deals</p>
                <p className="text-xs">Every Hour</p>
              </div>
              <div className="bg-white text-pink-700 p-3 rounded-lg text-center">
                <p className="text-sm font-medium">Protein Meals</p>
                <p className="text-xs">Low Cal Options</p>
              </div>
              <div className="bg-white text-pink-700 p-3 rounded-lg text-center">
                <p className="text-sm font-medium">Large Orders</p>
                <p className="text-xs">Special Discounts</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;