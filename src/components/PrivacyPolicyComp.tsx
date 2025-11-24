import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Shield, Lock, Eye, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PrivacyPolicyComp = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <div className="bg-black text-white py-6">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        <Button
                            onClick={() => navigate("/")}
                            variant="ghost"
                            className="text-white hover:text-blue-400 hover:bg-white/10 p-2"
                        >
                            <ArrowLeft className="w-5 h-5 mr-2" />
                            Back to Home
                        </Button>
                        <img
                            src="/lovable-uploads/drifto-logo-white.svg"
                            alt="Drifto Logo"
                            className="w-28 object-contain"
                        />
                    </div>
                </div>
            </div>

            {/* Hero Section */}
            <div className="bg-gradient-to-br from-gray-50 to-white py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center">
                            <Shield className="w-8 h-8 text-white" />
                        </div>
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-bold text-black mb-6">
                        Privacy Policy
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Your privacy matters to us. Learn how we collect, use, and protect your personal information.
                    </p>
                </div>
            </div>

            {/* Privacy Policy Content */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="prose prose-lg max-w-none">

                    {/* Key Principles */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 not-prose">
                        {[
                            {
                                icon: Lock,
                                title: "Secure by Design",
                                description: "End-to-end encryption and industry-standard security measures"
                            },
                            {
                                icon: Eye,
                                title: "Transparent",
                                description: "Clear information about what data we collect and how we use it"
                            },
                            {
                                icon: Users,
                                title: "Your Control",
                                description: "Easy access to update, delete, or manage your personal information"
                            }
                        ].map((principle, index) => (
                            <div key={index} className="text-center p-6 bg-gray-50 rounded-2xl">
                                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center mx-auto mb-4">
                                    <principle.icon className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-lg font-semibold text-black mb-2">{principle.title}</h3>
                                <p className="text-gray-600 text-sm">{principle.description}</p>
                            </div>
                        ))}
                    </div>

                    <div className="space-y-8 text-gray-700">
                        <div>
                            <p className="text-sm text-gray-500 mb-2">
                                <strong>Effective Date:</strong> {new Date("9/08/2025").toLocaleDateString()}<br />
                                <strong>Last Updated:</strong> {new Date("9/08/2025").toLocaleDateString()}
                            </p>
                        </div>

                        <section>
                            <h2 className="text-2xl font-bold text-black mb-4">1. Introduction</h2>
                            <p>
                                Welcome to Drifto ("we," "our," "us"). We respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, store, and share your data when you use the Drifto mobile application ("App") and related services.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-black mb-4">2. Information We Collect</h2>

                            <h3 className="text-xl font-semibold text-black mb-3">A. Information You Provide Directly</h3>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><strong>Account Information:</strong> Name, username, email address, phone number (if provided), and profile photo.</li>
                                <li><strong>Payment Information:</strong> Processed securely via Paystack; we do not store full card details.</li>
                                <li><strong>Event Content:</strong> Photos, descriptions, and other event-related details you upload.</li>
                                <li><strong>Messages:</strong> Chats within the app, stored securely and visible only to intended recipients.</li>
                            </ul>

                            <h3 className="text-xl font-semibold text-black mb-3 mt-6">B. Information Collected Automatically</h3>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><strong>Device Information:</strong> Device model, OS version, app version.</li>
                                <li><strong>Usage Data:</strong> Pages visited, features used, and session duration.</li>
                                <li><strong>Location Data:</strong> When enabled, your approximate or precise location for event recommendations.</li>
                            </ul>

                            <h3 className="text-xl font-semibold text-black mb-3 mt-6">C. Permissions Used</h3>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><strong>Camera:</strong> To capture photos/videos for your profile, events, or messages.</li>
                                <li><strong>Gallery/Storage:</strong> To upload media from your device.</li>
                                <li><strong>Location:</strong> To show nearby events and improve recommendations.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-black mb-4">3. How We Use Your Information</h2>
                            <p className="mb-3">We use the collected data to:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Create and manage user accounts.</li>
                                <li>Facilitate event creation, discovery, booking, and payments.</li>
                                <li>Provide secure in-app messaging.</li>
                                <li>Personalize event recommendations.</li>
                                <li>Improve app performance and security.</li>
                                <li>Send notifications, updates, and reminders.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-black mb-4">4. How We Share Your Information</h2>
                            <p className="mb-3">We do not sell personal data. We may share information:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><strong>With Service Providers:</strong> Payment processors, cloud hosting, analytics services.</li>
                                <li><strong>With Event Participants:</strong> Limited profile details (name, photo) to facilitate event communication.</li>
                                <li><strong>For Legal Reasons:</strong> If required by law or to protect safety and security.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-black mb-4">5. Data Security</h2>
                            <p className="mb-3">We implement industry-standard measures such as:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>SSL encryption for transactions.</li>
                                <li>End-to-end encryption for chats.</li>
                                <li>Tokenization for stored payment methods.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-black mb-4">6. Your Rights</h2>
                            <p className="mb-3">Depending on your location, you may have the right to:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Access, update, or delete your personal information.</li>
                                <li>Restrict or object to certain data processing.</li>
                                <li>Withdraw consent for optional features like location and camera access.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-black mb-4">7. Data Retention</h2>
                            <p>
                                We keep personal data only as long as necessary to provide our services or comply with legal obligations. You may request account deletion at any time.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-black mb-4">8. Children's Privacy</h2>
                            <p>
                                Drifto is not intended for individuals under 13 (or the applicable age in your region). We do not knowingly collect information from children.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-black mb-4">9. Changes to This Policy</h2>
                            <p>
                                We may update this Privacy Policy from time to time. Updates will be posted within the App and/or on our website.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-black mb-4">10. Contact Us</h2>
                            <p className="mb-3">
                                If you have questions or concerns about this Privacy Policy, please contact us:
                            </p>
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <p><strong>Email:</strong> <a href="mailto:contact@drifto.app" className="text-blue-600 hover:text-blue-700">contact@drifto.app</a></p>
                                <p><strong>Website:</strong> <a href="/" className="text-blue-600 hover:text-blue-700">https://www.drifto.me</a></p>
                            </div>
                        </section>
                    </div>

                    {/* Bottom CTA */}
                    <div className="mt-16 p-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl text-center">
                        <h3 className="text-2xl font-bold text-white mb-4">
                            Ready to Experience Drifto?
                        </h3>
                        <p className="text-blue-100 mb-6">
                            Join our waitlist to be notified when the app launches.
                        </p>
                        <Button
                            onClick={() => window.open('https://docs.google.com/forms/d/e/1FAIpQLScuRBvlaoMWh08pZoOflVtiNPknmDKFD3ISkfYKk6JIPa-O3w/viewform?usp=sharing&ouid=111268504502329986988', '_blank')}
                            className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-3"
                        >
                            Join Waitlist
                        </Button>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default PrivacyPolicyComp;