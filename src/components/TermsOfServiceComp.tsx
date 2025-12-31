import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, Scale, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TermsOfServiceComp = () => {
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
                            <FileText className="w-8 h-8 text-white" />
                        </div>
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-bold text-black mb-6">
                        Terms of Service
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Please read these terms carefully before using the Drifto platform. By using our services, you agree to these terms.
                    </p>
                </div>
            </div>

            {/* Terms of Service Content */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="prose prose-lg max-w-none">

                    {/* Key Principles */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 not-prose">
                        {[
                            {
                                icon: FileText,
                                title: "Clear Terms",
                                description: "Straightforward rules that govern the use of our platform"
                            },
                            {
                                icon: Scale,
                                title: "Fair Practices",
                                description: "Equitable policies for both hosts and users"
                            },
                            {
                                icon: AlertTriangle,
                                title: "Safety First",
                                description: "Guidelines designed to ensure a safe experience for everyone"
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
                                <strong>Last Updated:</strong> November 2025
                            </p>
                            <p>
                                Welcome to Drifto ("we", "our", "us"), operated by DRIFTO LIMITED, registered in Nigeria under the Corporate Affairs Commission (CAC) with RC Number <strong>8334986</strong>. By accessing or using Drifto's website, mobile application, or services (collectively, the "Platform"), you agree to these Terms of Service.
                            </p>
                            <p className="mt-2">Please read them carefully.</p>
                        </div>

                        <section>
                            <h2 className="text-2xl font-bold text-black mb-4">1. Acceptance of Terms</h2>
                            <p>
                                By using Drifto, you agree to comply with these Terms. If you do not agree, please do not use the Platform.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-black mb-4">2. Eligibility</h2>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Users must be at leat 13 years old to create an account to book or host experiences.</li>
                                <li>There is no strict age limit, but hosts may set age requirements for their events.</li>
                                <li>Hosts must provide a valid phone number for communication and safety verification.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-black mb-4">3. User Accounts</h2>
                            <p className="mb-3">Users are responsible for:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Keeping login credentials secure</li>
                                <li>Providing accurate information</li>
                                <li>Not impersonating others</li>
                            </ul>
                            <p className="mt-3">We may suspend accounts that violate our rules.</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-black mb-4">4. Hosting on Drifto</h2>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Anyone can become a host after passing our simple onboarding process.</li>
                                <li>Hosts are fully responsible for the accuracy, safety, and quality of their events.</li>
                                <li>Only physical events/experiences are allowed at this time.</li>
                                <li>Hosts agree that Drifto is a facilitator, not the creator or organizer of events.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-black mb-4">5. Content Rules</h2>
                            <p className="mb-3">
                                Users may post photos, videos, and text. Content must align with the purpose of the platform: sharing and discovering experiences.
                            </p>
                            <p className="mb-3">Prohibited content includes:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Nudity</li>
                                <li>Sexual content</li>
                                <li>Violence</li>
                                <li>Illegal activities</li>
                                <li>Irrelevant or inappropriate posts</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-black mb-4">6. Payments</h2>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Drifto charges a 4.5% commission on every booking. For tickets priced above 1,500 Naira, an additional 100 Naira service fee applies.</li>
                                <li>Host payouts are sent approximately 24 hours after an event ends.</li>
                                <li>Payments are processed through Paystack.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-black mb-4">7. Refunds & Cancellations</h2>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Refunds are allowed.</li>
                                <li>Users requesting a refund may be charged a small refund fee.</li>
                                <li>Hosts must comply with Drifto's refund standards.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-black mb-4">8. Drifto's Role (Liability)</h2>
                            <p className="mb-3">We may intervene in cases involving safety concerns, but:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>We are not responsible for host behavior, event outcomes, injuries, damages, or disputes.</li>
                                <li>Hosts are independent providers, not employees or agents of Drifto.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-black mb-4">9. Safety</h2>
                            <p>
                                Users and hosts are responsible for their own safety during events.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-black mb-4">10. Termination</h2>
                            <p className="mb-3">We reserve the right to:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Suspend accounts temporarily</li>
                                <li>Permanently ban accounts for serious violations</li>
                                <li>Remove violating content</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-black mb-4">11. Data & Privacy</h2>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>We collect location data to recommend nearby experiences.</li>
                                <li>We do not use cookies on our website.</li>
                                <li>We do not use external analytics tools.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-black mb-4">12. Intellectual Property</h2>
                            <p>
                                All branding, design, and platform content belong to Drifto. Users retain ownership of their posts but grant Drifto a license to display them.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-black mb-4">13. Changes to Terms</h2>
                            <p>
                                We may update these Terms occasionally. Continued use means acceptance.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-black mb-4">14. Contact</h2>
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <p><strong>Email:</strong> <a href="mailto:support@drifto.app" className="text-blue-600 hover:text-blue-700">support@drifto.app</a></p>
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

export default TermsOfServiceComp;
