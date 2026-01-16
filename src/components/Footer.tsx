import { Mail, MapPin } from "lucide-react";
import { FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className=" mx-auto px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4 max-w-80">
            <div className="flex items-center justify-center gap-2 font-semibold text-xl">
              <img src="/assets/icons/drifto_logo.png" className=" " />
            </div>

            <p className="text-sm text-gray-600 leading-relaxed max-w-sm">
              The ultimate mobile platform for discovering, booking, and
              managing experiences. Making every moment count with seamless
              experience journeys.
            </p>

            <div className="flex items-center gap-3">
              <SocialIcon icon={<FaTwitter />} />
              <SocialIcon icon={<FaInstagram />} />
              <SocialIcon icon={<FaLinkedinIn />} />
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-semibold tracking-widest text-blue-600 mb-4">
              COMPANY
            </h4>
            <ul className="space-y-3 text-sm text-gray-700">
              <li>Services</li>
              <li>Pricing</li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="text-xs font-semibold tracking-widest text-blue-600 mb-4">
              HELP
            </h4>
            <ul className="space-y-3 text-sm text-gray-700">
              <li>F.A.Q</li>
              <li>Privacy Policy</li>
              <li>Terms of service</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4 text-sm text-gray-700">
            <div className="flex items-center gap-2">
              <Mail size={16} />
              <span>contact@drifto.app</span>
            </div>

            <div className="flex items-center gap-2">
              <MapPin size={16} />
              <span>Lagos, Nigeria</span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-16 border-t border-gray-200 pt-6 text-center text-xs text-gray-500">
          © 2024 Drifto Limited. All rights reserved
        </div>
      </div>
    </footer>
  );
};

const SocialIcon = ({ icon }: { icon: React.ReactNode }) => {
  return (
    <button className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center text-gray-700 hover:bg-gray-100 transition">
      {icon}
    </button>
  );
};

export default Footer;
