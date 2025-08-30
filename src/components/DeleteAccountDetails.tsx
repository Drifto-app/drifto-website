import { Button } from "@/components/ui/button";
import { ArrowLeft, Trash2, AlertTriangle, Shield, Clock, Mail } from "lucide-react";
import {Footer} from "@/components/Footer.tsx";

const DeleteAccountDetails = () => {
    const handleContactSupport = () => {
        window.open('mailto:driftoapp@gmail.com?subject=Account Deletion Request&body=Hi Drifto Team,%0A%0AI would like to request the deletion of my Drifto account.%0A%0AAccount details:%0A- Email: [Your email address]%0A- Username: [Your username]%0A%0AThank you.', '_blank');
    };

    const handleBackToHome = () => {
        window.location.href = '/';
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <div className="bg-black text-white py-6">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        <Button
                            onClick={handleBackToHome}
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
                        <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl flex items-center justify-center">
                            <Trash2 className="w-8 h-8 text-white" />
                        </div>
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-bold text-black mb-6">
                        Delete Your Account
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        We're sorry to see you go. Follow the steps below to permanently delete your Drifto account.
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Warning Alert */}
                <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-12">
                    <div className="flex items-start">
                        <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                            <AlertTriangle className="w-6 h-6 text-red-600" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-red-900 mb-2">
                                This action cannot be undone
                            </h3>
                            <p className="text-red-700">
                                Once you delete your account, all your personal data will be permanently removed from our servers.
                                Please make sure you've saved any important information before proceeding.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Account Deletion Restrictions */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 mb-12">
                    <div className="flex items-start">
                        <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                            <Shield className="w-6 h-6 text-yellow-600" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-yellow-900 mb-3">
                                Account Cannot Be Deleted If You Have:
                            </h3>
                            <ul className="space-y-2 text-yellow-800">
                                <li className="flex items-center">
                                    <div className="w-2 h-2 bg-yellow-600 rounded-full mr-3"></div>
                                    Active events that you've created or are hosting
                                </li>
                                <li className="flex items-center">
                                    <div className="w-2 h-2 bg-yellow-600 rounded-full mr-3"></div>
                                    Refundable tickets for upcoming events
                                </li>
                                <li className="flex items-center">
                                    <div className="w-2 h-2 bg-yellow-600 rounded-full mr-3"></div>
                                    Outstanding wallet balance
                                </li>
                            </ul>
                            <p className="text-yellow-700 mt-4 text-sm">
                                <strong>Please resolve these items first:</strong> Cancel or transfer your events, request refunds for tickets, and withdraw your wallet balance before attempting to delete your account.
                            </p>
                        </div>
                    </div>
                </div>

                {/* How to Delete Section */}
                <div className="mb-12">
                    <h2 className="text-3xl font-bold text-black mb-8 text-center">
                        How to Delete Your Account
                    </h2>

                    <div className="bg-gray-50 rounded-2xl p-8">
                        <h3 className="text-xl font-semibold text-black mb-6">To delete your Drifto account:</h3>
                        <ol className="space-y-4">
                            {[
                                "Open the Drifto app or Website",
                                "Go to Settings > Profile > Delete Account",
                                "Confirm deletion"
                            ].map((step, index) => (
                                <li key={index} className="flex items-start">
                                    <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0 text-sm">
                                        {index + 1}
                                    </div>
                                    <p className="text-gray-700 text-lg">{step}</p>
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>

                {/* What Happens Section */}
                <div className="mb-12">
                    <h2 className="text-3xl font-bold text-black mb-8 text-center">
                        What Happens When You Delete Your Account
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                icon: Trash2,
                                title: "Data Deletion",
                                description: "All personal data (name, email, profile, posts, events created) will be permanently deleted",
                                color: "from-red-500 to-red-600"
                            },
                            {
                                icon: Clock,
                                title: "Transaction Records",
                                description: "Payment transaction records may be retained for up to 90 days for legal and financial compliance",
                                color: "from-orange-500 to-orange-600"
                            },
                            {
                                icon: Shield,
                                title: "Account Access",
                                description: "After deletion, you will no longer be able to log in or access any Drifto services",
                                color: "from-gray-600 to-gray-700"
                            }
                        ].map((item, index) => (
                            <div key={index} className="bg-white border border-gray-200 rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300">
                                <div className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-lg flex items-center justify-center mx-auto mb-4`}>
                                    <item.icon className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-lg font-semibold text-black mb-3">{item.title}</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Alternative Contact Section */}
                <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 text-center">
                    <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center">
                            <Mail className="w-8 h-8 text-white" />
                        </div>
                    </div>
                    <h3 className="text-2xl font-bold text-black mb-4">
                        Can't Delete Through the App?
                    </h3>
                    <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                        If you're unable to delete your account in the app, you can request deletion by contacting our support team directly.
                    </p>
                    <Button
                        onClick={handleContactSupport}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                        Email Support for Deletion
                    </Button>
                </div>

                {/* FAQ Section */}
                <div className="mt-16">
                    <h2 className="text-3xl font-bold text-black mb-8 text-center">
                        Frequently Asked Questions
                    </h2>

                    <div className="space-y-6">
                        {[
                            {
                                question: "Why can't I delete my account?",
                                answer: "Account deletion is restricted if you have active events, refundable tickets, or a wallet balance. Please cancel/transfer your events, request refunds, and withdraw your balance first."
                            },
                            {
                                question: "How do I withdraw my wallet balance?",
                                answer: "Go to Settings > Wallet > Withdraw Funds in the app. You can transfer your balance to your linked bank account or payment method."
                            },
                            {
                                question: "What happens to my active events?",
                                answer: "You must cancel any active events before deletion. Attendees will be notified and refunded according to the event's cancellation policy."
                            },
                            {
                                question: "Can I recover my account after deletion?",
                                answer: "No, account deletion is permanent. Once deleted, your data cannot be recovered and you'll need to create a new account if you wish to use Drifto again."
                            },
                            {
                                question: "What happens to events I've created?",
                                answer: "Events you've created will be removed from the platform. Attendees will be notified of the cancellation if the events haven't occurred yet."
                            },
                            {
                                question: "Will I get refunds for upcoming events?",
                                answer: "Refunds for upcoming events will be processed according to our refund policy. Please contact support for assistance with refunds before deleting your account."
                            },
                            {
                                question: "How long does the deletion process take?",
                                answer: "Account deletion is immediate when done through the app. Your data will be permanently removed from our servers within 30 days."
                            }
                        ].map((faq, index) => (
                            <div key={index} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                                <h4 className="text-lg font-semibold text-black mb-3">{faq.question}</h4>
                                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Support Contact */}
                <div className="mt-16 text-center">
                    <div className="bg-gray-50 rounded-2xl p-8">
                        <h3 className="text-xl font-semibold text-black mb-4">
                            Still Have Questions?
                        </h3>
                        <p className="text-gray-600 mb-4">
                            Our support team is here to help with any concerns about account deletion.
                        </p>
                        <div className="flex items-center justify-center text-gray-600">
                            <Mail className="w-4 h-4 mr-2" />
                            <a href="mailto:driftoapp@gmail.com" className="text-blue-600 hover:text-blue-700 font-medium">
                                driftoapp@gmail.com
                            </a>
                        </div>
                    </div>
                </div>
            </div>

           <Footer />
        </div>
    );
};

export default DeleteAccountDetails;