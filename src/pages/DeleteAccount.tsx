import DriftoBanner from "@/components/DriftoBanner";
import Footer from "@/components/Footer";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Props = {};

export default function DeleteAccount({}: Props) {
  return (
    <div className="mt-20">
      <div className="flex flex-col gap-4 text-center">
        <h2 className=" font-bold text-3xl md:text-5xl">Delete Your Account</h2>
        <p className=" font-medium text-base text-neutral-900 px-2">
          We're sorry to see you go. Follow the steps below to permanently
          delete your Drifto account.
        </p>
      </div>
      <section>
        <div className=" flex flex-col lg:flex-row gap-12 p-8">
          <div className="flex justify-center ">
            <img
              className="  min-w-64 lg:min-w-100"
              src="/assets/icons/delete_graphic.svg"
              alt=""
            />
          </div>
          <div className=" flex flex-col gap-4">
            <div className=" text-red-700 bg-[#FEF2F2] border border-[#B91C1C26] rounded-xl flex flex-col gap-6 p-4">
              <h4 className=" font-semibold">This action cannot be undone</h4>
              <p>
                Once you delete your account, all your personal data will be
                permanently removed from our servers. Please make sure you've
                saved any important information before proceeding.
              </p>
            </div>
            <div className="text-[#CC8D0A] bg-[#FEFCE8] border border-[#CA8A0426] rounded-xl flex flex-col gap-6 p-4">
              <h4 className=" font-semibold ">
                Account Cannot Be Deleted If You Have:
              </h4>
              <ul className=" list-disc pl-6">
                <li>Active events that you've created or are hosting</li>
                <li>Refundable tickets for upcoming events</li>
                <li>Outstanding wallet balance</li>
              </ul>

              <p>
                Please resolve these items first: Cancel or transfer your
                events, request refunds for tickets, and withdraw your wallet
                balance before attempting to delete your account.
              </p>
            </div>
          </div>
        </div>
        <div className="flex gap-12 flex-col text-center p-8">
          <div>
            <h4 className=" font-semibold text-3xl mb-12">
              How to Delete Your Account
            </h4>
            <span>
              <h5 className=" font-bold mb-3">
                To delete your Drifto account:
              </h5>
              <ol className=" list-inside list-decimal space-y-2">
                <li>Open the Drifto app or Website</li>
                <li>
                  Go to Settings {">"} Profile {">"} Delete Account
                </li>
                <li>Confirm deletion</li>
              </ol>
            </span>
          </div>
          <div>
            <h4 className="font-semibold text-3xl mb-12">
              What Happens When You Delete Your Account
            </h4>
            <div className="flex flex-col md:flex-row justify-between text-center gap-4">
              <div className=" shadow-xl p-4 rounded-2xl">
                <h5 className="font-semibold">Data Deletion</h5>
                <p className="  text-gray-600 text-sm">
                  All personal data (name, email, profile, posts, events
                  created) will be permanently deleted
                </p>
              </div>
              <div className=" shadow-xl p-4 rounded-2xl">
                <h5 className="font-semibold">Transaction Records</h5>
                <p className="  text-gray-600 text-sm">
                  Payment transaction records may be retained for up to 90 days
                  for legal and financial compliance
                </p>
              </div>
              <div className=" shadow-xl p-4 rounded-2xl">
                <h5 className="font-semibold">Account Access</h5>
                <p className="  text-gray-600 text-sm">
                  After deletion, you will no longer be able to log in or access
                  any Drifto services
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="flex flex-col m-8 bg-[#F7FBFF] border border-[#225DE526] p-8 text-center rounded-2xl">
          <div className="flex flex-col gap-6">
            <div className=" flex justify-center">
              <img src="/assets/icons/mail.svg" alt="Mail_icon" />
            </div>
            <h3 className=" text-3xl font-semibold mb-4">
              Can't Delete Through the App?
            </h3>
          </div>
          <p className=" mb-6">
            If you're unable to delete your account in the app, you can request
            deletion by contacting our support team directly.
          </p>
          <div className=" flex justify-center">
            <a
              className="p-4 text-white font-bold bg-[#2057E0] rounded-xl"
              href="mailto:contact@drifto.app"
            >
              Email support for Deletion
            </a>
          </div>
        </div>
      </section>
      <FAQ />
      <Footer />
      <DriftoBanner />
    </div>
  );
}

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "Why can't I delete my account?",
    answer:
      "Account deletion is restricted if you have active events, refundable tickets, or a wallet balance. Please cancel or transfer your events, request any eligible refunds, and withdraw your wallet balance before attempting to delete your account.",
  },
  {
    question: "How do I withdraw my wallet balance?",
    answer:
      "To withdraw your wallet balance, go to your account dashboard, open the Wallet section, and select Withdraw. Follow the prompts to transfer your available balance to your linked bank account or payout method.",
  },
  {
    question: "What happens to my active events?",
    answer:
      "All active events must be cancelled or transferred before account deletion. This ensures attendees are properly notified and eligible refunds are processed where applicable.",
  },
  {
    question: "Can I recover my account after deletion?",
    answer:
      "No. Once your account is deleted, it cannot be recovered. All associated data, events, and wallet information will be permanently removed.",
  },
  {
    question: "What happens to events I've created?",
    answer:
      "Events you’ve created will be cancelled or removed once your account is deleted. Any necessary refunds to attendees will be handled according to the platform’s refund policy.",
  },
  {
    question: "Will I get refunds for upcoming events?",
    answer:
      "Refund eligibility depends on the event’s refund policy and status. Any refundable tickets must be processed before account deletion to avoid delays or loss of funds.",
  },
  {
    question: "How long does the deletion process take?",
    answer:
      "Account deletion is usually processed within a short period after all requirements are met. In some cases, it may take a few days to fully complete due to pending transactions or refunds.",
  },
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const accordionContent = {
  hidden: { height: 0, opacity: 0 },
  show: {
    height: "auto",
    opacity: 1,
    transition: { duration: 0.35, ease: "easeOut" },
  },
  exit: {
    height: 0,
    opacity: 0,
    transition: { duration: 0.25, ease: "easeIn" },
  },
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Frequently Asked <span className="text-blue-500">Questions</span>
          </h2>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className={`rounded-2xl overflow-hidden transition-all duration-200 ${
                openIndex === index ? "bg-gray-100" : "bg-gray-50"
              }`}
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-gray-100 transition-colors duration-200"
              >
                <h3 className="text-base font-bold text-gray-900 pr-4">
                  {faq.question}
                </h3>
                {openIndex === index ? (
                  <ChevronUp className="w-6 h-6 text-blue-500 shrink-0" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-blue-500 shrink-0" />
                )}
              </button>

              {/* Animated accordion content */}
              {/* <AnimatePresence initial={false}> */}
              {openIndex === index && (
                <div className="px-8 overflow-hidden">
                  <p className="pb-6 pt-2 text-gray-700 text-base leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
              {/* </AnimatePresence> */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
