
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Clock, Star } from "lucide-react";

export const HeroSection = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirect to Google Form
    window.open('https://forms.google.com/your-form-url', '_blank');
  };

  return (
    <section className="relative min-h-screen flex flex-col bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
      {/* Header */}
      <div className="relative z-10 flex justify-between items-center w-full px-4 sm:px-6 lg:px-8 py-6">
        {/* Logo on top left */}
        <div className="flex items-center flex-row gap-5">
          <img
            src="/lovable-uploads/drifto-logo-white.svg"
            alt="Drifto Logo"
            className="w-12 object-contain text-white"
          />
          <div className="text-white text-3xl font-poppins font-bold">
            Drifto
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row">
          <Button
              type="submit"
              size="lg"
              className="h-16 w-full px-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 border-0 text-lg"
          >
            Join Waitlist
          </Button>
        </form>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 opacity-10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-400 opacity-10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex-1 flex items-center justify-center">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium mb-8 border border-white/20">
              <Star className="w-4 h-4 mr-2 text-blue-400" />
              Coming Soon - Mobile App
            </div>

            {/* Main heading */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Your Experiences,
              <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                {" "}Perfectly Managed
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-xl sm:text-2xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed">
              The ultimate platform for discovering, booking, and managing experiences.
              From concerts to conferences, make every moment count.
            </p>

            {/* Features badges */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {[
                { icon: Calendar, text: "Easy Booking" },
                { icon: Clock, text: "Real-time Updates" },
                { icon: Star, text: "Premium Experiences" },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium border border-white/20 hover:bg-white/20 transition-all duration-300"
                >
                  <feature.icon className="w-4 h-4 mr-2" />
                  {feature.text}
                </div>
              ))}
            </div>

            {/* Email signup form */}
            <div className="max-w-md mx-auto mb-6">
              <p className="text-white/90 mb-4 font-medium">Be the first to know when we launch!</p>
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row">
                <Button
                  type="submit"
                  size="lg"
                  className="h-16 w-full px-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 border-0 text-xl"
                >
                  Join Waitlist
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
