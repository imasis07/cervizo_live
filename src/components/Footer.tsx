import { Twitter, Facebook, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#f5f6f7] mt-16">
      <div className="container mx-auto px-4 md:px-8 py-14">

        {/* Logo & Intro */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900">Cervizo</h2>
          <p className="text-sm text-gray-600 mt-2 max-w-md">
            Premium home services at your doorstep. Fast, reliable and trusted professionals near you.
          </p>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">

          {/* Company */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-black transition">About Us</a></li>
              <li><a href="#" className="hover:text-black transition">Our Services</a></li>
              <li><a href="#" className="hover:text-black transition">Careers</a></li>
              <li><a href="#" className="hover:text-black transition">Blog</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-black transition">Help Center</a></li>
              <li><a href="#" className="hover:text-black transition">Contact Us</a></li>
              <li><a href="#" className="hover:text-black transition">Safety Guidelines</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-black transition">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-black transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-black transition">Refund Policy</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                Email:
                <a href="mailto:info@cervizo.in" className="ml-1 hover:text-black transition">
                  info@cervizo.in
                </a>
              </li>
              <li>
                Phone:
                <a href="tel:+918240485748" className="ml-1 hover:text-black transition">
                  +91 824 048 5748
                </a>
              </li>
              <li>Barasat, Kolkata, India</li>
            </ul>
          </div>

        </div>

        {/* Divider with Icons Center */}
        <div className="flex items-center justify-center gap-6 mb-12">
          <div className="flex-1 h-px bg-gray-300"></div>

          <div className="flex gap-4">
            <a
              href="https://www.instagram.com/cerviz0?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center hover:bg-white transition"
            >
              <Instagram className="w-4 h-4 text-gray-800" />
            </a>

            <a
              href="#"
              className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center hover:bg-white transition"
            >
              <Facebook className="w-4 h-4 text-gray-800" />
            </a>

            <a
              href="#"
              className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center hover:bg-white transition"
            >
              <Twitter className="w-4 h-4 text-gray-800" />
            </a>

            <a
              href="#"
              className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center hover:bg-white transition"
            >
              <Linkedin className="w-4 h-4 text-gray-800" />
            </a>
          </div>

          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-300 pt-6 text-xs text-gray-500 text-center">
          <p>© {new Date().getFullYear()} Cervizo Pvt.Ltd, All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;