
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Clock, Bell } from "lucide-react";

export const CTASection = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "You're on the list!",
        description: "We'll send you updates about ExperienceMaster's launch.",
      });
      setEmail("");
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500 opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-400 opacity-15 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Transform Your
            <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              {" "}Experience Journey?
            </span>
          </h2>
          <p className="text-xl text-white/80 mb-8 leading-relaxed">
            Join thousands of experience enthusiasts waiting for the launch of ExperienceMaster. 
            Be among the first to experience the future of experience booking.
          </p>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            {
              icon: Bell,
              title: "Early Access",
              description: "Get exclusive early access to the app before public launch"
            },
            {
              icon: Calendar,
              title: "Special Offers",
              description: "Receive launch discounts and promotional experience tickets"
            },
            {
              icon: Clock,
              title: "Priority Support",
              description: "Enjoy premium customer support as a founding member"
            }
          ].map((benefit, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/20">
                <benefit.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{benefit.title}</h3>
              <p className="text-white/70 text-sm">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Email signup */}
        <div className="max-w-md mx-auto">
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <Input
              type="email"
              placeholder="Enter your email for updates"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 h-12 bg-white/10 border-white/20 text-white placeholder:text-white/60 backdrop-blur-sm focus:bg-white/20 focus:border-blue-400"
              required
            />
            <Button
              type="submit"
              size="lg"
              className="h-12 px-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 border-0"
            >
              Join Waitlist
            </Button>
          </form>
          <p className="text-white/60 text-sm mt-4">
            No spam, unsubscribe at any time. We respect your privacy.
          </p>
        </div>
      </div>
    </section>
  );
};
