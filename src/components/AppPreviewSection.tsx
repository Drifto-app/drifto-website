
export const AppPreviewSection = () => {
  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Experience Events
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                {" "}Like Never Before
              </span>
            </h2>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Our intuitive mobile app puts the power of event discovery and management right in your pocket. 
              With a beautiful, modern interface designed for speed and simplicity.
            </p>

            <div className="space-y-4">
              {[
                "Swipe through events with our card-based interface",
                "One-tap booking with saved payment methods",
                "Real-time notifications for updates and reminders",
                "Offline access to your tickets and event details"
              ].map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full"></div>
                  <p className="text-gray-700">{feature}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Phone mockup */}
          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative">
              {/* Phone frame */}
              <div className="w-80 h-[600px] bg-gray-900 rounded-[3rem] p-2 shadow-2xl">
                <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden relative">
                  {/* Status bar */}
                  <div className="h-8 bg-gray-50 flex items-center justify-center">
                    <div className="w-16 h-1 bg-gray-300 rounded-full"></div>
                  </div>
                  
                  {/* App content mockup */}
                  <div className="p-6 space-y-4">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-32 bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl"></div>
                    <div className="space-y-2">
                      <div className="h-3 bg-gray-200 rounded w-full"></div>
                      <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                    </div>
                    <div className="h-24 bg-gradient-to-br from-pink-100 to-yellow-100 rounded-xl"></div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="h-16 bg-gray-100 rounded-lg"></div>
                      <div className="h-16 bg-gray-100 rounded-lg"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-full shadow-lg animate-bounce"></div>
              <div className="absolute -bottom-8 -left-8 w-16 h-16 bg-gradient-to-r from-purple-400 to-blue-500 rounded-full shadow-lg animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
