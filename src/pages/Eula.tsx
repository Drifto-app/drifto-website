import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, Shield, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Eula = () => {
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
                        End User License Agreement
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Please read this agreement carefully before using the Drifto mobile application. By installing or using the App, you agree to these terms.
                    </p>
                </div>
            </div>

            {/* EULA Content */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="prose prose-lg max-w-none">

                    {/* Key Principles */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 not-prose">
                        {[
                            {
                                icon: FileText,
                                title: "License Terms",
                                description: "Clear terms governing your use of the Drifto app"
                            },
                            {
                                icon: Shield,
                                title: "Zero Tolerance",
                                description: "Strong policies against objectionable content and abuse"
                            },
                            {
                                icon: Users,
                                title: "Community Safety",
                                description: "Active moderation to ensure a respectful environment"
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
                                <strong>Last Updated:</strong> January 13, 2026
                            </p>
                        </div>

                        <section>
                            <h2 className="text-2xl font-bold text-black mb-4">1. Acceptance of Terms</h2>
                            <p>
                                By downloading, installing, or using the Drifto mobile application ("App"), you agree to be bound by this End User License Agreement ("Agreement"). This Agreement is a binding legal contract between you and Drifto ("we," "us," or "our").
                            </p>
                            <p className="mt-3">
                                Please note that this Agreement governs your license to use the App software. Any financial transactions, ticket sales, or service fees are further governed by our <strong>Terms of Service</strong>.
                            </p>
                            <p className="mt-3">
                                If you do not agree to the terms of this Agreement, do not install or use the App.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-black mb-4">2. License Grant</h2>
                            <p>
                                Subject to your compliance with this Agreement, Drifto grants you a limited, non-exclusive, non-transferable, revocable license to download, install, and use the App for your personal use and for the intended business purposes facilitated by the App (such as creating events, selling tickets, and managing bookings) on a mobile device owned or controlled by you.
                            </p>
                            <p className="mt-3">
                                This license does <strong>not</strong> allow you to sublicense, resell, or commercially exploit the App source code or binary itself.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-black mb-4">3. User-Generated Content (UGC)</h2>
                            <p>
                                Drifto allows users to create events, make posts containing text, images, or videos, publish comments on posts and events, and interact with other users (collectively, "User-Generated Content").
                            </p>
                            <p className="mt-3">
                                You retain ownership of the content you post. However, by posting content, you grant Drifto a worldwide, non-exclusive, royalty-free license to use, display, reproduce, and distribute this content within the App and for the purpose of operating the service.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-black mb-4">4. Objectionable Content and Abusive Behavior (Zero Tolerance)</h2>
                            <p>
                                Drifto is committed to maintaining a safe and respectful community. We have a <strong>zero-tolerance policy</strong> for objectionable content and abusive users.
                            </p>
                            <p className="mt-3 mb-3">
                                You agree that you will <strong>NOT</strong> post, upload, or share content that:
                            </p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Is defamatory, discriminatory, or mean-spirited, including references or commentary about religion, race, sexual orientation, gender, national/ethnic origin, or other targeted groups.</li>
                                <li>Contains overt sexual content, nudity, or pornography.</li>
                                <li>Depicts or encourages violence, illegal acts, or extreme recklessness.</li>
                                <li>Is threatening, harassing, or bullying towards other users.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-black mb-4">5. Content Moderation and Enforcement</h2>
                            <p className="mb-3">
                                To ensure community safety and compliance with App Store guidelines, Drifto employs the following mechanisms:
                            </p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><strong>Monitoring:</strong> We employ methods to filter and flag objectionable content.</li>
                                <li><strong>Reporting:</strong> Users can report objectionable content or abusive users directly within the App via the reporting feature on event pages and user profiles.</li>
                                <li><strong>Action:</strong> Drifto will review reported content and act within 24 hours. If a violation is found, we will remove the content and eject the offending user.</li>
                                <li><strong>Suspension/Ban:</strong> Any user found posting objectionable content or engaging in abusive behavior will be blocked and ejected from the service immediately. We reserve the right to remove any content that violates this Agreement at our sole discretion, without prior notice.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-black mb-4">6. Liability and Disclaimer</h2>
                            <p>
                                The App is provided on an "AS IS" and "AS AVAILABLE" basis. Drifto makes no warranties regarding the accuracy, reliability, or availability of the App.
                            </p>
                            <p className="mt-3">
                                Drifto is not responsible for the content posted by users. However, we will take swift action to remove content that violates our policies once we become aware of it. To the maximum extent permitted by law, Drifto shall not be liable for any indirect, incidental, or consequential damages arising from your use of the App.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-black mb-4">7. Termination</h2>
                            <p>
                                This Agreement is effective until terminated by you or Drifto. Your rights under this Agreement will terminate automatically without notice if you fail to comply with any term(s) of this Agreement. Upon termination, you must cease all use of the App and delete all copies of the App from your devices.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-black mb-4">8. Changes to this Agreement</h2>
                            <p>
                                We reserve the right to modify this Agreement at any time. If we make material changes, we will notify you by updating the date at the top of this policy or through a notification within the App. Continued use of the App constitutes acceptance of the revised terms.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-black mb-4">9. Governing Law</h2>
                            <p>
                                This Agreement shall be governed by and construed in accordance with the laws of the Federal Republic of Nigeria, without regard to its conflict of law principles.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-black mb-4">10. Contact Information</h2>
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <p>If you have any questions about this Agreement, please contact us at:</p>
                                <p className="mt-2"><strong>Email:</strong> <a href="mailto:support@drifto.app" className="text-blue-600 hover:text-blue-700">support@drifto.app</a></p>
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

export default Eula;
