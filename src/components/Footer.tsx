import { Mail, MapPin } from "lucide-react";
import { FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  },
};

const Footer = () => {
  return (
    <motion.footer
      className="bg-white border-t border-gray-200"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={container}
    >
      <div className=" mx-auto px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <motion.div className="space-y-4 max-w-80" variants={fadeUp}>
            <div className="flex items-center justify-start gap-2 font-semibold text-xl">
              <img src="/assets/icons/drifto_logo1.svg" className="h-9" />
            </div>

            <p className="text-sm text-gray-600 leading-relaxed max-w-sm">
              The ultimate mobile platform for discovering, booking, and
              managing experiences. Making every moment count with seamless
              experience journeys.
            </p>

            <div className="flex items-center gap-3">
              <SocialIcon icon={<FaTwitter />} href="https://twitter.com/driftoapp" />
              <SocialIcon icon={<FaInstagram />} href="https://instagram.com/driftoapp" />
              <SocialIcon icon={<FaLinkedinIn />} href="https://linkedin.com/company/drifto" />
              <SocialIcon icon={<FaYoutube />} href="https://youtube.com/@driftoapp" />
            </div>
          </motion.div>

          {/* Company */}
          <motion.div variants={fadeUp}>
            <h4 className="text-xs font-semibold tracking-widest text-blue-600 mb-4">
              COMPANY
            </h4>
            <ul className="space-y-3 text-sm text-gray-700">
              <li><a href="#" className="hover:text-blue-600 transition-colors">Services</a></li>
              <li><a href="/#pricing" className="hover:text-blue-600 transition-colors">Pricing</a></li>
            </ul>
          </motion.div>

          {/* Help */}
          <motion.div variants={fadeUp}>
            <h4 className="text-xs font-semibold tracking-widest text-blue-600 mb-4">
              HELP
            </h4>
            <ul className="space-y-3 text-sm text-gray-700">
              <li><a href="/privacy-policy" className="hover:text-blue-600 transition-colors">Privacy Policy</a></li>
              <li><a href="/terms-service" className="hover:text-blue-600 transition-colors">Terms of service</a></li>
              <li><a href="/eula" className="hover:text-blue-600 transition-colors">EULA</a></li>


          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400">
              {/*<li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>*/}
              <li><a href="mailto:contact@drifto.app" className="hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="/terms-service" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="/eula" className="hover:text-white transition-colors">EULA</a></li>
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div className="space-y-4 text-sm text-gray-700" variants={fadeUp}>
            <div className="flex items-center gap-2">
              <Mail size={16} />
              <span>contact@drifto.app</span>
            </div>

            <div className="flex items-center gap-2">
              <MapPin size={16} />
              <span>Lagos, Nigeria</span>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          className="mt-16 border-t border-gray-200 pt-6 text-center text-xs text-gray-500"
          variants={fadeUp}
        >
          © 2025 Drifto Limited. All rights reserved
        </motion.div>
      </div>
    </motion.footer>
  );
};

const SocialIcon = ({ icon, href }: { icon: React.ReactNode; href: string }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition"
    >
      {icon}
    </a>
  );
};

export default Footer;
