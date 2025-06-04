
import { Calendar, Clock, Star, Users, Shield, Smartphone } from "lucide-react";

const features = [
  {
    icon: Calendar,
    title: "Smart Experience Discovery",
    description: "AI-powered recommendations based on your preferences and location. Never miss an experience you'd love.",
    gradient: "from-blue-500 to-blue-600"
  },
  {
    icon: Clock,
    title: "Instant Booking",
    description: "Book tickets in seconds with our streamlined checkout process. No more lengthy forms or waiting.",
    gradient: "from-gray-600 to-gray-700"
  },
  {
    icon: Users,
    title: "Social Integration",
    description: "See what your friends are attending, create groups, and share your experiences seamlessly.",
    gradient: "from-blue-400 to-blue-500"
  },
  {
    icon: Shield,
    title: "Secure Payments",
    description: "Bank-level security with multiple payment options. Your data and transactions are always protected.",
    gradient: "from-gray-500 to-gray-600"
  },
  {
    icon: Star,
    title: "Premium Experiences",
    description: "Access exclusive experiences, VIP packages, and early bird offers available only on our platform.",
    gradient: "from-blue-600 to-blue-700"
  },
  {
    icon: Smartphone,
    title: "Mobile First",
    description: "Designed specifically for mobile with intuitive gestures, offline capabilities, and push notifications.",
    gradient: "from-gray-700 to-gray-800"
  }
];

export const FeaturesSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-6">
            Why Choose
            <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
              {" "}ExperienceMaster?
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're revolutionizing experience management with cutting-edge technology and user-centric design.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-gray-300"
            >
              <div className={`w-12 h-12 bg-gradient-to-r ${feature.gradient} rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              
              <h3 className="text-xl font-bold text-black mb-4 group-hover:text-gray-800">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>

              {/* Hover effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-blue-700/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
