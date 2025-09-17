import { Calendar, Mail, MapPin } from "lucide-react";
import { FaXTwitter, FaInstagram, FaLinkedin } from "react-icons/fa6";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
      <footer className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-4">
                <img
                    src="/lovable-uploads/drifto-logo-white.svg"
                    alt="Drifto Logo"
                    className="max-w-28 h-10 object-contain mr-3"
                />
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                The ultimate mobile platform for discovering, booking, and managing experiences.
                Making every moment count with seamless experience journeys.
              </p>
              <div className="flex space-x-4">
                {/* Social media placeholder */}
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                  <span className="text-sm font-bold"><a href="#" target="_blank"><FaInstagram /></a></span>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                  <span className="text-sm font-bold"><a href="#" target="_blank"><FaXTwitter /></a></span>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                  <span className="text-sm font-bold"><a href="https://www.linkedin.com/company/drifto-app/" target="_blank"><FaLinkedin /></a></span>
                </div>
              </div>
            </div>

            {/* Product */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/" className="hover:text-white transition-colors">Features</a></li>
                {/*<li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>*/}
                {/*<li><a href="#" className="hover:text-white transition-colors">Security</a></li>*/}
                <li><a href="/" className="hover:text-white transition-colors">Roadmap</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                {/*<li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>*/}
                <li><a href="mailto:driftoapp@gmail.com" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</a></li>
                {/*<li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>*/}
              </ul>
            </div>
          </div>

          {/* Bottom section */}
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 Drifto Limited. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <div className="flex items-center text-gray-400 text-sm">
                <Mail className="w-4 h-4 mr-2" />
                driftoapp@gmail.com
              </div>
              <div className="flex items-center text-gray-400 text-sm">
                <MapPin className="w-4 h-4 mr-2" />
                Lagos, Nigeria
              </div>
            </div>
          </div>
        </div>
      </footer>
  );
};